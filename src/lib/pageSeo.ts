import { connectDB } from '@/lib/mongodb';
import SiteSettings, { IPageSeoItem } from '@/models/SiteSettings';

const normalizePath = (path: string) => path.replace(/\/$/, '') || '/';

// Per-page SEO saved from the admin "Page SEO" tab. pagePath may include a query string,
// e.g. "/category/wedding-dresses?occasion=cocktail".
export async function getAdminPageSeo(pagePath: string): Promise<IPageSeoItem | null> {
  try {
    const conn = await connectDB();
    if (!conn) return null;

    const settings = await SiteSettings.findOne({ key: 'global' }).select('pageSeoList').lean<{
      pageSeoList?: IPageSeoItem[];
    }>();
    const target = normalizePath(pagePath);
    return settings?.pageSeoList?.find((p) => normalizePath(p.pagePath) === target) || null;
  } catch (err) {
    console.error('Error loading page SEO settings:', err);
    return null;
  }
}
