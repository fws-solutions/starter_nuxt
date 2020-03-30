/**
 * Mutation Login
 *
 * @description Define GraphQL mutation for logging in.
 */

export const queryMutationRefresh = (refreshToken) => `mutation RefreshUser {
    refreshJwtAuthToken(input: {
        jwtRefreshToken: "${refreshToken}",
        clientMutationId: ""
    }) {
        authToken
    }
}`;

export const queryMutationLogin = (user, pass) => `mutation LoginUser {
    login(input: {
        clientMutationId: ""
        username: "${user}"
        password: "${pass}"
    }) {
        authToken
        refreshToken
        user {
            id
            name
        }
    }
}`;
