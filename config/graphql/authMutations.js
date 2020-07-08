/**
 * Auth Mutations
 *
 * @description Define GraphQL mutation for logging in.
 */
export const mutationLogin = (username, password, clientMutationId) => `mutation LoginUser {
    login(input: {
        clientMutationId: "${clientMutationId}"
        username: "${username}"
        password: "${password}"
    }) {
        authToken
        ${user}
    }
}`;

export const mutationLogout = (clientMutationId) => `mutation LogoutUser {
    logout(input: { clientMutationId: "${clientMutationId}" }) {
        success
    }
}`;

const user = `
    user {
        name
        firstName
        lastName
        email
        avatar {
            url
        }
    }
`;
