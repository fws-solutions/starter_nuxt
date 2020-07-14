/**
 * ACF Query Helpers
 *
 * @description Collection of query params for certain ACFs.
 */

/**
 * @description Returns query for flexible content.
 *
 * @param hasAcfFc boolean
 * @param acfFc string
 * @returns {string}
 */
export const getAcfFlexContent = (hasAcfFc, acfFc) => {
    if (!hasAcfFc) {
        return '';
    }

    return acfFc;
};

/**
 * @description Prefix for flexible content field.
 */
export const acfFlexPrefix = 'Page_FcContent_Content_';

/**
 * @description Query params for ACF button field.
 */
export const acfLinkField = `
    title
    url
    target
`;
