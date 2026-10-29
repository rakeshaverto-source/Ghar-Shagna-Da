import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Adds the old WordPress posts (scripts/data/wordpress-posts.json, made by
// fetchWordpressPosts.mjs) to the blog. Posts whose slug already exists are left untouched.
// Usage: node scripts/importWordpressPosts.mjs

// Parse .env.local manually without external package
let uri = process.env.MONGODB_URI;
if (!uri) {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const content = fs.readFileSync(envPath, 'utf8');
    const match = content.match(/MONGODB_URI=([^\r\n]+)/);
    if (match) {
      uri = match[1].trim();
    }
  } catch {
    console.error('Could not read .env.local');
  }
}

if (!uri) {
  console.error('❌ MONGODB_URI not found');
  process.exit(1);
}

const BlogPostSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, default: '' },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    category: { type: String, default: 'Bridal Fashion' },
    author: { type: String, default: 'Ghar Shagna Da' },
    authorRole: { type: String, default: 'Bridal Stylist' },
    readTime: { type: String, default: '4 min read' },
    tags: { type: [String], default: [] },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    isPublished: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);

const posts = JSON.parse(fs.readFileSync(path.resolve('scripts/data/wordpress-posts.json'), 'utf8'));

await mongoose.connect(uri);
let added = 0;
for (const post of posts) {
  const res = await BlogPost.updateOne({ slug: post.slug }, { $setOnInsert: post }, { upsert: true });
  if (res.upsertedCount) {
    added++;
    console.log(`✓ added ${post.slug}`);
  } else {
    console.log(`- skipped ${post.slug} (already exists)`);
  }
}
console.log(`\n${added} new posts added, ${posts.length - added} already present`);
await mongoose.disconnect();
