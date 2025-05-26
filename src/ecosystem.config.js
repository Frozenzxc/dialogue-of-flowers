module.exports = {
    apps: [
        {
            name: 'DialogueOfFlowers',
            port: '3000',
            exec_mode: 'cluster',
            instances: 'max',
            script: 'frontend/.output/server/index.mjs',
        },
    ],
};
