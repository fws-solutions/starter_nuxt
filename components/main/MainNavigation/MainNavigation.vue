<template>
    <nav class="site-nav">
        <ul class="site-nav__list">
            <li class="site-nav__item"
                v-for="item in menuItems"
                :key="item.id">
                <nuxt-link class="site-nav__link" :to=item.url>{{item.label}}</nuxt-link>
                <MainNavigationSub v-if="item.childItems && item.childItems.nodes.length > 0" :subItems="item.childItems.nodes" :depth="1"/>
            </li>
        </ul>
    </nav>
</template>

<script>
	import MainNavigationSub from './MainNavigationSub';

	export default {
		components: {
			MainNavigationSub
		},

		props: {
			menuItems: {
				type: Array,
				required: true
			}
		}
	};
</script>

<style lang="scss" scoped>
    .site-nav__list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .site-nav__item {
        position: relative;
        margin-left: 20px;

        &:first-child {
            margin: 0;
        }

        @include hover {
            @include hover {
                > .site-nav__link::after {
                    transform: translateX(-50%) scaleX(1);
                }
            }

            /deep/ {
                > .site-subnav__list {
                    transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
                }
            }
        }
    }

    .site-nav__link {
        display: block;
        position: relative;
        text-decoration: none;
        color: $white;
        transition: $dur $ease;

        &::after {
            content: '';
            display: block;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%) scaleX(0);
            width: 100%;
            height: 1px;
            background-color: $white;
            transition: $dur $ease;
        }

        &.nuxt-link-active {
            color: $red;
        }
    }
</style>
