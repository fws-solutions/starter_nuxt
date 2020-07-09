/**
 * Pages Store Module
 *
 * @description Store state, mutations, actions and getters for pages.
 */

import { requestPage } from '../config/requests/requestPage';

export const state = () => ({
    loadedPages: {},
    currentPage: {}
});

export const mutations = {
    setPages(state, pages) {
        state.loadedPages = pages;
    },
    setCurrentPage(state, page) {
        state.currentPage = page;
    }
};

export const actions = {
    async setCurrentPage(vuexContext, context) {
        try {
            await requestPage(context, vuexContext.state.loadedPages, context.$route);
        } catch (error) {
            vuexContext.dispatch('handleInitRequestError', {context, error}, {root: true});
        }
    }
};

export const getters = {
    loadedPages(state) {
        return state.loadedPages;
    },
    currentPage(state) {
        return state.currentPage;
    }
};
