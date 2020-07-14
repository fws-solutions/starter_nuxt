/**
 * Page Flexible Content - Box Links
 *
 * @description Define GraphQL query for ACF Flexible Content layout Box Links.
 */
import { acfFlexPrefix, acfLinkField } from '../queryAcfUtils';

const acfFcBanner = `
... on ${acfFlexPrefix}Banner {
    fieldGroupName
    sectionTitle
    subtitle
    button {
        ${acfLinkField}
    }
    scrollTo {
        id
        title
    }
    desktopImage {
        sourceUrl(size: MAX_WIDTH)
    }
    tabletImage {
        sourceUrl(size: MEDIUM)
    }
    mobileImage {
        sourceUrl(size: THUMBNAIL)
    }
}`;

export default acfFcBanner;
