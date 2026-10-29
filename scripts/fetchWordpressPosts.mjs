// Copies the blog posts from the old WordPress site (gharshagnada.com) before the domain
// moves to this app: SEO title/description, dates, tags and the article body (converted to
// the blog editor's markdown). Images are saved to public/wp-content/uploads at their original
// paths so old image URLs keep working after the switch.
// Usage: node scripts/fetchWordpressPosts.mjs   →   writes scripts/data/wordpress-posts.json
import fs from 'fs';
import path from 'path';

const OLD_SITE = 'https://gharshagnada.com';
const OUT_FILE = path.resolve('scripts/data/wordpress-posts.json');
const PUBLIC_DIR = path.resolve('public');
const UA = { 'User-Agent': 'Mozilla/5.0 (GharShagnaDa migration)' };

const ENTITIES = {
  '&amp;': '&', '&quot;': '"', '&#039;': "'", '&#39;': "'", '&lt;': '<', '&gt;': '>',
  '&nbsp;': ' ', '&#8211;': '–', '&#8212;': '—', '&#8216;': '‘', '&#8217;': '’',
  '&#8220;': '“', '&#8221;': '”', '&#8230;': '…', '&#038;': '&',
};
const decode = (s) => s.replace(/&#?\w+;/g, (e) => ENTITIES[e] ?? e);

async function get(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
}

const meta = (html, attr, key) =>
  decode(html.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`))?.[1] || '');

// Saves /wp-content/uploads/... images into public/ and returns the local path
const downloaded = new Map();
async function localImage(url) {
  const m = url.match(/^https?:\/\/(?:www\.)?gharshagnada\.com(\/wp-content\/uploads\/[^?#"]+)/);
  if (!m) return url;
  const localPath = decodeURI(m[1]);
  if (!downloaded.has(localPath)) {
    downloaded.set(localPath, true);
    const file = path.join(PUBLIC_DIR, localPath);
    if (!fs.existsSync(file)) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      const buf = Buffer.from(await (await get(url)).arrayBuffer());
      fs.writeFileSync(file, buf);
    }
  }
  return localPath;
}

// Links to old posts point at their new /blog URLs; tag/category archives go to /blog
function rewriteLink(href, postSlugs) {
  const m = href.match(/^https?:\/\/(?:www\.)?gharshagnada\.com(\/[^?#]*)?/);
  if (!m) return href;
  const p = (m[1] || '/').replace(/\/$/, '') || '/';
  const slug = p.slice(1);
  if (postSlugs.has(slug)) return `/blog/${slug}`;
  if (p.startsWith('/tag/') || p.startsWith('/category/')) return '/blog';
  if (p === '/contact-us') return '/contact';
  return p;
}

// Some old posts have broken email links (missing mailto:, ".con")
function fixEmailLink(href) {
  return /gharshagnada@gmail\.co/.test(href) ? 'mailto:gharshagnada@gmail.com' : href;
}

function inline(html, postSlugs) {
  return decode(
    html
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => (t.trim() ? `**${t.trim()}**` : ' '))
      .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
        (_, href, t) => `<a href="${fixEmailLink(rewriteLink(href, postSlugs))}">${t}</a>`)
      .replace(/<(?!\/?(a|em|i)\b)[^>]+>/gi, '')
      .replace(/\s+/g, ' ')
      .replace(/\*\*\s*\*\*/g, '')
      .trim()
  );
}

// Converts the WordPress post body to the line-based markdown that BlogContent renders
async function toMarkdown(body, postSlugs) {
  const images = [];
  let html = body
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi, '')
    .replace(/<img\b[^>]*>/gi, (tag) => {
      const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
      const alt = decode(tag.match(/\salt="([^"]*)"/)?.[1] || '').trim();
      if (!src) return '';
      images.push(src);
      return `\n@@IMG${images.length - 1}@@${alt}@@\n`;
    });

  const lines = [];
  const block = /<(h[1-6]|p|li|blockquote)\b[^>]*>([\s\S]*?)<\/\1>|@@IMG(\d+)@@(.*?)@@/gi;
  let m;
  while ((m = block.exec(html))) {
    if (m[3] !== undefined) {
      const src = await localImage(images[Number(m[3])]);
      lines.push(`![${m[4]}](${src})`);
      continue;
    }
    const tag = m[1].toLowerCase();
    // An image inside a paragraph (usually wrapped in a link) becomes its own line
    for (const part of m[2].split(/(@@IMG\d+@@.*?@@)/)) {
      const img = part.match(/^@@IMG(\d+)@@(.*?)@@$/);
      if (img) {
        lines.push(`![${img[2]}](${await localImage(images[Number(img[1])])})`);
        continue;
      }
      let text = inline(part, postSlugs).replace(/^<a [^>]*>\s*<\/a>$|<a [^>]*>\s*$|^\s*<\/a>/g, '').trim();
      if (tag.startsWith('h')) text = text.replace(/\*\*/g, '');
      if (!text) continue;
      if (tag === 'li') lines.push(`* ${text}`);
      else if (tag === 'h1' || tag === 'h2') lines.push(`## ${text}`);
      else if (tag === 'h3') lines.push(`### ${text}`);
      else if (tag.startsWith('h')) lines.push(`#### ${text}`);
      else lines.push(text);
    }
  }
  return lines.join('\n\n');
}

