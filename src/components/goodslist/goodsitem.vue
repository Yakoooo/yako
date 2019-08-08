<template>
	<div class="goods-content">
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :lunbo="lunbo" :isFulle='false'></swiper>
				</div>
			</div>
		</div>
		<transition
		@before-enter="beforenter"
		@enter="enter"
		@after-enter="afterenter"
		>
			<div class="ball" v-if="flag" ref="btn"></div>
		</transition>
		<div class="mui-card">
			<div class="mui-card-header">{{ goodsinfo.title }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="sp">
						市场价：<del>￥{{ goodsinfo.market_price }}</del> &nbsp;&nbsp;销售价：￥{{ goodsinfo.sell_price }}
					</p>
					<p> 购买数量 <number :max='goodsinfo.stock_quantity' @getnumber='getnumber'></number> </p>
					<p>  <!-- 绑定数据给子组件 -->
						<mt-button type='primary' size='small'>立即购买</mt-button>
						<mt-button type='danger' size='small' @click="addcart">加入购物车</mt-button>
					</p>
				</div>
			</div>
		</div>

		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{ goodsinfo.goods_no }}</p>
					<p>库存情况：{{ goodsinfo.stock_quantity }}</p>
					<p>上架时间：{{ goodsinfo.add_time | hous }}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button @click="godesc" type="primary" size="large" plain>图文介绍</mt-button>
				<mt-button @click="gocom" type="danger" size="large" plain>商品评论</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import swiper from '../swiper/swiper.vue'
	import number from './goods-numberbox.vue'

	export default {
		data: function() {
			return {
				id: this.$route.params.id,
				lunbo: [],
				goodsinfo:[],
				flag:false,
				numberb:1,
			}
		},
		created: function() {
			this.getlunbo();
			this.getgoodsinfo();
		},
		methods: {
			getlunbo: function() {
				this.$axios.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id).then(result => {
					if (result.data.status === 0) {
						this.lunbo = result.data.message
						this.lunbo.forEach(function(item) {
							item.img = item.src
						})
					} else {
						console.log("50")
					}
				})
			},
			getgoodsinfo(){
				this.$axios.get('http://www.liulongbin.top:3005/api/goods/getinfo/' + this.id).then(result => {
					if(result.data.status === 0){
						this.goodsinfo = result.data.message[0]
					}else{
						console.log('自己检查');
					}
				})
			},
			godesc:function(){
				this.$router.push({ name:'godesc' ,params : this.id })
			},
			gocom:function(){
				this.$router.push({ name:'gocom' ,params : this.id })
			},
			beforenter(el){
				el.style.transform = 'translate(0,0)'
			},
			enter(el,done){
				el.offsetWidth
				
				//因为分辨率，小球的终点可能会出问题，通过ref获取元素位置和终点计算，获得偏差
				const ball = this.$refs.btn.getBoundingClientRect();
				const ball2 = document.getElementById('ball2').getBoundingClientRect();
				
				const xd = ball2.left - ball.left;
				const yd = ball2.top - ball.top;
				
				el.style.transform = `translate(${ xd }px,${ yd }px)`
				el.style.transition = 'all 1s cubic-bezier(.47,-0.09,.63,.92)'
				done();
			},
			afterenter(el){
				this.flag = !this.flag;
			},
			getnumber:function(num){
				this.numberb = num;
				//写个方法给子组件调用，子组件一调用，父组件就保存子组件传入的值，从而获取子组件的数据
			},
			addcart:function(){
				this.flag = !this.flag
				//点击购物车，将数据写一串数组，传给vuex。购物车组件再从vuex调用
				var cart = {
					'id' : this.id, // 商品id
					'numberb' : parseInt(this.numberb),  //购买数量
					'price' : parseInt(this.goodsinfo.sell_price), //价格
					'selected' : true //默认商品状态
				}
				
				this.$store.commit('addcar',cart)
			}
		},
		components: {
			//注册组件
			swiper: swiper,
			number: number
		}
	}
</script>

<style lang="less">
	.ball{
		position: absolute;
		width: 0.9375rem;
		height: 0.9375rem;
		background-color:red;
		z-index: 999;
		border-radius: 50%;
		top: 390px;
		left: 138px;
	}
	.goods-content {
		background-color: #EEEEEE;
		overflow: hidden;
		.mui-card-header{
			font-size: 0.875rem;
		}
	}
	.sp{
		del{
			color: red;
		}
	}
	.mui-card-footer{
		display: block;
		.mint-button--large{
			margin: 10px 0px;
		}
	}
</style>
