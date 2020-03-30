<template>
    <b-container>
        <h1>Issue with a server!</h1>

        <p>{{initRequestErrorMsg}}</p>
    </b-container>
</template>

<script>
	export default {
		created() {
			if (!this.initRequestErrorMsg) {
				this.$router.push('/');
			}
		},

		computed: {
			initRequestErrorMsg() {
				return this.$store.getters.initRequestErrorMsg;
			}
		}
	};
</script>

