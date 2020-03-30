<template>
    <ul class="site-nav__list site-nav__list--sublist" :class="`site-nav__list--sublist-depth-${navDepth}`">
        <li class="site-nav__item"
            v-for="item in navItems"
            :key="item.id"
        >
            <a v-if="item.url.includes('#')" class="site-nav__link" :href=item.url @click="clickItem">{{item.label}}</a>
            <nuxt-link v-else class="site-nav__link" :to=item.url>{{item.label}}</nuxt-link>

            <MainNavigationSub
                v-if="item.childItems"
                :subItems="item.childItems.nodes"
                :depth="depthInc(navDepth)"/>
        </li>
    </ul>
</template>

<script>
    import VueScrollTo from 'vue-scrollto';
    import {transformAdminURLs} from '../../../config/util';

    export default {
		name: 'MainNavigationSub',

		props: {
			subItems: {
				type: Array,
				required: true
			},
			depth: {
				type: Number,
				required: true
			}
		},

		data() {
			return {
				navDepth: this.depth,
                scrollOptions: {
                    easing: 'ease-in-out',
                    offset: -70,
                    force: true
                }
			};
		},

        computed: {
			navItems() {
				return transformAdminURLs(this.subItems, this.$store.getters.baseURL);
            }
        },

        methods: {
	        depthInc(depth) {
		        return ++depth;
	        },

            clickItem(e) {
	            e.preventDefault();
	            const elID = `#${e.target.getAttribute('href').split('#')[1]}`;
                VueScrollTo.scrollTo(elID, 600, this.scrollOptions);
            }
        }
	};
</script>

<style lang="scss" scoped>
    .site-nav__list {
        &.site-nav__list--sublist {
            padding-left: 15px;
            display: none;
        }
    }

    .nuxt-link-active + .site-nav__list {
        &.site-nav__list--sublist {
            display: block;
        }
    }

    .site-nav__link {
        display: inline-block;
        text-decoration: none;
        color: $grey;
        font-size: 14px;
        transition: $dur $ease;

        &:hover {
            color: $red;
        }
    }
</style>
