<template>
	<div class="photo-content">
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item', item.id == 0?'mui-active':'']" v-for="item in imgcat" :key="item.id" @tap="getImg(item.id)">
						{{ item.title }}
					</a>
				</div>
			</div>
		</div>
		<div id="container">
			<ul class="photo">
				<router-link :to="'/home/photo/info/' + item.id " v-for="item in imgUrl" :key="item.id" tag="li">
					<img class="image" v-lazy.containe="item.img_url">
					<div class="photo-info">
						<h2>{{ item.title }}</h2>
						<div class="info-body"> {{ item.zhaiyao }} </div>
					</div>
				</router-link>
			</ul>
		</div>

	</div>
</template>

<script>
	//引入muijs文件
	import mui from '../../lib/mui/js/mui.min.js'
	export default {
		data: function() {
			return {
				imgcat: [],
				imgid: 0,
				imgUrl: []
			}
		},
		mounted: function() {
			//初始化mui js
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		},
		created: function() {
			this.gettab();
			this.getImg(this.imgid);
		},
		methods: {
			gettab: function() {
				this.$axios.get('http://www.liulongbin.top:3005/api/getimgcategory').then((result) => {
					if (result.data.status === 0) {
						this.imgcat = result.data.message
						this.imgcat.unshift({
							title: '全部',
							id: 0
						})
					} else {
						Toast('不KO')
					}
				})
			},
			getImg: function(imgid) {
				this.$axios.get('http://www.liulongbin.top:3005/api/getimages/' + imgid).then(result => {
					if (result.data.status === 0) {
						this.imgUrl = result.data.message
						console.log(this.imgUrl)
					} else {
						Toast('加载图片失败')
					}
				})
			}
		}
	}
</script>
<style lang="less">
	.photo {
		list-style: none;
		padding: 0;
		margin: 0;
		margin: 0.625rem;
		margin-bottom:0rem;
		li {
			margin: 10px 0rem;
			box-shadow: 0px 0px 10px #888888;
			text-align: center;
			background-color:darkgrey;
			position: relative;
			img[lazy=loading] {
				width: 40px;
				height: 300px;
				margin: auto;
			}
			.image{
				width: 100%;
				vertical-align:middle;
			}
		}
		.photo-info {
			position: absolute;
			bottom: 0;
			text-align: left;
			color: white;
			background-color:rgba(0,0,0,0.4);
			h2{
				font-size:0.875rem;
			}
			.info-body{
				font-size:0.75rem;
			}
		}
	}

	;
</style>
