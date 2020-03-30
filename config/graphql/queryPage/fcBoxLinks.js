/**
 * Page Flexible Content - Box Links
 *
 * @description Define GraphQL query for ACF Flexible Content layout Box Links.
 */
import { acfLinkField } from '../acfHelpers';

export const fcBoxLinks = `
... on Page_Flexiblecontent_Content_BoxLinks {
    boxes {
        box {
            ${acfLinkField}
        }
    }
}`;
