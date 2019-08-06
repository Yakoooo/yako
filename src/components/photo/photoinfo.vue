<template>
	<div class="ccc">
		<div class="infoHeader">
			<h2>{{ infolist.title }}</h2>
			<div class="sj">
				<span>发表时间:{{ infolist.add_time | hous }}</span>
				<span>点击: {{ infolist.click }} 次</span>
			</div>
			<hr />
		</div>

		<!-- 略缩图 -->
		<div class="photo1">
			<vue-preview class="imges" :slides="slide1" @close="handleClose"></vue-preview>
		</div>

		<div id="content">
			<div v-html=" infolist.content "></div>
		</div>

		<!-- 评论区域 -->
		<com :comdata="this.id"></com>
	</div>
</template>

<script>
	import Comment from '../comments/comment.vue'

	export default {
		data() {
			return {
				id: this.$route.params.id,
				infolist: '',
				infoimg: '',
				slide1 : ''
			}
		},
		created() {
			this.getinfo();
			this.getinfoimg();
		},
		methods: {
			getinfo() {
				this.$axios.get('http://www.liulongbin.top:3005/api/getimageInfo/' + this.id).then(result => {
					if (result.data.status === 0) {
						this.infolist = result.data.message[0]
						// console.log(this.id);
					} else {
						Toast('失败')
					}
				})
			},
			handleClose() {
				console.log('close event')
			},
			getinfoimg() {
				this.$axios.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id).then(result => {
					if (result.data.status === 0) {
						this.infoimg = result.data.message
						this.infoimg.forEach((item)=>{
							item.w = 600;
							item.H = 400;
							item.msrc = item.src;
						})
					}else{
						Toast('失败')
					}
					this.slide1 = this.infoimg
				})
			}
		},
		components: {
			com: Comment
		}
	}
</script>

<style lang="less">
	.photo1{
		overflow: auto;
		figure{
			margin: 0rem;
			padding: 0rem;
			img{
				width: 6.25rem;
				height: 6.25rem;
				margin: 0.3125rem;
				float: left;
			}
		}
	}
	.ccc {
		padding: 0 0.3125rem;

		p {
			color: black;
		}
	}

	.infoHeader {
		text-align: center;

		h2 {
			color: royalblue;
			font-size: 1rem;
		}

		.sj {
			font-size: 0.875rem;
			display: flex;
			justify-content: space-between;
		}

	}
</style>
