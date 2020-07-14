/**
 * Query Menu
 *
 * @description Define GraphQL query for menu items.
 */

const nodeItems = `
    id
    url
    label
`;

const childItems = (nodeItems, times) => {
    let query = '';

    if (times > 0) {
        query += `
            childItems {
                nodes {
                    ${nodeItems}
                    ${childItems(nodeItems, --times)}
                }
            }
        `;
    }

    return query;
};

export const queryMenuByLocation = (loc) => `
    menuItems(where: {location: ${loc}}) {
        nodes {
            ${nodeItems}
            ${childItems(nodeItems, 2)}
        }
    }
`;
