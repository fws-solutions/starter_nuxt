/**
 * Auth Mutations
 *
 * @description Define GraphQL mutation for logging in.
 */

export const mutationRefresh = (refreshToken) => `mutation RefreshJwtAuthToken {
    refreshJwtAuthToken(
    input: {
        clientMutationId: "",
        jwtRefreshToken: "${refreshToken}"
    } )
    {
    authToken
}
}`;

export const mutationLogin = (username, password) => `mutation LoginUser {
    login(input: {
        clientMutationId: ""
        username: "${username}"
        password: "${password}"
    }) {
        authToken
        refreshToken
        ${user}
    }
}`;

export const mutationMe = () => `mutation Me {
    me(input: {
        clientMutationId: ""
    }) {
        ${user}
    }
}`;

const user = `user {
    name
    firstName
    email
}`;
