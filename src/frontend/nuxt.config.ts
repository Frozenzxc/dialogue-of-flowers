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
    ssr: false,
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
        baseURL: '/',
        head: {
            bodyAttrs: {
                class: 'fd-theme',
            },
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    name: 'description',
                    content: 'Диалог цветов',
                },
            ],
            link: [
                {
                    rel: 'preconnect',
                    as: 'font',
                    type: 'font/woff2',
                    crossorigin: 'anonymous',
                    href: '/_nuxt/assets/fonts/Montserrat-SemiBold.woff2',
                },
                {
                    rel: 'preconnect',
                    as: 'font',
                    type: 'font/woff2',
                    crossorigin: 'anonymous',
                    href: '/_nuxt/assets/fonts/PlayfairDisplay-SemiBold.woff2',
                },
                { rel: 'stylesheet', href: '~/assets/css/fonts.css' },
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
        },
    },

    tailwindcss: {
        viewer: false,
        cssPath: ['~/assets/css/index.css', { injectPosition: 'last' }],
    },
});
