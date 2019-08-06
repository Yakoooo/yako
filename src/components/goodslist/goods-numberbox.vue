<template>
	<div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'><!-- 因为异步调用 子组件可能拿不到max所以用watch监听数值，拿到立马刷新 -->
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="text" value="1" @change="getValue" ref="v"/>
		<!-- @change可以监听标签 根据变化调用绑定的方法 --> <!-- ref绑定一个dom元素给用户使用 -->
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.min.js'
	export default{
		methods:{
			getValue:function(){
				//调用父属性的方法把 value 传递给父组件
				this.$emit('getnumber',this.$refs.v.value)
			}
		},
		mounted:function(){
			mui('.mui-numbox').numbox()
		},
		props:['max'],
		watch:{
			max:function(newVla,oldVla){
				//监听到数据变化设置max
				mui('.mui-numbox').numbox().setOption('max',newVla)
			}
		}
	}
</script>

<style>
</style>
