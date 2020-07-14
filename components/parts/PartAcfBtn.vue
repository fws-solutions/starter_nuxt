<template>
    <nuxt-link
        v-if="button"
        class="btn"
        :to="button.url | transAdminURL"
        :target="button.target ? button.target : false"
        :rel="button.target === '_blank' ? 'noopener' : false"
    >{{button.title}}
    </nuxt-link>
</template>

<script>
    export default {
        props: {
            button: {
                type: Object,
                required: true
            }
        }
    };
</script>
