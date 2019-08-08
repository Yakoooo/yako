<template>
	<div class="shop-info">
		<div class="mui-card" v-for="(item,i) in cartinfo" :key="item.id">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<mt-switch v-model="$store.getters.getboxstate[item.id]" @change="changestate(item.id,$store.getters.getboxstate[item.id])"></mt-switch>
					<img :src=" item.thumb_path " />
					<div class="info">
						<h1>{{ item.title }}</h1>
						<p>
							<span>￥{{ item.sell_price }}</span>
							<number :numb="$store.getters.getshopnum[item.id]" :numberid=" item.id "></number>
							<!-- :numbb=" item.id " -->
							<!-- 利用返回来的对象，通过键获取值 --><!-- 该对象已经用id作为键绑定了数量作为值，通过渲染对象，的id去获取自己id对应的数量 -->
							<a href="#" @click.prevent="removegoods( item.id , i)">删除</a>
							<!-- 点击删除列表中的某一项，要操作存有数据的cartinfo，还有存在localStorage本地的数据也要删除 -->
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner js">
					<div class="left">
						<p>总计（不含运费)</p>
						<p>已勾选商品<span> {{ this.$store.getters.zs.shu }} </span>件，总计<span>￥ {{ this.$store.getters.zs.jia }}</span></p>
					</div>
					<mt-button type='danger'>去结算</mt-button>
				</div>
			</div>
		</div>
		<p>{{ this.$store.getters.getboxstate }}</p>
	</div>
</template>

<script>
	import number from './goodslist/shop-numberbox.vue'
	//先获取购物车中所有的数据，从vuex仓库中，再保存
	
	export default{
		data:function(){
			return { 
				cartinfo:[],
				}
		},
		created(){
			this.getshopinfo();
		},
		methods:{
			getshopinfo:function(){
				var cart = [];
				this.$store.state.cart.forEach(item=>{ cart.push(parseInt(item.id)) })
				// console.log(cart);
				
				//获取购物数据
				this.$axios.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/' +  cart.join(",")).then(result=>{
					if(result.data.status === 0){
						this.cartinfo = result.data.message
						// console.log(this.cartinfo)
					}else{
						console.log("错误")
					}
				})
			},
			removegoods:function(id ,index){//触发事件，删除数组中对应索引的对象（商品），索引由循环提供
				this.cartinfo.splice(index,1)//从索引index开始，删除一个   这是删除本组件的数组而已
				this.$store.commit('removecartitem',id)
			},
			changestate:function(id , state){//写方法获取到cange事件返回的状态
				// console.log(id + '---' + state) // 把数据同步到vuex的cart，保存
				this.$store.commit('getshopstate',{'id':id ,'state':state})
				//装成对象，传参给getshopstate  //吧对应id和状态回传
			}
		},
		components:{
			number:number,
		}
	}
</script>

<style lang="less">
	.shop-info{
		background-color: #eee;
		overflow: hidden;
		.mui-card-content-inner{
			display: flex;
			justify-content: space-between;
			align-items: center;
			img{
				height: 3.125rem;
				width: 3.125rem;
			}
			.info{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				h1{
					font-size: 0.8125rem;
				}
				span{
					color: red;
				}
			}
		}
		.js{
			display: flex;
			justify-content: space-between;
			align-items: center;
			span{
				color: red;
				font-weight: bold;
			}
		}
	}
</style>
