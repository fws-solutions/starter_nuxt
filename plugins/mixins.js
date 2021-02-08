import Vue from 'vue';

Vue.mixin({
    methods: {
        generateRandomID() {
            return '_' + Math.random().toString(36).substr(2, 9);
        },

        removeLazyPreloader(el) {
            el.parentNode.classList.add('hide-preloader');
        }
    }
});
