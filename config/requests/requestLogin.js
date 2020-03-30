/**
 * Request Login
 *
 * @description Define request for logging in.
 */

import { AxiosConfig } from '../util';
import { queryMutationLogin, queryMutationRefresh } from '../graphql/queryMutationLogin';
import { initRequests } from './initRequests';
import Cookies from 'js-cookie';

/*
* Get refresh token. */
export function requestRefresh(vuexContext, refreshToken) {
    const prefix = vuexContext.state.prefix;
    const refreshConfig = new AxiosConfig();
    refreshConfig.data.query = queryMutationRefresh(refreshToken);

    return payload.context.$axios(refreshConfig)
        .then((response) => {
            const token = response.data.data.refreshJwtAuthToken.authToken;

            vuexContext.commit('setToken', token);

            Cookies.set(`${prefix}userToken`, token, {expires: 1, path: '/'});
        }).catch(e => {
            throw e;
        });
};

/*
* Login request. */
export function requestLogin(vuexContext, payload) {
    const prefix = vuexContext.state.prefix;
    const loginConfig = new AxiosConfig();
    loginConfig.data.query = queryMutationLogin(payload.username, payload.password);

    return payload.context.$axios(loginConfig)
        .then((response) => {
            if (response.data.errors) {
                vuexContext.commit('setLoginLoading', false);

                const errors = response.data.errors;
                let invalidUser = false;

                for (let i = 0; i < errors.length; i++) {
                    if (errors[i].message === 'invalid_username' || errors[i].message === 'incorrect_password') {
                        invalidUser = true;
                        break;
                    }
                }

                console.log(response.data);

                const loginErrorMsg = invalidUser ? 'Invalid Username or Password' : 'There was an unexpected error';
                vuexContext.commit('setLoginErrorMsg', loginErrorMsg);
            } else {
                const token = response.data.data.login.authToken;
                const refreshToken = response.data.data.login.refreshToken;
                const name = response.data.data.login.user.name;

                vuexContext.commit('setToken', token);
                vuexContext.commit('setRefreshToken', token);
                vuexContext.commit('setUserName', name);

                Cookies.set(`${prefix}userToken`, token, {expires: 1, path: '/'});
                Cookies.set(`${prefix}userRefreshToken`, refreshToken, {expires: 1, path: '/'});
                Cookies.set(`${prefix}userName`, name, {expires: 1, path: '/'});

                return initRequests(vuexContext, payload.context, true);
            }
        }).catch(e => {
            throw e;
        });
};

