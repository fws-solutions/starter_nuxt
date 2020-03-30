<template>
    <button class="loading-btn" :class="preloader ? 'loading-btn--loading' : ''" :type="type">
        <span class="loading-btn__slot"><slot/></span>

        <span class="loading-btn__preloader"><span></span><span></span><span></span><span></span></span>
    </button>
</template>

<script>
	export default {
		props: {
			text: String,
            type: String,
            preloader: Boolean
        }
	};
</script>

<style lang="scss" scoped>
    button {
        position: relative;
        display: block;
        width: 100%;
        height: 40px;
        max-width: 150px;
        text-align: center;
        border-radius: 5px;
        line-height: 1;
        background-color: $red;
        color: $white;
        box-shadow: none;
        outline: none;
        border: 1px solid $red;
        transition: $dur $ease;

        &:hover {
            background-color: $white;
            color: $red;
        }

        &.loading-btn--loading {
            background-color: $red;
            color: $white;
            pointer-events: none;

            .loading-btn__preloader {
                display: block;
            }

            .loading-btn__slot {
                display: none;
            }
        }
    }

    .loading-btn__slot {
        @include center;
    }

    .loading-btn__preloader {
        display: none;
        width: 20px;
        height: 20px;
        right: 15px;
        opacity: .7;
        @include center;

        span {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border-width: 3px;
            border-style: solid;
            border-color: $white transparent transparent transparent;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

            &:nth-child(1) {
                animation-delay: -0.45s;
            }
            &:nth-child(2) {
                animation-delay: -0.3s;
            }
            &:nth-child(3) {
                animation-delay: -0.15s;
            }
        }
    }

    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
