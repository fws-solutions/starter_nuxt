import Vue from 'vue';

Vue.filter('transAdminURL', (value) => {
    return value.replace(process.env.NUXT_ENV_ADMIN_URL, '/');
});
