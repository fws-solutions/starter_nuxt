<template>
    <b-row class="styleguide__icons">
        <b-col v-for="svg in svgIcons" :key="svg.fileName" md="2">
            <div class="styleguide__icons-item">
                <SvgIcon class="styleguide__icons-icon" :iconName="svg.fileName"/>
                <span class="styleguide__icons-name">{{svg.fileName}}</span>
            </div>
        </b-col>
    </b-row>
</template>

<script>
    import SVGs from '../config/svgIconList.json';
    import SvgIcon from '../../components/plugins/SvgIcon/SvgIcon';

    export default {
        components: {
            SvgIcon
        },

        computed: {
            svgIcons() {
                return SVGs;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .styleguide__icons-item {
        background: #f1f1f1;
        margin-bottom: 30px;
        position: relative;
        padding-bottom: 100%;
    }

    .styleguide__icons-name {
        font-size: 14px;
        display: block;
        text-align: center;
        position: absolute;
        left: 0;
        bottom: 5px;
        width: 100%;
        color: $grey-mid;
    }

    .styleguide__icons-icon {
        font-size: 35px;
        @include center;
    }
</style>
