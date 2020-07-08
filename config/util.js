/**
 * @description Variables, classes and functions as helper assets.
 */
export class AxiosConfig {
    constructor(query, adminURL = process.env.NUXT_ENV_ADMIN_URL) {
        this.method = 'POST';
        this.url = `${adminURL}graphql`;
        this.data = {};
        if(query) {
            this.data.query = query;
        }
    }
}

/**
 * @description Check whether error response contains specific error
 *
 * @param error
 * @param term
 * @returns {boolean}
 */
export function errorExists(error, term) {
    if (!error.response.data.errors) {
        return false;
    }

    let exists = false;

    error.response.data.errors.forEach((item, index) => {
        if (item.message && item.message.includes(term)) {
            exists = true;
        }
    });

    return exists;
}

/**
 * @description Helper function for transforming Admin URL.
 */
export function transformAdminURLs(items, baseURL) {
    return items.reduce((agg, cur) => {
        cur.url = cur.url.replace(process.env.NUXT_ENV_ADMIN_URL, baseURL);
        agg.push(cur);
        return agg;
    }, []);
}

export function domQueryAll(selector, parent, callback) {
    parent.querySelectorAll(selector).forEach(el => {
        callback(el);
    });
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

/**
 * @description Toggle slide animation.
 */
export const slideToggle = {
    config: {
        duration: 300,
        easing: 'ease-in'
    },

    slideUp: (target, configuration = {}) => {
        const config = {...slideToggle.config, ...configuration};

        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = config.duration + 'ms';
        target.style.transitionTimingFunction = config.easing;
        target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.style.removeProperty('transition-timing-function');
        }, config.duration);
    },

    slideDown: (target, configuration = {}) => {
        const config = {...slideToggle.config, ...configuration};

        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;

        if (display === 'none') {
            display = 'block';
        }

        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = config.duration + 'ms';
        target.style.transitionTimingFunction = config.easing;
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.style.removeProperty('transition-timing-function');
        }, config.duration);
    },

    slideToggle: (target, configuration = {}) => {
        const config = {...slideToggle.config, ...configuration};

        if (window.getComputedStyle(target).display === 'none') {
            return this.slideDown(target, config);
        } else {
            return this.slideUp(target, config);
        }
    }
};

export const Prllx = {
    el: '.js-parallax',
    lastKnownScrollPos: 0,
    ticking: false,

    setParallax: function(el) {
        window.requestAnimationFrame || (window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame);

        const speed = parseFloat(el.getAttribute('data-speed'));
        const offsetTop = el.getBoundingClientRect().top + window.scrollY;

        Prllx.runParallax(el, Prllx.lastKnownScrollPos, speed, offsetTop);

        window.addEventListener('scroll', function() {
            Prllx.lastKnownScrollPos = window.scrollY;

            if (!Prllx.ticking) {
                window.requestAnimationFrame(function() {
                    Prllx.runParallax(el, Prllx.lastKnownScrollPos, speed, offsetTop);
                    Prllx.ticking = false;
                });
            }

            Prllx.ticking = true;
        });
    },
    runParallax: function(el, scrollTop, speed, offsetTop) {
        const elTop = el.getBoundingClientRect().top + window.scrollY;
        const offset = scrollTop - (elTop - offsetTop);
        let value = offset * speed;
        value = value < 0 ? 0 : value;

        el.style.transform = `translateY(${value}px)`;
    }
};

