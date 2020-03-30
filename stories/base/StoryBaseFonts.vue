<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <ul class="styleguide__fonts">
                    <li v-for="font in fonts" class="styleguide__fonts-items" :class="font.classes">{{font.name}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
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
