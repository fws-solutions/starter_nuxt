<template>
    <section class="slider">
        <VueSlickCarousel
            :slidesToShow="4"
            :slidesToScroll="1"
            :arrows="false"
            :autoplay="true"
        >
            <PartMediaItem
                class="slider__figure"
                v-for="(slide, i) in data.slides"
                :key="`slider-${i}${generateRandomID()}`"
                :src="slide.sizes.large"
                :lazy="true"
            />
        </VueSlickCarousel>
    </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import PartMediaItem from '@/components/parts/PartMediaItem';

export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    components: {
        VueSlickCarousel,
        PartMediaItem
    },
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

.slider__figure {
    &,
    /deep/ img {
        display: block !important;
        width: 100%;
        outline: 0;
    }

    /deep/ img {
        pointer-events: none;
    }
}
</style>
