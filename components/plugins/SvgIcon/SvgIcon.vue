<template>
    <span class="svg-icon" @click="submitClick">
        <Icon :iconName="iconName"/>
    </span>
</template>

<script>
    import Icon from './SvgIconGen';

    export default {
        props: {
            iconName: {
                type: String,
                required: true
            },
            onClick: {
                type: Function
            }
        },
        components: {
            Icon
        },
        methods: {
            submitClick(e) {
                if (this.onClick) {
                    this.onClick(e);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .svg-icon {
        display: inline-flex;
        line-height: 1;

        svg {
            width: 1em;
        }
    }
</style>
