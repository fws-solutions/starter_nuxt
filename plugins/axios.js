export default function ({store, $axios, redirect}) {

    $axios.onRequest(config => {

        // If authToken exists
        if (store.$storage.getUniversal('_authToken')) {
            // set authToken header for current request
            config.headers.Authorization = 'Bearer ' + store.$storage.getUniversal('_authToken');

            // and for all next requests
            $axios.setHeader('Authorization', 'Bearer ' + store.$storage.getUniversal('_authToken'));
        } else {
            // unset for current request
            config.headers.Authorization = null;

            // and for all next requests
            $axios.setHeader('Authorization', null);
        }
    });

    $axios.onResponse(response => {

        // Handle updating the token
        if (response.headers['x-session-update']) {
            store.$storage.setUniversal('_authToken', response.headers['x-session-update']);
            $axios.setHeader('Authorization', 'Bearer ' + store.$storage.getUniversal('_authToken'));
        }
    })

    $axios.onError(async (error) => {

        // Unknown error
        if (!error.response) {
            console.log(error);
            return;
        }

        // Server error or 404
        if ([500, 404].includes(error.response.status)) {
            redirect('/error');
            return false;
        }

        // Authorization errors
        if([401,403].includes(error.response.status)) {

            // If token was present
            if (store.$storage.getUniversal('_authToken')) {
                store.commit('setLoginErrorMsg', 'Your session expired. Please login again.');

                // Remove all tokens and user session
                store.dispatch('logout', store, store);

            } // If user wasn't logged in at all
            else {
                store.commit('setLoginErrorMsg', 'You need to be logged in to access that page.');
            }

            return redirect('/login');
        }
    })
}
