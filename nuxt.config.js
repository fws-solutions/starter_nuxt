import { AxiosConfig } from './config/util';
import axios from 'axios';

export default {
    server: {
        host: process.env.NUXT_ENV_HOST,
        port: process.env.NUXT_ENV_PORT
    },
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: false,
    /*
    ** Global CSS
    */
    css: [
        '@/assets/css/style.scss',
        'vue-cool-lightbox/dist/vue-cool-lightbox.min.css',
        'vue-slick-carousel/dist/vue-slick-carousel.css',
        {src: 'vue-select/src/scss/vue-select.scss', lang: 'scss'}
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~/plugins/mixins',
        '~/plugins/filters',
        '~/plugins/vue-select',
        '~/plugins/svg-icon',
        '~/plugins/axios'
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [],
    /*
    ** Nuxt.js modules
    */
    modules: [
        'nuxt-client-init-module',
        '@nuxtjs/style-resources',
        '@nuxtjs/axios',
        '@nuxtjs/universal-storage',
        '@nuxtjs/svg',
        'bootstrap-vue/nuxt'
    ],
    styleResources: {
        // injects the variables in each component
        scss: [
            '@/assets/css/config/_variables.scss',
            '@/assets/css/helpers/_mixins.scss'
        ]
    },
    bootstrapVue: {
        bootstrapCSS: false,
        bootstrapVueCSS: false,
        componentPlugins: [
            'LayoutPlugin'
        ],
        config: {
            breakpoints: ['xs', 'sm', 'md', 'lg', 'xl']
        }
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map'
        }
    },

    generate: {
        routes() {
            const pagesResConfig = new AxiosConfig();
            pagesResConfig.data.query = queryPages();

            return axios(pagesResConfig)
                .then((response) => {
                    const pagesResponse = response.data.data.pages.nodes;
                    const pageItems = pagesResponse ? pagesResponse : [];

                    return pageItems.reduce((agg, cur) => {
                        const url = cur.slug === 'home' ? '/' : `/${cur.slug}`;
                        agg.push(url);
                        return agg;
                    }, []);
                }).catch(() => {
                    return ['/'];
                });
        }
    }
};
