import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@primevue/nuxt-module', '@nuxt/eslint', 'nuxt-icons'],
    components: {
        dirs: [
            {
                path: '~/components',
                pathPrefix: false,
            },
        ],
    },
    // SSR включён ради SEO: поисковики получают готовый HTML с контентом
    ssr: true,
    primevue: {
        options: {
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: 'none',
                },
            },
        },
    },
    app: {
        head: {
            bodyAttrs: {
                class: 'fd-theme',
            },
            htmlAttrs: {
                lang: 'ru',
            },
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    name: 'description',
                    content: 'Диалог цветов',
                },
            ],
            link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
        },
    },

    tailwindcss: {
        viewer: false,
        cssPath: ['~/assets/css/index.css', { injectPosition: 'last' }],
    },

    imports: {
        dirs: ['./composables/**', './api/**'],
    },

    runtimeConfig: {
        // только сервер: внутренний адрес Strapi для SSR-запросов
        strapiInternalUrl: 'http://localhost:1337',
        public: {
            strapiApiUrl: '',
            // канонический адрес сайта для canonical/OG/sitemap
            siteUrl: '',
            yandexMetrikaId: '',
            // ключ PrimeUI (https://primeui.dev); читается плагином @primevue/nuxt-module.
            // Задаётся env PRIMEUI_LICENSE при сборке (docker-compose, сервис web)
            PRIMEUI_LICENSE: process.env.PRIMEUI_LICENSE ?? '',
        },
    },

    nitro: {
        prerender: {
            // генерируем /sitemap.xml статикой при сборке
            routes: ['/sitemap.xml'],
        },
    },
});
