/**
 * Global Store Module
 *
 * @description Store state, mutations, actions and getters for global stuff.
 */

import {getErrorMsg} from '../config/util';
import {initRequests, userRequest} from '../config/requests/initRequests';
import {requestLogout} from "../config/requests/authRequests";

export const state = () => ({
    prefix: 'fws_',
    baseURL: '/',
    initRequestErrorMsg: null,
    loginErrorMsg: null,
    loginLoading: false,
    user: {}
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
    }
};

export const actions = {
    nuxtClientInit(vuexContext, context) {
        userRequest(context);
    },
    async nuxtServerInit(vuexContext, context) {
        await initRequests(context);
    },
    logout(vuexContext, context) {
        requestLogout(context);
    },
    handleInitRequestError(vuexContext, payload) {

        // Redirect to error page.
        const errorMsg = getErrorMsg(payload.error);
        vuexContext.commit('setInitRequestErrorMsg', errorMsg);
        if (payload.context.redirect) {
            payload.context.redirect('/error');
        }
    },
    setLoginLoading(vuexContext, loading) {
        vuexContext.commit('setLoginLoading', loading);
    }
};

export const getters = {
    baseURL(state) {
        return state.baseURL;
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
