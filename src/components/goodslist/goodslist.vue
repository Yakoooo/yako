<template>
	<div>
	<div class="goodslist">
		<div class="goodsitem" @click="getgoodsinfo(item.id)" v-for="item in goods" :key="item.id">
			<img :src=" item.img_url " />
			<h1>{{ item.title }}</h1>
			<div class="goodsinfo">
				<p class="list-s">
					<span class="now"> ￥ {{ item.sell_price }}</span>
					<span class="old"> ￥ {{ item.market_price }}</span>
				</p>
				<p class="info">
					<span>热卖中</span>
					<span>剩余{{ item.stock_quantity }}件</span>
				</p>
			</div>
		</div>
	</div>
	<mt-button @click="getindex()" type="primary" size="large" plain>加载</mt-button>
	</div>
</template>

<script>
	export default{
		data:function(){
			return { 
				pageindex : 1,
				goods : [],
			}
		},
		created:function(){
			this.getgoods();
		},
		methods:{
			getgoods:function(){
				this.$axios.get('http://www.liulongbin.top:3005/api/getgoods?pageindex='+ this.pageindex).then(result=>{
					if(result.data.status === 0){
						this.goods = this.goods.concat(result.data.message)
						
					}else{
						Toast('失败')
					}
				})
			},
			getindex:function(){
				this.pageindex ++;
				this.getgoods();
			},
			getgoodsinfo:function(id){
				this.$router.push({ path : '/home/goodslist/item/' + id})
			}
		}
	}
</script>

<style lang="less">
	.goodslist{
		padding: 0.3125rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.goodsitem{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 0.1875rem;
			box-shadow: 0 0 0.125rem #888888;
			width: 49%;
			margin-bottom: 0.3125rem;
			img{
				width: 100%;
			}
			h1{
				font-size: 14px;
			}
			.goodsinfo{
				background-color: #eee;
				.list-s{
					margin: 0rem;
					padding: 0.3125rem;
					.now{
						color: red;
					}
					.old{
						margin-left:1.25rem;
						text-decoration: line-through;
					}
				}
				.info{
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>
