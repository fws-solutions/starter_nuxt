<template>
    <div class="slider">
        <VueSlickCarousel
            :slidesToShow="4"
            :slidesToScroll="1"
            :arrows="false"
            :autoplay="true"
        >
            <div class="slider__figure" v-for="slide in data.slides">
                <img class="slider__img" :src="slide.sourceUrl" alt="">
            </div>
        </VueSlickCarousel>
    </div>
</template>

<script>
    import VueSlickCarousel from 'vue-slick-carousel'

    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        components: {
            VueSlickCarousel
        }
    };
</script>

<style lang="scss" scoped>
    .slider {
        /deep/ {
            .slick-slide > div {
                outline: 0;
            }
        }
    }

    .slider__figure,
    .slider__img {
        display: block !important;
        width: 100%;
        outline: 0;
    }

    .slider__img {
        pointer-events: none;
    }
</style>
