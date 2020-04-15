<template>
    <div>
        <b-row class="styleguide__buttons">
            <b-col v-for="btn in buttons" md="3">
                <StorySubWrapper :title="btn.text">
                    <div class="styleguide__btn">
                        <a href="javascript:;" :class="btn.classes">{{btn.text}}</a>
                    </div>
                </StorySubWrapper>
            </b-col>
        </b-row>
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
                buttons: [
                    {
                        text: 'Normal',
                        classes: 'btn'
                    },
                    {
                        text: 'Green Button',
                        classes: 'btn btn--green'
                    },
                    {
                        text: 'Big Button',
                        classes: 'btn btn--big'
                    },
                    {
                        text: 'Big Green Button',
                        classes: 'btn btn--big btn--green'
                    }
                ]
            };
        },
    };
</script>
