/**
 * Initialize multiple requests
 *
 * @description Define multiple request to run one after another.
 */

import { requestPage } from './requestPage';
import { AxiosConfig, transformAdminURLs } from '../util';
import { queryPages } from '../graphql/queryPages';
import { queryMenuByLocation } from '../graphql/queryMenu';

class pageObj {
    constructor(title, pageId) {
        this.title = title;
        this.pageId = pageId;
    }
}

export function initRequests(context, fromLoginPage = false) {
    /*
    * Request all menus, pages and current page. */
    const requestConfig = new AxiosConfig(`{
        allPages: ${queryPages()}
        menu1: ${queryMenuByLocation('MENU_1')}
    }`);

    return context.$axios(requestConfig)
        .then((response) => {
            const responseData = response.data.data;

            let pageItems = responseData.allPages.nodes || [];
            let menuItems1 = responseData.menu1.nodes;
            /*
            * Transform admin URLs. */
            menuItems1 = transformAdminURLs(menuItems1, context.$store.state.baseURL);
            context.$store.commit('menus/setMenu', menuItems1);

            /*
            * Transform received array into an object.
            * Each array item is transformed into object's prop with 'slug' as a prop's name.
            * This will allow requestPage.js and _slug.vue to get appropriate page ID. */
            if (pageItems.length > 0) {
                pageItems = pageItems.reduce((agg, cur) => {
                    agg[cur.slug] = new pageObj(cur.title, cur.pageId);
                    return agg;
                }, {});

                context.$store.commit('pages/setPages', pageItems);
            }

            return pageItems;
        }).then(pageItems => {
            if (fromLoginPage) {
                context.$router.push({
                    path: '/'
                });
            }

            return requestPage(context, pageItems, context.route);
        });

}
