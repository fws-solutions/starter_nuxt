import Vue from 'vue';
import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay } from 'swiper/swiper.esm';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';

SwiperClass.use([Pagination, Mousewheel, Autoplay]);

const {Swiper, SwiperSlide} = getAwesomeSwiper(SwiperClass);
Vue.component('swiper', Swiper);
Vue.component('swiper-slide', SwiperSlide);

import 'swiper/swiper.min.css';
