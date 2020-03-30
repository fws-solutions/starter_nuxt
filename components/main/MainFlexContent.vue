<template>
    <div class="flex-content">
        <slot v-for="block in content">
            <component v-bind:is="loadComponent(block.__typename)" :data="block" :fluid="fluid"/>
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
                prefix: 'Page_Flexiblecontent_Content_'
            };
        },
        methods: {
            loadComponent(typename) {
                switch (typename) {
                    case `${this.prefix}BasicBlock`:
                        return 'BlockBasic';
                    case `${this.prefix}BoxLinks`:
                        return 'BlockBoxLinks';
                }
            }
        }
    };
</script>
