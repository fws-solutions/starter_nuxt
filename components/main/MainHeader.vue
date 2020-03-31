<template>
    <header id="masthead" class="site-header">
        <b-container>
            <div class="site-header__container">
                <div class="site-header__branding">
                    <nuxt-link class="site-header__logo" to="/">
                        <img class="site-header__logo-img" src="@/static/fw-logo.svg" alt="Logo" title="">
                    </nuxt-link>
                </div>

                <div class="site-header__nav-outer">
                    <div class="site-header__nav-inner">
                        <MainNavigation :menuItems="menuItems"/>
                    </div>
                </div>
            </div>
        </b-container>

        <PartHamburger v-if="showHamburger" class="site-header__hamburger"/>
    </header>
</template>

<script>
	import PartHamburger from '../parts/PartHamburger';
	import MainNavigation from './MainNavigation/MainNavigation';

	export default {
		components: {
			PartHamburger,
			MainNavigation
		},

		data() {
			return {
				showHamburger: false,
				innerWidth: 0,
                menuItems: [
                    {
                        url: 'http://admin.starter-nuxt.local/home/',
                        label: 'Home',
                        childItems: {
                            nodes: []
                        }
                    },
                    {
                        url: 'http://admin.starter-nuxt.local/sample-page/',
                        label: 'Sample Page',
                        childItems: {
                            nodes: []
                        }
                    },
                    {
                        url: 'http://admin.starter-nuxt.local/page-b/',
                        label: 'Page B',
                        childItems: {
                            nodes: []
                        }
                    },
                    {
                        url: 'http://admin.starter-nuxt.local/page-a/',
                        label: 'Page A',
                        childItems: {
                            nodes: [
                                {
                                    label: 'Level 2b',
                                    url: 'http://admin.starter-nuxt.local/level-1/level-2b/',
                                    childItems: {
                                        nodes: []
                                    }
                                },
                                {
                                    label: 'Level 2a',
                                    url: 'http://admin.starter-nuxt.local/level-1/level-2a/',
                                    childItems: {
                                        nodes: [
                                            {
                                                label: 'Level 3b',
                                                url: 'http://admin.starter-nuxt.local/level-1/level-2/level-3b/'
                                            },
                                            {
                                                label: 'Level 3a',
                                                url: 'http://admin.starter-nuxt.local/level-1/level-2/level-3a/'
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        url: 'http://admin.starter-nuxt.local/about/',
                        label: 'About The Tests',
                        childItems: {
                            nodes: [
                                {
                                    label: 'Page Markup And Formatting',
                                    url: 'http://admin.starter-nuxt.local/about/page-markup-and-formatting/',
                                    childItems: {
                                        nodes: []
                                    }
                                },
                                {
                                    label: 'Page Image Alignment',
                                    url: 'http://admin.starter-nuxt.local/about/page-image-alignment/',
                                    childItems: {
                                        nodes: []
                                    }
                                },
                                {
                                    label: 'Clearing Floats',
                                    url: 'http://admin.starter-nuxt.local/about/clearing-floats/',
                                    childItems: {
                                        nodes: []
                                    }
                                }
                            ]
                        }
                    }
                ]
			};
		},

		computed: {
			// menuItems() {
			// 	return this.$store.getters['menus/getMenuItems'];
			// }
		},

		methods: {
			handleResize() {
				this.innerWidth = window.innerWidth;
			}
		},

		watch: {
			innerWidth(newWidth) {
				this.showHamburger = newWidth < 1200;
			}
		},

		beforeMount() {
			window.addEventListener('resize', this.handleResize);
			this.handleResize();
		},

		destroyed() {
			window.removeEventListener('resize', this.handleResize);
		}
	};
</script>

<style lang="scss" scoped>
    .site-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        background-color: $red;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 60px;
        z-index: 1001;
    }

    .site-header__container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .site-header__branding {
        display: flex;
        align-items: center;
    }

    .site-header__logo {
        color: $white;
        display: block;
        max-width: 170px;
    }

    .site-header__logo-img {
        display: block;
        width: 100%;
    }

    .site-header__nav-outer {
        @include mq($xl) {
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            width: 100vw;
            background-color: rgba($white, .5);
            z-index: 1010;
        }
    }

    .site-header__nav-inner {
        @include mq($xl) {
            position: absolute;
            right: 0;
            top: 0;
            width: 300px;
            height: 100%;
            background-color: $black;
            display: block;
            padding: 50px 30px;
        }
    }

    .site-header__hamburger {
        @include mq($xl) {
            right: 15px;
            @include center(y);
            z-index: 1100;
        }
    }
</style>
