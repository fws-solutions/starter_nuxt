<template>
    <div class="styleguide">
        <div class="container">
            <div class="styleguide__head">
                <h2 class="styleguide__head--mod">{{title}}</h2>
            </div>
        </div>

        <div :class="fluid ? 'container-fluid' : 'container'">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            fluid: Boolean
        }
    }
</script>
