<template>
    <section class="slider">
        <swiper
            class="slider__carousel"
            :options="swiperOption"
            ref="sliderSwiper"
        >
            <swiper-slide
                class="slider__slide"
                v-for="(slide, i) in data.slides"
                :key="`slider-${i}${generateRandomID()}`"
            >
                <PartMediaItem
                    class="slider__figure"
                    :src="slide.sizes.large"
                    :lazy="true"
                />
            </swiper-slide>
        </swiper>
    </section>
</template>

<script>
import PartMediaItem from '@/components/parts/PartMediaItem';

export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    components: {
        PartMediaItem
    },
    data() {
        return {
            swiperOption: {
                loop: true,
                autoplay: true,
                slidesPerView: 4
            }
        }
    },
    computed: {
        swiper() {
            return this.$refs.sliderSwiper.$swiper
        }
    },
    mounted() {
        if (window.VanillaLazyLoad) {
            window.VanillaLazyLoad.update();
        }
    }
};
</script>

<style lang="scss" scoped>
.slider__figure {
    &,
    /deep/ img {
        display: block !important;
        width: 100%;
        outline: 0;
    }
}
</style>
