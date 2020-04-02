<template>
    <div>
        <MainHeader/>

        <main id="main" class="site-main" role="main">
            <nuxt/>
        </main>

        <MainFooter/>
    </div>
</template>

<script>
	import MainHeader from '../components/main/MainHeader';
	import MainFooter from '../components/main/MainFooter';

	export default {
		components: {
			MainHeader,
			MainFooter
		}
	};
</script>

<style lang="scss" scoped>
    .site-main {
        min-height: 100vh;
    }
</style>
