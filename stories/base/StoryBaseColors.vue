<template>
    <b-row class="styleguide__colors">
        <b-col v-for="color in colors" :key="color" md="2" class="styleguide__color-item">
            <span :class="`styleguide__color bg-${color}`"></span>
            <span class="styleguide__color-name">{{color}}</span>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        data() {
            return {
                colors: [
                    'black',
                    'white',
                    'red',
                    'green',
                    'grey',
                    'grey-mid',
                    'grey-light'
                ]
            }
        }
    };
</script>

<style lang="scss" scoped>
    .styleguide__color-item {
        margin-bottom: 30px;
    }

    .styleguide__color {
        display: inline-block;
        width: 100%;
        height: 50px;
    }

    .styleguide__color-name {
        display: block;
        font-size: 16px;
        color: $grey;
        text-align: center;
        margin: 10px 0 0;
    }
</style>
