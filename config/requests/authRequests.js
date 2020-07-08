/**
 * Request Login
 *
 * @description Define request for logging in.
 */

import { AxiosConfig } from '../util';
import { mutationLogin, mutationLogout } from '../graphql/authMutations';
import { errorExists } from '../util';
const { v4: uuidv4 } = require('uuid');

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
    const uuid = uuidv4();
    const $store = context.store || context.$store;
    const loginConfig = new AxiosConfig(mutationLogin(username, password, uuid));

    return context.$axios(loginConfig)
        .then((response) => {
            if (response.data.errors) {
                $store.commit('setLoginLoading', false);

                const invalidUser = errorExists(response.data.errors, 'invalid_username') || errorExists(response.data.errors, 'incorrect_password');

                const loginErrorMsg = invalidUser ? 'Invalid Username or Password' : 'There was an unexpected error';
                $store.commit('setLoginErrorMsg', loginErrorMsg);
            } else {
                context.$storage.setUniversal('_authToken', response.data.data.login.authToken);
                context.$storage.setUniversal('_clientMutationId', uuid);
                $store.commit('setUser', response.data.data.login.user || {});

                context.$router.push({
                    path: '/'
                });
            }
        });
}

export function requestLogout(context) {
    const $store = context.store || context.$store || context;

    const logoutConfig = new AxiosConfig(mutationLogout(context.$storage.getUniversal('_clientMutationId')));

    return context.$axios(logoutConfig)
        .then(response => {
            context.$storage.removeUniversal('_authToken');
            context.$storage.removeUniversal('_clientMutationId');
            $store.commit('setUser', {})
        })
}
