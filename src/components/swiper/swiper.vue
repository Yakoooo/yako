<template>
	<mt-swipe :auto="4000">
		<mt-swipe-item v-for="item in lunbo" :key="item.id">
			<img :src=" item.img " :class=" [ { 'isFull': isFulle } ] " />
		</mt-swipe-item>
	</mt-swipe>
</template>

<script>
	export default{
		data:function(){
			return {}
		},
		methods:{
			
		},
		props:['lunbo','isFulle']
	}
</script>

<!-- 两个组件对轮播图宽度有不同需求，所以把宽度样式分开，绑定class [{}]，写表达式 -->
<!-- 然后由父组件返回的booleam值，决定使用与否宽度样式 -->

<style lang="less">
	.mint-swipe {
		height: 200px;
		.mint-swipe-items-wrap{
			text-align: center;
			img{
				height: 100%;
			}
		}
	}
	.isFull{
		width: 100%
	}
</style>
