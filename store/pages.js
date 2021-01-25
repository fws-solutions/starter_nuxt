/**
 * Pages Store Module
 *
 * @description Store state, mutations, actions and getters for pages.
 */

import { requestPage } from '../config/requests/requestPage';
import { getPages } from "../config/requests/initRequests";

export const state = () => ({
    loadedPages: {},
    currentPage: {}
});

export const mutations = {
    SET_PAGES(state, pages) {
        state.loadedPages = pages;
    },
    SET_CURRENT_PAGE(state, page) {
        state.currentPage = page;
    }
};

export const actions = {
    setCurrentPage(vuexContext, context) {
        const route = context.$route?.params?.slug || context.$route.path;
        let pages = vuexContext.state.loadedPages;

        if (pages[route]) {
            return requestPage(vuexContext, context, pages, route);
        } else {
            return getPages(vuexContext, context).then((pages) => {
                return requestPage(vuexContext, context, pages, route);
            })
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
