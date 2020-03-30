<template>
    <div class="container">
        <div class="styleguide__buttons">
            <div v-for="btn in buttons" class="styleguide__btn">
                <a href="javascript:;" :class="btn.classes">{{btn.text}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
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
