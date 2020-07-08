/**
 * Query User
 *
 * @description Define GraphQL query for current user.
 */

export const queryUser = `
    viewer {
        name
        firstName
        lastName
        email
        avatar {
            url
        }
    }
`;
