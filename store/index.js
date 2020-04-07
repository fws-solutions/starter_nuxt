/**
 * Global Store Module
 *
 * @description Store state, mutations, actions and getters for global stuff.
 */

import {adminURL, getErrorMsg} from '../config/util';
import {requestMe, requestRefresh} from "../config/requests/authRequests";

export const state = () => ({
    prefix: 'fws_',
    baseURL: '/',
    adminURL: adminURL,
    initRequestErrorMsg: null,
    loginErrorMsg: null,
    loginLoading: false,
    user: {},
    authenticated: false
});

export const mutations = {
    setInitRequestErrorMsg(state, errorMsg) {
        state.initRequestErrorMsg = errorMsg;
    },
    setLoginErrorMsg(state, errorMsg) {
        state.loginErrorMsg = errorMsg;
    },
    setLoginLoading(state, loading) {
        state.loginLoading = loading;
    },
    setUser(state, user) {
        state.user = user;
    },
    setAuthenticated(state, authenticated) {
        state.authenticated = authenticated;
    }
};

export const actions = {
    async nuxtServerInit(vuexContext, context) {

        if(context.$storage.getUniversal('_authToken')) {
            vuexContext.commit('setAuthenticated', true);
            await requestMe(context);
        }

        // TODO why is this needed?
        //await initRequests(context);
    },
    signOut(vuexContext, context) {
        context.$storage.removeUniversal('_authToken');
        context.$storage.removeUniversal('_refreshToken');
        context.$axios.setHeader('Authorization', null);
        vuexContext.commit('setUser', {});
        vuexContext.commit('setAuthenticated', false);
    },
    refreshMe(vuexContext, context) {
        requestMe(context);
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
        return state.authenticated;
    },
    loggedInUser(state) {
        return state.user;
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
