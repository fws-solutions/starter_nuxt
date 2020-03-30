<template>
    <nav class="site-nav">
        <ul class="site-nav__list">
            <li class="site-nav__item"
                v-for="item in menuItems"
                :key="item.id">
                <nuxt-link class="site-nav__link" :to=item.url>{{item.label}}</nuxt-link>
                <MainNavigationSub v-if="item.childItems" :subItems="item.childItems.nodes" :depth="1"/>
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
    }

    .site-nav__item {
        margin-bottom: 5px;
    }

    .site-nav__link {
        display: inline-block;
        text-decoration: none;
        color: $grey;
        font-weight: 600;
        transition: $dur $ease;

        &:hover {
            color: $red;
        }

        &.nuxt-link-active {
            color: $red;
        }
    }
</style>
