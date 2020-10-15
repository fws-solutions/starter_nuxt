<template>
    <footer class="site-footer">
        {{ copyright }}
    </footer>
</template>

<script>
export default {
    data() {
        return {
            copyright: `Copyright © ${ new Date().getFullYear() } Forwardslash | All rights reserved`
        }
    }
}
</script>


<style lang="scss" scoped>
    .site-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: $grey-mid;
        font-size: 12px;
        padding: 20px;
        background-color: $black;
    }
</style>
