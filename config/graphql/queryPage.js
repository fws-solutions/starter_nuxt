/**
 * Query Page
 *
 * @description Define GraphQL query for single page.
 */

import acfFc from './queryAcf/queryAcfFc/queryAcfFc';
import { getAcfFlexContent } from './queryAcf/queryAcfUtils';

export const queryPage = (pageId, hasAcfFc = true) => `{
    page(id: "${pageId}", idType: DATABASE_ID) {
        id
        databaseId
        title
        date
        uri
        slug
        featuredImage {
            sizes(size: MAX_WIDTH)
        }
        ${getAcfFlexContent(hasAcfFc, acfFc)}
    }
}`;
