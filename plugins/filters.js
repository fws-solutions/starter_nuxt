import Vue from 'vue';
import { adminURL } from '../config/util';

Vue.filter('transAdminURL', (value) => {
    return value.replace(adminURL, '/');
});
