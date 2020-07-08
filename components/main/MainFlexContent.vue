<template>
    <div class="flex-content">
        <slot v-for="block in content">
            <component v-bind:is="loadComponent(block.fieldGroupName)" :data="block" :fluid="fluid"/>
        </slot>
    </div>
</template>

<script>
    import BlockBasic from '../blocks/BlockBasic';

    export default {
        components: {
            BlockBasic
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
                }
            }
        }
    };
</script>
