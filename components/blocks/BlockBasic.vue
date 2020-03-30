<template>
    <section class="basic-block" v-if="data.content" :id="data.sectionId">
        <b-container>
            <div class="entry-content" v-html="data.content" @click="imgClick"></div>
        </b-container>

        <CoolLightBox
            :items="items"
            :index="index"
            @close="closeLightBox">
        </CoolLightBox>
    </section>
</template>

<script>
    import CoolLightBox from 'vue-cool-lightbox';

	export default {
		props: {
			data: {
				type: Object,
				required: true
			}
		},

        components: {
            CoolLightBox
        },

        data: function () {
            return {
                items: [],
                index: null
            };
        },

        methods: {
            imgClick(e) {
                const el = e.target;
                const elClass = el.getAttribute('class');
                if (elClass && elClass.includes('wp-image')) {
                    e.preventDefault();
                    this.items.push(el.parentNode.getAttribute('href'));
                    this.index = 0;
                }
            },

            closeLightBox() {
                this.items = [];
                this.index = null;
            }
        },
	};
</script>
