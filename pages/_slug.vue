<template>
    <MainFlexContent
        v-if="pageData.fc_content"
        :data-slug="pageData.slug"
        :key="pageData.id"
        :content="pageData.fc_content.content"
        :fluid="!!$route.params.slug"
    />
</template>

<script>
    import MainFlexContent from '../components/main/MainFlexContent';

    export default {
        components: {
            MainFlexContent
        },

        beforeCreate() {
            this.$store.dispatch('pages/setCurrentPage', this);
        },

        computed: {
            pageData() {
                return this.$store.getters['pages/currentPage'];
            }
        }
    };
</script>

