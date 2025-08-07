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
        public: {
            strapiApiUrl: '',
            yandexMetrikaId: '',
        },
    },
});
