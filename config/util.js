/**
 * @description Variables, classes and functions as helper assets.
 */
export const adminURL = `http://admin.internal-fw.local/`;

export class AxiosConfig {
    constructor() {
        this.method = 'POST';
        this.url = `${adminURL}graphql`;
        this.data = {};
    }
}

/**
 * @description Helper function for transforming Admin URL.
 */
export function transformAdminURLs(items, baseURL) {
    return items.reduce((agg, cur) => {
        cur.url = cur.url.replace(adminURL, baseURL);
        agg.push(cur);
        return agg;
    }, []);
}

/**
 * @description Helper functions for error handling.
 */
export function getErrorMsg(error) {
    if (error.response) {
        // Request made and server responded
        console.log('DATA: ', error.response.data);
        console.log('STATUS: ', error.response.status);
        console.log('HEADERS: ', error.response.headers);

        return 'There was an issue with received data. Please try again later.';
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);

        return 'There was an issue connecting to the server. Please try again later.';
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log(error);
        return error.message;
    }
}
