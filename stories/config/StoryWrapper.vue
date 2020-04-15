<template>
    <div class="styleguide">
        <b-container>
            <div class="styleguide__head">
                <h2 class="styleguide__head-title">{{title}}</h2>
            </div>
        </b-container>

        <div class="styleguide__container" :class="(container ? 'container' : '') + (noLabels ? ' styleguide__container--no-labels' : '')">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            container: Boolean,
            noLabels: Boolean
        }
    }
</script>

<style lang="scss" scoped>
    .styleguide {
        padding: 50px 0 150px;
        min-height: 100vh;
        background:
            linear-gradient(135deg, $sg-grey 21px, $white 22px, $white 24px, transparent 24px, transparent 67px, $white 67px, $white 69px, transparent 69px),
            linear-gradient(225deg, $sg-grey 21px, $white 22px, $white 24px, transparent 24px, transparent 67px, $white 67px, $white 69px, transparent 69px)0 64px;
        background-color: $sg-grey;
        background-size: 64px 128px;
        background-attachment: fixed;
    }

    .styleguide__container {
        border-style: dashed;
        border-color: $sg-blue;
        border-width: 1px 0;
        position: relative;

        &::before,
        &::after {
            display: block;
            background-color: $sg-blue;
            padding: 1px;
            color: $white;
            text-align: center;
            width: 120px;
            font-size: 11px;
            letter-spacing: 2px;
            position: absolute;
            left: 50%;
        }

        &::before {
            content: 'start section';
            top: 0;
            transform: translate(-50%, -100%);
        }

        &::after {
            content: 'end section';
            bottom: 0;
            transform: translate(-50%, 100%);
        }

        &.styleguide__container--no-labels {
            border: 0;

            &::before,
            &::after {
                content: none;
            }
        }
    }

    .styleguide__head {
        width: 100%;
        padding: 0 0 20px;
        border-bottom: 1px solid $sg-orange;
        margin: 0 0 55px;
        color: $sg-orange;
        font-size: 35px;
        font-weight: 500;
    }

    .styleguide__head-title {
        color: $sg-orange;
        font-size: 35px;
        font-weight: 500;
    }
</style>
