<template>
	<div class="newinfo-container">
		<h1>详细新闻 {{ this.news.title }}</h1>
		<p>
			<span>{{ this.news.add_time | hous }}</span>
			<span>{{ this.news.click }}</span>
		</p>
		<hr />
		<div class="container" v-html=" this.news.content "></div>

		<!-- 品论区域 -->
		<mycomment v-bind:comdata='id'></mycomment>
	</div>
</template>

<script>
	import comment1 from '../comments/comment.vue'
	import {
		Toast
	} from 'mint-ui'
	import axios from 'axios'
	export default {
		data: function() {
			return {
				id: this.$route.params.id, //路由传参
				news: [],
			}
		},
		created: function() {
			this.getinfo();
		},
		methods: {
			getinfo: function() {
				axios.get('http://www.liulongbin.top:3005/api/getnew/' + this.id).then((result) => {
					if (result.data.status === 0) {
						this.news = result.data.message[0]
						console.log(this.news)
					} else {
						Toast('加载消息失败')
					}
				})
			}
		},
		components: {
			mycomment: comment1
		}
	}
</script>

<style lang="less">
	.newinfo-container {
		padding: 0.3125rem;

		h1 {
			color: red;
			text-align: center;
			font-size: 1.1875rem
		}

		p {
			display: flex;
			justify-content: space-between;
		}
	}
</style>
