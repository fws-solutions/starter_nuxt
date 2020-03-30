<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="entry-content">
                    <ol>
                        <li v-for="page in pages">
                            <a :href="page.url" target="_blank" rel="noopener">{{page.name}}</a>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                pages: [
                    {
                        name: 'Home',
                        url: '/'
                    }
                ]
            };
        }
    };
</script>
