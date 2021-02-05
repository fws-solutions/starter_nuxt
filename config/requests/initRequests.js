/**
 * Initialize multiple requests
 *
 * @description Define multiple request to run one after another.
 */

import { AxiosConfig } from '../util';

export async function getMenus(vuexContext, context) {

    const menu = new AxiosConfig('fws/menu/Primary');
    const promise = context.$axios(menu).then(res => {
        if (res && res.data.success) {
            vuexContext.commit('menus/setMenu', res.data.data, {root: true});
        }
    });

    return Promise.all([promise]);
}

export function getPages(vuexContext, context) {
    const allPages = new AxiosConfig('fws/all-pages');

    return context.$axios(allPages).then(res => {
        if (res.data.success) {
            vuexContext.commit('pages/SET_PAGES', res.data.data, {root: true});
        }

        return res.data.success ? res.data.data : {}
    });
}

export function userRequest (context) {
    if (!context.$storage.getUniversal('_authToken')) {
        return;
    }

    const $store = context.store || context.$store;

    // Set Auth header
    context.$axios.setHeader('Authorization', 'Bearer ' + context.$storage.getUniversal('_authToken'));

    const requestConfig = new AxiosConfig('fws/me');

    return context.$axios(requestConfig)
        .then(response => {

            // Check if we have valid response data
            if (!response.data.success) {
                $store.dispatch('logout', $store, $store)

                return;
            }

            $store.commit('setUser', response.data.data);
        });
}
