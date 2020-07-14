/**
 * Request Page
 *
 * @description Define request for a single page.
 */

import { queryPage } from '../graphql/queryPage';
import { AxiosConfig } from '../util';

export async function requestPage(context, pageItems, route) {

    const $store = context.$store || context.store || context;

    // get current page
    const slug = route && route.params.slug ? route.params.slug : 'home';
    const pageId = pageItems[slug]['pageId'];
    const curPageConfig = new AxiosConfig(queryPage(pageId));

    return context.$axios(curPageConfig)
        .then((response) => {
            if (response?.data?.errors) {
                console.log(response.data.errors);
                return null;
            }

            const curPageResponse = response?.data?.data?.page;
            const curPage = curPageResponse ? curPageResponse : {};

            $store.commit('pages/setCurrentPage', curPage, { root: true });
        }).catch(e => {
            console.log(e);
        });
}
