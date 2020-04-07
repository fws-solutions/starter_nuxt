/**
 * Request Login
 *
 * @description Define request for logging in.
 */

import { AxiosConfig } from '../util';
import {mutationLogin, mutationMe, mutationRefresh} from '../graphql/authMutations';
import {errorExists} from "../util";
import {initRequests} from "./initRequests";

/**
 * Refresh the authToken
 *
 * @param context
 * @param originalRequest
 * @returns {Promise<AxiosResponse<any>>}
 */
export function requestRefresh(context, originalRequest = null) {

    const $store = context.store || context.$store;

    // Remove invalid tokens before refreshing
    context.$storage.removeUniversal('_authToken');
    context.$axios.setHeader('Authorization', null);

    const refreshConfig = new AxiosConfig(mutationRefresh(context.$storage.getUniversal('_refreshToken')));

    // Make the refresh request
    return context.$axios(refreshConfig)
        .then(response => {

            // If the refresh failed, remove all tokens (sign out) and try to repeat the request
            if (response.data.errors) {
                $store.dispatch('signOut', $store);
                return context.$axios(originalRequest);
            }

            // Else set the new tokens globally
            context.$storage.setUniversal('_authToken', response.data.data.refreshToken.authToken);
            context.$axios.setHeader('Authorization', 'Bearer ' + response.data.data.refreshToken.authToken);

            // Check current user (only if it wasn't the original request)
            if (!originalRequest.data.includes('mutation Me')) {
                requestMe(context);
            }

            // Retry the original request
            return context.$axios(originalRequest);
        }).catch(e => {
            throw e;
        });
}

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
    const loginConfig = new AxiosConfig(mutationLogin(username, password));

    return context.$axios(loginConfig)
        .then((response) => {
            if (response.data.errors) {
                $store.commit('setLoginLoading', false);

                const invalidUser = errorExists(response, 'invalid_username') || errorExists(response, 'incorrect_password');

                const loginErrorMsg = invalidUser ? 'Invalid Username or Password' : 'There was an unexpected error';
                $store.commit('setLoginErrorMsg', loginErrorMsg);
            } else {

                context.$storage.setUniversal('_authToken', response.data.data.login.authToken);
                context.$storage.setUniversal('_refreshToken', response.data.data.login.refreshToken);
                $store.commit('setUser', response.data.data.login.user || {});
                $store.commit('setAuthenticated', true);

                initRequests(context, true);
            }
        }).catch(e => {
            throw e;
        });
}

export function requestMe(context) {
    const $store = context.store || context.$store;
    const meConfig = new AxiosConfig(mutationMe());
    return context.$axios(meConfig)
        .then((response) => {
            $store.commit('setUser', response.data.data.me.user || {});
            $store.commit('setAuthenticated', true);
        }).catch(e => {
            throw e;
        });
}
