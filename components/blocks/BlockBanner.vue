<template>
    <section class="banner">
        <picture v-if="data.image" class="banner__image">
            <source v-if="" media="(min-width: 1200px)" :srcset="data.image.sourceUrlDesk">
            <source v-if="data.image.sourceUrlTab" media="(min-width: 640px)" :srcset="data.image.sourceUrlTab">
            <source v-if="data.image.sourceUrlMob" media="(min-width: 320px)" :srcset="data.image.sourceUrlMob">
            <img class="cover-img" :src="data.image.sourceUrlDesk" alt="">
        </picture>

        <b-container>
            <div class="banner__caption">
                <SvgIcon class="banner__caption-icon" iconName="ico-happy"/>

                <h1 v-if="data.title" class="banner__caption-title">{{data.title}}</h1>
                <p v-if="data.text" class="banner__caption-text">{{data.text}}</p>

                <a v-if="data.scrollTo.button" class="banner__btn btn" href="javascript:;" @click="clickItem">{{data.scrollTo.button}}</a>
            </div>
        </b-container>
    </section>
</template>

<script>
    import SvgIcon from '../plugins/SvgIcon/SvgIcon';
    import VueScrollTo from 'vue-scrollto';

    export default {
        components: {
            SvgIcon
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
            clickItem(e) {
                e.preventDefault();
                VueScrollTo.scrollTo(this.data.scrollTo.ID, 600, this.scrollOptions);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .banner {
        height: 100vh;
        position: relative;
        max-height: 600px;

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
