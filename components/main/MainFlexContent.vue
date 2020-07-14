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

        data() {
            return {
                prefix: 'page_FcContent_Content_'
            };
        },
        methods: {
            loadComponent(fieldGroupName) {
                switch (fieldGroupName) {
                    case `${this.prefix}BasicBlock`:
                        return 'BlockBasic';
                    case `${this.prefix}Banner`:
                        return 'BlockBanner';
                    case `${this.prefix}Slider`:
                        return 'BlockSlider';
                }
            }
        }
    };
</script>
