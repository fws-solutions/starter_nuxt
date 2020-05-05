/**
 * Query Page
 *
 * @description Define GraphQL query for single page.
 */

import { fcBasicBlock } from './fcBasicBlock';
import { fcBoxLinks } from './fcBoxLinks';

export const queryPage = (pageId) => `{
    page(id: "${pageId}", idType: DATABASE_ID) {
        id
        pageId
        title
        date
        uri
        slug
        hidePageTitle {
            hideTitle
        }
        featuredImage {
            sourceUrl(size: MAX_WIDTH)
        }
        flexibleContent {
            content {
                __typename
                ${fcBasicBlock}
                ${fcBoxLinks}
            }
        }
    }
}`;
