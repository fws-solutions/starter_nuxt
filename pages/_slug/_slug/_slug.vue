<template>
    <MainPageDefault/>
</template>

<script>
    import MainPageDefault from '../../../components/main/MainPageDefault';
    import { transitionBasic } from '~/config/transitions/transitionBasic';

    export default {
        components: {
            MainPageDefault
        },

        transition(context) {
            return transitionBasic(context);
        }
    };
</script>
