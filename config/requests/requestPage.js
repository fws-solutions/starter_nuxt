/**
 * Request Page
 *
 * @description Define request for a single page.
 */
import { AxiosConfig } from '../util';

export async function requestPage(vuexContext, context, pages, slug) {

    slug = slug === '/' ? 'home' : slug;

    if (!pages[slug]) {
        const error = {message: `Page '/${slug}' does not exist.`, statusCode: 404};
        vuexContext.dispatch('handleInitRequestError', {context, error}, {root: true});
        return;
    }

    const id = pages[slug]['pageId'];

    const curPageConfig = new AxiosConfig(`fws/page/${id}`);

    return context.$axios(curPageConfig)
        .then(response => {
            if (!response.data.success) {
                return;
            }

            vuexContext.commit('pages/SET_CURRENT_PAGE', response.data.data, { root: true });
        });
}
