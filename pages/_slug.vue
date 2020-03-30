<!--<template>-->
<!--    <MainFlexContent-->
<!--        v-if="pageData.flexibleContent"-->
<!--        :data-slug="pageData.slug"-->
<!--        :key="pageData.id"-->
<!--        :content="pageData.flexibleContent.content"-->
<!--        :fluid="!!$route.params.slug"-->
<!--    />-->
<!--</template>-->

<!--<script>-->
<!--    import MainFlexContent from '../components/main/MainFlexContent';-->
<!--    import { transitionBasic } from '../config/transitions/transitionBasic';-->

<!--    export default {-->
<!--        components: {-->
<!--            MainFlexContent-->
<!--        },-->

<!--        beforeCreate() {-->
<!--            this.$store.dispatch('pages/setCurrentPage', this);-->
<!--        },-->

<!--        computed: {-->
<!--            pageData() {-->
<!--                return this.$store.getters['pages/currentPage'];-->
<!--            }-->
<!--        },-->

<!--        transition(context) {-->
<!--            return transitionBasic(context);-->
<!--        }-->
<!--    };-->
<!--</script>-->

