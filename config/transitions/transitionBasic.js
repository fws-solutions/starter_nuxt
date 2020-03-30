/**
 * Transition Basic
 *
 * @description Define page transition object.
 */

import anime from 'animejs';

/**
 * @description Define default Anime values.
 */
class AnimeConfig {
    constructor(targets, enter = false, dur = 300) {
        this.targets = targets;
        this.opacity = enter ? [0, 1] : [1, 0];
        this.translateY = enter ? ['20px', 0] : [0, '20px'];
        this.duration = dur;
        this.easing = 'cubicBezier(.42, 0, .58, 1)';
    }
}

/**
 * @description Construct transition object.
 */
export const transitionBasic = (context) => {
    let interval;

    return {
        mode: 'out-in',
        css: false,

        beforeEnter(el) {
            el.style.opacity = 0;
        },

        enter(el, done) {
            /*
            * Set/clear interval that checks whether content from a new page is loaded.
            * A new page content is loaded via Axios request, the interval is checking
            * 'slug' value from the route with 'data-slug' attribute from a new page content.
            * Route's 'slug' value will not be equal immediately as 'data-slug' is not changed until
            * Axios request is finished successfully.
            * The exception is going back to Home page, as slug in that case is 'undefined'.*/
            clearInterval(interval);
            const startTime = new Date().getTime();
            interval = setInterval(() => {
                /*
                * Just in case something goes wrong, interval will be cleared after 15sec.*/
                if (new Date().getTime() - startTime > 15000) {
                    clearInterval(interval);
                    el.style.transform = '';
                    el.style.opacity = '';
                    done();
                }

                const elSlug = el.getAttribute('data-slug');
                const pageSlug = context.params.slug;

                if (elSlug === pageSlug || (elSlug === 'home' && pageSlug === undefined)) {
                    clearInterval(interval);

                    const animeConf = new AnimeConfig(el, true);
                    animeConf.complete = () => {
                        el.style.transform = '';
                        el.style.opacity = '';
                        done();
                    };

                    anime(animeConf);
                }
            }, 100);
        },

        leave(el, done) {
            const animeConf = new AnimeConfig(el);
            animeConf.complete = () => {
                el.style.opacity = 0;
                done();
            };

            anime(animeConf);
        }
    };
};
