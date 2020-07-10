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
        featuredImage {
            node {
                sourceUrl(size: MAX_WIDTH)
            }
        }
        fc_content {
            content {
                ${fcBasicBlock}
            }
        }
    }
}`;
