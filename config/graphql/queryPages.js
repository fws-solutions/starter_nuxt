/**
 * Query Pages
 *
 * @description Define GraphQL query for pages.
 */

export const queryPages = () => `
    pages(first: 50) {
        nodes {
            title
            pageId
            slug
        }
    }
`;
