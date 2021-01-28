<template>
    <div class="flex-content">
        <slot v-for="block in content">
            <component v-bind:is="loadComponent(block.fieldGroupName)" :data="block" :fluid="fluid"/>
        </slot>
    </div>
</template>

<script>
    import BlockBasic from '../blocks/BlockBasic';
    import BlockBanner from '../blocks/BlockBanner';
    import BlockSlider from '../blocks/BlockSlider';

    export default {
        components: {
            BlockBasic,
            BlockBanner,
            BlockSlider
        },

        props: {
            content: {
                type: Array,
                required: true
            },
            fluid: {
                type: Boolean
            }
        },
        methods: {
            loadComponent(fieldGroupName) {
                switch (fieldGroupName) {
                    case `basic_block`:
                        return 'BlockBasic';
                    case `banner`:
                        return 'BlockBanner';
                    case `slider`:
                        return 'BlockSlider';
                }
            }
        }
    };
</script>
