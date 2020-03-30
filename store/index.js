/**
 * Global Store Module
 *
 * @description Store state, mutations, actions and getters for global stuff.
 */

import { adminURL, getErrorMsg } from '../config/util';
import { requestLogin } from '../config/requests/requestLogin';
import { initRequests } from '../config/requests/initRequests';

export const state = () => ({
    prefix: 'fws_',
    baseURL: '/',
    adminURL: adminURL,
    initRequestErrorMsg: null,
    loginErrorMsg: null,
    loginLoading: false,
    userName: '',
    userToken: null,
    userRefreshToken: null
});

export const mutations = {
    setToken(state, userToken) {
        state.userToken = userToken;
    },
    setRefreshToken(state, userRefreshToken) {
        state.userRefreshToken = userRefreshToken;
    },
    setUserName(state, userName) {
        state.userName = userName;
    },
    setInitRequestErrorMsg(state, errorMsg) {
        state.initRequestErrorMsg = errorMsg;
    },
    setLoginErrorMsg(state, errorMsg) {
        state.loginErrorMsg = errorMsg;
    },
    setLoginLoading(state, loading) {
        state.loginLoading = loading;
    }
};

export const actions = {
    // async nuxtServerInit(vuexContext, context) {
    //     const prefix = vuexContext.state.prefix;
    //     let cookies = context.req.headers.cookie;
    //
    //     if (cookies) {
    //         cookies = cookies.split(';');
    //         cookies = cookies.filter(cur => cur.includes(`${prefix}user`));
    //
    //         if (cookies.length > 0) {
    //             cookies.forEach(cur => {
    //                 const cookie = cur.split('=');
    //                 const name = cookie[0].trim().replace(prefix, '');
    //                 const val = cookie[1].trim();
    //
    //                 switch (name) {
    //                     case 'userName':
    //                         vuexContext.commit('setUserName', val);
    //                         break;
    //                     case 'userToken':
    //                         vuexContext.commit('setToken', val);
    //                         break;
    //                 }
    //             });
    //         }
    //     }
    //
    //     try {
    //         await initRequests(vuexContext, context);
    //     } catch (error) {
    //         vuexContext.dispatch('handleInitRequestError', {context, error});
    //     }
    // },
    async setToken(vuexContext, payload) {
        try {
            await requestLogin(vuexContext, payload);
        } catch (error) {
            vuexContext.dispatch('handleInitRequestError', {context: payload.context, error});
        }
    },
    handleInitRequestError(vuexContext, payload) {
        /*
        * Check if it's authentication error and check if
        * redirect or route function is available.
        * Send back to login page if possible. */
        const isAuthError = payload.error.response && payload.error.response.status === 403;

        if (isAuthError && payload.context.redirect) {
            payload.context.redirect('/login');
        } else if (isAuthError && payload.context.$router) {
            payload.context.$router.push({
                path: '/login'
            });
        } else {
            /*
            * Redirect to error page. */
            const errorMsg = getErrorMsg(payload.error);
            vuexContext.commit('setInitRequestErrorMsg', errorMsg);
            if (payload.context.redirect) {
                payload.context.redirect('/error');
            }
        }
    },
    setLoginLoading(vuexContext, loading) {
        vuexContext.commit('setLoginLoading', loading);
    }
};

export const getters = {
    adminURL(state) {
        return state.adminURL;
    },
    baseURL(state) {
        return state.baseURL;
    },
    isAuthenticated(state) {
        return state.userToken !== null;
    },
    userName(state) {
        return state.userName;
    },
    initRequestErrorMsg(state) {
        return state.initRequestErrorMsg;
    },
    loginErrorMsg(state) {
        return state.loginErrorMsg;
    },
    loginLoading(state) {
        return state.loginLoading;
    }
};
