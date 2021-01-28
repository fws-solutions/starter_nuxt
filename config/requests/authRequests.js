/**
 * Request Login
 *
 * @description Define request for logging in.
 */

import { AxiosConfig } from '../util';

/**
 * Login Request
 * Sets the tokens and user object
 *
 * @param context
 * @param username
 * @param password
 * @returns {Promise<AxiosResponse<any>>}
 */
export function requestLogin(context, username, password) {
    const $store = context.store || context.$store;

    const loginConfig = new AxiosConfig('jwt-auth/v1/token', 'POST', {username, password});

    return context.$axios(loginConfig)
        .then(response => {

            $store.commit('setLoginLoading', false);

            if (!response.data.success) {
                $store.commit('setLoginErrorMsg', 'Invalid Username or Password');

                return;
            }

            let user = response.data.data;
            context.$storage.setUniversal('_authToken', response.data.data.token);
            delete user.token;
            $store.commit('setUser', user);

            context.$router.push({
                path: '/'
            });
        });
}

export function requestLogout(context) {
    const $store = context.store || context.$store || context;
    context.$storage.removeUniversal('_authToken');
    $store.commit('setUser', {});
}