async function sitemapUrls(name) {
  const xml = await (await get(`${OLD_SITE}/${name}`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((x) => x[1]);
}

const postUrls = await sitemapUrls('post-sitemap.xml');
const postSlugs = new Set(postUrls.map((u) => u.replace(OLD_SITE, '').replace(/\//g, '')));
const posts = [];

for (const url of postUrls) {
  const slug = url.replace(OLD_SITE, '').replace(/\//g, '');
  const html = await (await get(url)).text();

  const title = decode(html.match(/<h1 class="entry-title">([\s\S]*?)<\/h1>/)?.[1] || '').trim();
  const metaTitle = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] || '').trim();
  const metaDescription = meta(html, 'name', 'description');
  const publishedAt = meta(html, 'property', 'article:published_time');
  const ogImage = meta(html, 'property', 'og:image');
  const articleClass = html.match(/<article[^>]*class="([^"]*)"/)?.[1] || '';
  const category = decode(html.match(/rel="category tag">([^<]*)</)?.[1] || 'Wedding Guide');
  const tags = [...articleClass.matchAll(/\btag-([a-z0-9-]+)/g)].map((t) => t[1].replace(/-/g, ' '));

  const start = html.indexOf('<div class="entry-content">');
  const end = html.indexOf('et_post_meta_wrapper', start);
  const content = await toMarkdown(html.slice(start, end === -1 ? undefined : end), postSlugs);

  const words = content.split(/\s+/).length;
  const firstPara = content.split('\n\n').find((l) => !/^(#|!\[|\* )/.test(l)) || '';
  const plain = firstPara.replace(/\*\*|<[^>]+>/g, '');

  posts.push({
    id: `wp-${slug}`,
    slug,
    title,
    excerpt: plain.length > 220 ? `${plain.slice(0, 217).replace(/\s+\S*$/, '')}…` : plain,
    content,
    // Posts without a featured image use their first article image, else the blog share image
    coverImage: ogImage ? await localImage(ogImage) : content.match(/!\[.*?\]\((\S+?)\)/)?.[1] || '/og/blog.jpg',
    category,
    author: 'Ghar Shagna Da',
    authorRole: 'Wedding Stylist',
    readTime: `${Math.max(2, Math.round(words / 200))} min read`,
    tags,
    metaTitle,
    metaDescription,
    isPublished: true,
    isFeatured: false,
    publishedAt,
  });
  console.log(`✓ ${slug} (${words} words)`);
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(posts, null, 2));
console.log(`\nSaved ${posts.length} posts to ${OUT_FILE}, ${downloaded.size} images to public/wp-content/uploads`);
