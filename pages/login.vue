<template>
    <BlockLoginForm/>
</template>

<script>
	import BlockLoginForm from '../components/blocks/BlockLoginForm';

	export default {
	    middleware: 'notAuthenticated',
		layout: 'noHeader',

		components: {
			BlockLoginForm
        }
	};
</script>

