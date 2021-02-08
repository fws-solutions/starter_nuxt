<template>
    <div class="media-wrap" :class="classWrapper">
        <img
            ref="mediaItem"
            class="media-item cover-img lazy"
            :src="attrSrc"
            :alt="alt"
            :data-src="lazySrc"
        >
    </div>
</template>

<script>
import LazyLoad from 'vanilla-lazyload';

export default {
    props: {
        size: {
            type: String,
            default: 'square'
        },

        alt: {
            type: String,
            default: ''
        },

        src: {
            type: String,
            default: ''
        },

        lazy: {
            type: Boolean,
            default: false
        },

        lazyThumb: {
            type: String,
            default: ''
        }
    },

    mounted() {
        const _this = this;

        if (!window.VanillaLazyLoad) {
            window.VanillaLazyLoad = new LazyLoad({
                unobserve_entered: true,
                callback_loaded: _this.removeLazyPreloader // called from mixins.js
            });
        } else {
            window.VanillaLazyLoad.update();
        }

    },

    computed: {
        classWrapper() {
            let classes = `media-wrap--${this.size}`;

            if (this.lazy) {
                classes += this.lazyThumb ? ' media-wrap--lazy-thumb' : ' media-wrap--lazy-loader';
            }

            return classes;
        },

        attrSrc() {
            if (!this.lazy) {
                return this.src;
            }

            if (this.lazyThumb) {
                return this.lazyThumb;
            }

            return '';
        },

        lazySrc() {
            return this.lazy ? this.src : false;
        }
    }
};
</script>

<style lang="scss" scoped>
/*--------------------------------------------------------------
## Wrapper and Ratios
--------------------------------------------------------------*/
.media-wrap {
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        display: block;
        width: 100%;
    }
}

// modifier size classes
// formula for calculating padding percentage:
// (height / width * 100) = padding-top: %;
.media-wrap--square::before {
    padding-top: 100%;
}

.media-wrap--400x280::before {
    padding-top: 70%;
}

// modifier for lazy loading
.media-wrap--lazy-loader {
    background: $grey-light;

    &::after {
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        background: $grey-light;
        margin-top: -20px;
        animation: lazyPreloading 800ms ease infinite;
        transition: $dur / 2 $ease;
        @include center;
    }

    &.hide-preloader::after {
        visibility: hidden;
        opacity: 0;
    }
}

// item
.media-item {
    display: block;
}

// lazy preloading animation
$l-light: rgba($white, .6);
$l-dark: rgba($grey-mid, .2);
$l-bkg: $grey-light;

@keyframes lazyPreloading {
    0%, 100% {
        box-shadow: -13px 20px $l-dark, 13px 20px 0 $l-light, 13px 46px 0 $l-light, -13px 46px 0 $l-light, 0 0 0 1000em $l-bkg;
    }
    25% {
        box-shadow: -13px 20px 0 $l-light, 13px 20px $l-dark, 13px 46px 0 $l-light, -13px 46px 0 $l-light, 0 0 0 1000em $l-bkg;
    }
    50% {
        box-shadow: -13px 20px 0 $l-light, 13px 20px 0 $l-light, 13px 46px $l-dark, -13px 46px 0 $l-light, 0 0 0 1000em $l-bkg;
    }
    75% {
        box-shadow: -13px 20px 0 $l-light, 13px 20px 0 $l-light, 13px 46px 0 $l-light, -13px 46px $l-dark, 0 0 0 1000em $l-bkg;
    }
}
</style>
