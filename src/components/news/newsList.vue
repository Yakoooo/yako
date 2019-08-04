<template>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
				<router-link :to=" '/home/news/info/' + item.id "> <!-- 绑定转化为表达式 -->
					<img class="mui-media-object mui-pull-left" :src=" item.img_url ">
					<div class="mui-media-body">
						<h1>{{ item.title }}</h1>
						<p class='mui-ellipsis'>
							<span>时间:{{ item.add_time | hous }}</span>
							<span>点击 {{ item.click }} 次</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import Axios from 'axios'
	import { Toast } from 'mint-ui'
	
	export default{
		data:function(){
			return {
				newslist:[]
			}
		},
		created(){
			this.getnew();
		},
		methods:{
			getnew:function(){
				Axios.get('http://www.liulongbin.top:3005/api/getnewslist').then((result)=>{
					if(result.status == 200){
						this.newslist = result.data.message
						// console.log(this.newslist)
					}else{
						Toast('加载失败')
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.mui-media-body{
		h1{
			font-size: 0.875rem;
		}
		span{
			font-size: 0.75rem;
			color: blue;
		}
	}
	.mui-ellipsis{
		display: flex;
		justify-content: space-between;
	}
</style>
