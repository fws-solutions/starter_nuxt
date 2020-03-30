<template>
    <div>
        <main id="main" class="site-main" role="main">
            <nuxt/>
        </main>

        <MainFooter/>
    </div>
</template>

<script>
	import MainFooter from '../components/main/MainFooter';

	export default {
		components: {
			MainFooter
		}
	};
</script>

<style lang="scss" scoped>
    .site-main {
        min-height: calc(100vh - 124px);
    }

    .site-footer {
        margin: 0;
    }
</style>
