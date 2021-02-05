<template>
    <section class="banner">
        <picture v-if="data.desktop_image" class="banner__image">
            <source v-if="data.desktop_image.sizes['max-width']" media="(min-width: 1200px)" :srcset="data.desktop_image.sizes['max-width']">
            <source v-if="data.tablet_image.sizes.large" media="(min-width: 640px)" :srcset="data.tablet_image.sizes.large">
            <source v-if="data.mobile_image.sizes.medium" media="(min-width: 320px)" :srcset="data.mobile_image.sizes.medium">
            <img class="cover-img" :src="data.desktop_image.sizes['max-width']" alt="">
        </picture>

        <b-container>
            <div class="banner__caption">
                <SvgIcon class="banner__caption-icon" iconName="ico-happy"/>

                <h1 v-if="data.section_title" class="banner__caption-title">{{data.section_title}}</h1>
                <p v-if="data.subtitle" class="banner__caption-text">{{data.subtitle}}</p>

                <span v-if="data.scroll_to.id" class="banner__btn btn" @click="e => clickItem(e, `#${data.scroll_to.id}`)">{{data.scroll_to.title}}</span>
                <PartAcfBtn v-if="data.button" class="banner__btn" :button="data.button"/>
            </div>
        </b-container>
    </section>
</template>

<script>
    import SvgIcon from '../plugins/SvgIcon/SvgIcon';
    import VueScrollTo from 'vue-scrollto';
    import PartAcfBtn from '../parts/PartAcfBtn';

    export default {
        components: {
            SvgIcon,
            PartAcfBtn
        },
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                scrollOptions: {
                    easing: 'ease-in-out',
                    offset: -70,
                    force: true
                },
            }
        },
        methods: {
            clickItem(e, scrollTo) {
                console.log(this.data.button)
                e.preventDefault();
                VueScrollTo.scrollTo(scrollTo, 600, this.scrollOptions);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .banner {
        height: 100vh;
        position: relative;
        max-height: 600px;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba($black, .75);
            z-index: 1;
        }

        @include mq($sm) {
            max-height: 400px;
        }
    }

    .banner__caption {
        @include center;
        text-align: center;
        color: $white;
        z-index: 1;
    }

    .banner__image {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        overflow: hidden;
    }

    .banner__caption-icon {
        color: $white;
        font-size: 20px;
    }

    .banner__btn {
        margin-top: 30px;
    }
</style>
