<template>
	<div>
		<!-- 一个根目录 -->
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="item in lunbo" :key="item.id">
				<img :src=" item.img " />
			</mt-swipe-item>
		</mt-swipe>

		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/news">
					<img src="../images/menu1.png" />
					<div class="mui-media-body">新闻资讯</div>
				</router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<img src="../images/menu2.png" />
					<div class="mui-media-body">图片分享</div>
				</a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<img src="../images/menu3.png" />
					<div class="mui-media-body">商品购买</div>
				</a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<img src="../images/menu4.png" />
					<div class="mui-media-body">留言反馈</div>
				</a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<img src="../images/menu5.png" />
					<div class="mui-media-body">视频专区</div>
				</a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<img src="../images/menu6.png" />
					<div class="mui-media-body">联系我们</div>
				</a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<img src="../images/menu1.png" />
					<div class="mui-media-body">Setting</div>
				</a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<img src="../images/menu2.png" />
					<div class="mui-media-body">about</div>
				</a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<img src="../images/menu3.png" />
					<div class="mui-media-body">more</div>
				</a></li>
		</ul>

	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui'
	import Axios from 'axios'
	//引入axios

	export default {
		data: function() {
			return {
				lunbo: []
			}
		},
		created: function() {
			this.lbt();
		},
		methods: {
			lbt: function() {
				Axios.get('http://www.liulongbin.top:3005/api/getlunbo').then((result) => {
					if (result.data.status === 0) {
						this.lunbo = result.data.message;
						console.log(this.lunbo[0].img)
					} else {
						Toast("图片加载失败")
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.mint-swipe {
		height: 200px;
	}

	.mint-swipe-item {
		&:nth-child(1) {
			background-color: red;
		}

		&:nth-child(2) {
			background-color: blue;
		}

		&:nth-child(3) {
			background-color: green;
		}
	}
	.mui-grid-view.mui-grid-9{
		border: none;
		background: white;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border: none;
		img{
			width: 3.75rem;
			height: 3.75rem
		}
	}
</style>
