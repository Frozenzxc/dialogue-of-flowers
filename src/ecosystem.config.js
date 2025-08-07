module.exports = {
    apps: [
        {
            name: 'DialogueOfFlowers',
            port: '3000',
            exec_mode: 'cluster',
            instances: 'max',
            script: 'frontend/.output/server/index.mjs',
            env: {
                NUXT_PUBLIC_YANDEX_METRIKA_ID: '103571975'
            }
        },
    ],
};
