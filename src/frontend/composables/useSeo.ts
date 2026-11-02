import { RouteName } from '~/types/common/Enums/RouteName';

type PageMeta = {
    title: string;
    description: string;
};

/**
 * SEO-меты страниц сайта. description уникален для каждого маршрута,
 * title выводится через titleTemplate как «{страница} | Диалог цветов».
 */
const pagesMeta: Record<RouteName, PageMeta> = {
    [RouteName.MainPage]: {
        title: 'Диалог цветов',
        description:
            'Керамическая флористика ручной работы от выставочного проекта Елены Сафиевой: цветы из холодного фарфора, авторские букеты и композиции, мастер-классы. Тула.',
    },
    [RouteName.Gallery]: {
        title: 'Галерея',
        description:
            'Галерея керамической флористики: букеты и композиции из холодного фарфора ручной работы, сувениры и украшения на заказ от студии «Диалог цветов».',
    },
    [RouteName.AboutUs]: {
        title: 'О нас',
        description:
            'Выставочный проект «Диалог цветов» — керамическая флористика Елены Сафиевой с 2017 года: выставки, заказные композиции и мастер-классы по лепке цветов.',
    },
    [RouteName.Contacts]: {
        title: 'Контакты',
        description:
            'Связаться со студией керамической флористики «Диалог цветов»: заказать композицию из холодного фарфора или записаться на мастер-класс.',
    },
    [RouteName.Announcements]: {
        title: 'Анонсы',
        description: 'Анонсы выставок и мастер-классов проекта «Диалог цветов».',
    },
    [RouteName.Privacy]: {
        title: 'Политика конфиденциальности',
        description: 'Политика обработки персональных данных сайта «Диалог цветов».',
    },
};

/**
 * Применяет SEO-меты страницы: title, description, canonical, Open Graph,
 * Twitter Card и JSON-LD разметку (Organization на главной, BreadcrumbList на остальных).
 */
export const useSeo = (routeName: RouteName) => {
    const route = useRoute();
    const config = useRuntimeConfig();
    const siteUrl = (config.public.siteUrl || 'https://xn--80aeacdjrz1ad7b6b.xn--p1ai').replace(/\/$/, '');
    const meta = pagesMeta[routeName];
    const canonical = `${siteUrl}${route.path}`;

    const jsonLd =
        routeName === RouteName.MainPage
            ? {
                  '@context': 'https://schema.org',
                  '@type': 'Organization',
                  name: 'Диалог цветов',
                  description: pagesMeta[RouteName.MainPage].description,
                  url: siteUrl,
                  logo: `${siteUrl}/favicon.png`,
                  sameAs: ['https://vk.com/dialogtsvetov', 'https://rutube.ru/channel/50542582/'],
              }
            : {
                  '@context': 'https://schema.org',
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                      { '@type': 'ListItem', position: 1, name: 'Главная', item: siteUrl },
                      { '@type': 'ListItem', position: 2, name: meta.title, item: canonical },
                  ],
              };

    useHead({
        title: meta.title,
        meta: [
            { name: 'description', content: meta.description },
            { name: 'og:type', content: 'website' },
            { name: 'og:site_name', content: 'Диалог цветов' },
            {
                name: 'og:title',
                content: meta.title === 'Диалог цветов' ? meta.title : `${meta.title} | Диалог цветов`,
            },
            { name: 'og:description', content: meta.description },
            { name: 'og:url', content: canonical },
            { name: 'og:image', content: `${siteUrl}/og-image.png` },
            { name: 'og:locale', content: 'ru_RU' },
            { name: 'twitter:card', content: 'summary_large_image' },
        ],
        link: [{ rel: 'canonical', href: canonical }],
        script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }],
    });
};
