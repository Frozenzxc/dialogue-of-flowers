const SITE_ROUTES = ['/', '/gallery', '/about-us', '/contacts', '/announcements'];

/**
 * Sitemap.xml. Маршруты заданы статически (сайт маленький), базовый URL —
 * из NUXT_PUBLIC_SITE_URL. Пререндерится в статику при сборке (nitro.prerender).
 */
export default defineEventHandler((event) => {
    const config = useRuntimeConfig();
    const siteUrl = (config.public.siteUrl || 'https://xn--80aeacdjrz1ad7b6b.xn--p1ai').replace(/\/$/, '');
    const lastmod = new Date().toISOString().slice(0, 10);

    const urls = SITE_ROUTES.map(
        (path) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
    ).join('\n');

    setHeader(event, 'Content-Type', 'application/xml');
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
});
