<template>
    <header id="masthead" class="site-header" ref="header">
        <b-container>
            <div class="site-header__container">
                <div class="site-header__branding">
                    <nuxt-link class="site-header__logo" to="/">
                        <img class="site-header__logo-img" src="@/static/fw-logo.svg" alt="Logo" title="">
                    </nuxt-link>
                </div>

                <div class="site-header__nav-outer" :class="menuOpen ? classActive : ''">
                    <div class="site-header__nav-inner">
                        <MainNavigation :menuItems="menuItems"/>
                    </div>
                </div>
            </div>
        </b-container>

        <PartHamburger
            v-if="showHamburger"
            class="site-header__hamburger"
            :isActive="menuOpen"
            :onClick="toggleMenu"
        />
    </header>
</template>

<script>
    import PartHamburger from '../parts/PartHamburger';
    import MainNavigation from './MainNavigation/MainNavigation';
    import { domQueryAll, slideToggle } from '../../config/util';

    export default {
        components: {
            PartHamburger,
            MainNavigation
        },

        data() {
            return {
                showHamburger: false,
                menuOpen: false,
                classActive: 'is-active',
                innerWidth: 0
            };
        },

        computed: {
            menuItems() {
                return this.$store.getters['menus/getMenuItems'];
            }
        },

        methods: {
            handleResize() {
                this.innerWidth = window.innerWidth;
            },
            toggleMenu() {
                let timeout;
                const slNavIcon = '.js-nav-icon';
                const slSubNav = '.js-subnav';

                this.menuOpen = !this.menuOpen;

                if (!this.menuOpen) {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        domQueryAll(slSubNav, this.$refs.header, el => {
                            el.parentNode.querySelector(slNavIcon).classList.remove(this.classActive);
                            slideToggle.slideUp(el, {duration: 10});
                        });
                    }, 300);
                }
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
            z-index: 1010;
            visibility: hidden;
            transition: $dur $ease $dur;

            &::before {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba($white, .5);
                opacity: 0;
                visibility: hidden;
                transition: $dur $ease;
            }

            &.is-active {
                visibility: visible;
                transition: $dur $ease;

                &::before {
                    opacity: 1;
                    visibility: visible;
                }
            }
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
            transform: translateX(100%);
            transition: $dur $ease;

            .is-active & {
                transform: translateX(0);
            }
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
