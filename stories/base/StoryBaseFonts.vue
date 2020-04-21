<template>
    <div class="row">
        <div class="col-md-12">
            <StorySubWrapper title="Fonts">
                <ul class="styleguide__fonts">
                    <li v-for="font in fonts" class="styleguide__fonts-items" :class="font.classes">{{font.name}}</li>
                </ul>
            </StorySubWrapper>
        </div>
    </div>
</template>

<script>
    import StorySubWrapper from '../config/StorySubWrapper';

    export default {
        components: {
            StorySubWrapper
        },

        data: function() {
            return {
                fonts: [
                    {
                        name: 'Montserrat',
                        classes: 'font-font-main'
                    }
                ]
            };
        }
    };
</script>

<style lang="scss" scoped>
    .styleguide__fonts {
        list-style: none;
    }

    .styleguide__fonts-items {
        font-size: 26px;
        display: block;
    }
</style>
