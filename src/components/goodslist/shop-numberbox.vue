<template>
	<div class="mui-numbox" data-numbox-min='1'><!-- 因为异步调用 子组件可能拿不到max所以用watch监听数值，拿到立马刷新 -->
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input @change="numboxA" ref='inputb' id="test" class="mui-input-numbox" type="text" :value=" numb "/>
		<!-- @change可以监听标签 根据变化调用绑定的方法 --> <!-- ref绑定一个dom元素给用户使用 -->
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.min.js'
	export default{
		methods:{//要修改商品的数量，不推荐直接调用$store.state.cart改数据,所以在mutation定义方法由numboxA调用
			numboxA:function(){ //numbox监听数字的变化，调用方法
				//调用mutation 中 addsetcart方法，吧id 和数据 提交过去
				this.$store.commit('addsetcart',{
					id : this.numberid,
					cont : parseInt(this.$refs.inputb.value)
				})
			}
		},
		mounted:function(){
			mui('.mui-numbox').numbox()
		},
		props:['numb','numberid'],
		watch:{
		}
	}
</script>

<style scoped>
	.mui-numbox{
		height: 25px;
	}
</style>
