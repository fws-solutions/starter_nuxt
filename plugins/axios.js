import {requestMe, requestRefresh} from "../config/requests/authRequests";
import {errorExists} from "../config/util";

export default function ({ store, $axios, redirect }) {
    $axios.onRequest(config => {

        // If authToken exists
        if(store.$storage.getUniversal('_authToken')) {
            // set authToken header for current request
            config.headers.Authorization = 'Bearer ' + store.$storage.getUniversal('_authToken');

            // and for all next requests
            $axios.setHeader('Authorization', 'Bearer ' + store.$storage.getUniversal('_authToken'));
        }
    });

    $axios.onError(error => {

        if([500,404].includes(error.response.status)) {
            redirect('/error')
        }

        if([401,403].includes(error.response.status)) {

            if (!store.$storage.getUniversal('_authToken')) {
                store.commit('setLoginErrorMsg', 'You need to be logged in to access that page.');
                redirect('/login');
            }

            const originalRequest = error.config;

            // If request failed because of invalid token
            if (errorExists(error, 'invalid-secret-key')) {
                requestRefresh(store, originalRequest);
            }
        }
    })
}
