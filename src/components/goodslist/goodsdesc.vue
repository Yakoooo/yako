<template>
	<div class="desc-container">
		<h1> {{ descinfo.title }} </h1>
		<hr />
		<div v-html=" descinfo.content "></div>
	</div>
</template>

<script>
	export default{
		data:function(){
			return {
				descinfo:[],
			}
		},
		created:function(){
			this.getdesc();
		},
		methods:{
			getdesc(){
				this.$axios.get('http://www.liulongbin.top:3005/api/goods/getdesc/' + this.$route.params.id).then(result=>{
					if(result.data.status === 0){
						this.descinfo = result.data.message[0]
						console.log(this.descinfo)
					}else{
						console.log("??????????")
					}
				})
		}
	},
	}
</script>

<style lang="less">
	.desc-container{
		margin: 0.3125rem;
		h1{
			font-size: 0.875rem;
			text-align: center;
			color: blue;
			font-family: 'Courier New', Courier, monospace;
			line-height: 1.875rem;
		}
		img{
			width: 100%
		}
	}
</style>
