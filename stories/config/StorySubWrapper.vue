<template>
    <div class="styleguide__sub-wrap">
        <h3 class="styleguide__subtitle">{{title}}</h3>

        <slot/>
    </div>
</template>

<script>
    export default {
        props: {
            title: String
        }
    }
</script>

<style lang="scss" scoped>
    .styleguide__sub-wrap {
        margin-bottom: 70px;
    }

    .styleguide__subtitle {
        font-size: 18px;
        font-family: $font-main;
        color: $red;
        margin: 0 0 25px;
        padding-bottom: 5px;
        border-bottom: 1px solid $red;
        display: inline-block;
    }
</style>
