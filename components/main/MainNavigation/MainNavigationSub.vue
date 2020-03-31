<template>
    <ul class="site-subnav__list" :class="`site-subnav__list--depth-${navDepth}`">
        <li class="site-subnav__item"
            v-for="item in navItems"
            :key="item.id"
        >
            <a v-if="item.url.includes('#')" class="site-subnav__link" :href="item.url">{{item.label}}</a>
            <nuxt-link v-else class="site-subnav__link" :to="item.url">{{item.label}}</nuxt-link>

            <MainNavigationSub
                v-if="item.childItems && item.childItems.nodes.length > 0"
                :subItems="item.childItems.nodes"
                :depth="depthInc(navDepth)"/>
        </li>
    </ul>
</template>

<script>
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
				navDepth: this.depth
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
	        }
        }
	};
</script>

<style lang="scss" scoped>
    .site-subnav__list {
        position: absolute;
        left: 0;
        top: 100%;
        z-index: 10;
        background-color: $white;
        transition: $dur $ease;
        transform: translateY(5px);
        opacity: 0;
        visibility: hidden;
        padding: 15px;
        list-style: none;
        margin: 0;
        font-size: 14px;
        line-height: 1.3;
        box-shadow: 5px 5px 0 0 rgba($black, .3);

        .site-subnav__list {
            left: 100%;
            top: 0;
            transform: translateX(5px);
        }
    }

    .site-subnav__item {
        margin: 20px 0;
        position: relative;

        &::after {
            content: '';
            display: block;
            background-color: $red;
            width: 100%;
            height: 1px;
            position: absolute;
            bottom: -10px;
            left: 0;
        }

        &:first-of-type {
            margin-top: 0;
        }

        &:last-of-type {
            margin-bottom: 0;

            &::after {
                content: none;
            }
        }

        @include hover {
            > .site-subnav__link {
                color: $red;
            }

            /deep/ {
                > .site-subnav__list {
                    transform: translateX(0);
                    opacity: 1;
                    visibility: visible;
                }
            }
        }
    }

    .site-subnav__link {
        width: 200px;
        display: block;
        color: $black;
        transition: $dur $ease;
    }
</style>
