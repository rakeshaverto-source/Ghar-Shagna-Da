// Clean URLs for the men's type and occasion pages, e.g. /category/kurta instead of
// /category/sherwanis?type=kurta. Keys are the URL slugs; values are the filtered
// collection slugs used in CATEGORIES / OCCASION_CATEGORIES_MEN.
export const CLEAN_CATEGORY_ROUTES: Record<string, string> = {
  kurta: 'sherwanis?type=kurta',
  tuxedo: 'sherwanis?type=tuxedo',
  achkan: 'sherwanis?type=achkan',
  jodhpuri: 'sherwanis?type=jodhpuri',
  'indo-western': 'sherwanis?type=indo-western',
  'groom-wedding': 'sherwanis?occasion=wedding',
  'groom-reception': 'sherwanis?occasion=reception',
  'groom-sangeet': 'sherwanis?occasion=sangeet',
  'groom-mehendi': 'sherwanis?occasion=mehendi',
  'groom-haldi': 'sherwanis?occasion=haldi',
  'groom-cocktail': 'sherwanis?occasion=cocktail',
};

// Public URL for a collection slug like "sherwanis?type=kurta" or "bridal-lehengas"
export function categoryPath(slug: string): string {
  const clean = Object.keys(CLEAN_CATEGORY_ROUTES).find((k) => CLEAN_CATEGORY_ROUTES[k] === slug);
  return `/category/${clean || slug}`;
}

export interface CategoryRoute {
  // Base collection, e.g. "sherwanis"
  slug: string;
  filter: { occasion?: string; type?: string };
  // URL of this page, used for canonical links and admin Page SEO lookups
  pagePath: string;
  // Set when an old query-string URL has a clean URL it should redirect to
  redirectTo?: string;
}

export function resolveCategoryRoute(
  urlSlug: string,
  searchParams: { occasion?: string; type?: string }
): CategoryRoute {
  const target = CLEAN_CATEGORY_ROUTES[urlSlug];
  if (target) {
    const [slug, query] = target.split('?');
    const params = new URLSearchParams(query);
    return {
      slug,
      filter: { occasion: params.get('occasion') || undefined, type: params.get('type') || undefined },
      pagePath: `/category/${urlSlug}`,
    };
  }

  const { occasion, type } = searchParams;
  const collectionSlug = `${urlSlug}${occasion ? `?occasion=${occasion}` : type ? `?type=${type}` : ''}`;
  const pagePath = `/category/${collectionSlug}`;
  const cleanPath = categoryPath(collectionSlug);
  return {
    slug: urlSlug,
    filter: { occasion, type },
    pagePath,
    redirectTo: cleanPath !== pagePath ? cleanPath : undefined,
  };
}
