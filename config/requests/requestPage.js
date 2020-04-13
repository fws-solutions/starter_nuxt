/**
 * Request Page
 *
 * @description Define request for a single page.
 */

import { queryPage } from '../graphql/queryPage/queryPage';
import { AxiosConfig } from '../util';

export async function requestPage(context, pageItems, route) {
    // get current page
    const slug = route && route.params.slug ? route.params.slug : 'home';
    const pageId = pageItems[slug]['pageId'];
    const curPageConfig = new AxiosConfig();

    curPageConfig.data.query = queryPage(pageId);

    return context.$axios(curPageConfig)
        .then((response) => {
            const curPageResponse = response.data.data.pageBy;
            const curPage = curPageResponse ? curPageResponse : {};

            context.$store.commit('pages/setCurrentPage', curPage, { root: true });
        });
}
