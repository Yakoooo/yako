<template>
	<com :comdata='this.$route.params.id'></com>
</template>

<script>
	import comment from '../comments/comment.vue'
	export default{
		components:{
			com:comment
		}
	}
</script>

<style>
</style>
