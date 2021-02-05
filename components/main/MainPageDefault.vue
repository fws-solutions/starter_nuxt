<template>
    <div class="page-wrapper" :data-slug="pageData.slug">
        <MainFlexContent
            v-if="flexContent"
            :key="pageId"
            :content="flexContent"
            :fluid="!!$route.params.slug"
        />
    </div>
</template>

<script>
    import MainFlexContent from '../../components/main/MainFlexContent';

    export default {
        fetch() {
            return this.$store.dispatch('pages/setCurrentPage', this);
        },

        components: {
            MainFlexContent
        },

        computed: {
            pageData() {
                return this.$store.getters['pages/currentPage'];
            },
            pageId() {
                return this.pageData?.ID;
            },
            flexContent() {
                return this.pageData?.acf?.content;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .page-wrapper__title {
        color: $red;
        margin-bottom: 30px;
    }
</style>

