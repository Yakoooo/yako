<template>
	<div class="container">
		<!-- header -->
		<mt-header fixed title="Vue-移动端-小项目">
			<div slot="left" @click="go" v-if=" this.flag "><!-- 首页不要返回按钮 -->
				<mt-button icon="back">返回</mt-button>
			</div>
		</mt-header>

		<!-- router-view content-->
		<transition>
			<router-view></router-view>
		</transition>

		<!-- tabbar -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tabbar-li" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tabbar-li" to="/membr">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tabbar-li" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="ball2">{{ this.$store.getters.getnumber }}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tabbar-li" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
	export default{
		created(){
			this.flag = this.$route.path === '/home'?false:true;
		},
		data:function(){
			return {
				flag : false //因为如果直接在其他页面刷新，不会进入wacth，会取得默认值false，所以在钩子函数，数据构建完后，调用判断一次flag的值
			}
		},
		methods:{
			go:function(){
				this.$router.go(-1) // $router操作编程式导航相关
			}
		},
		watch:{
			'$route.path':function(newval){
				console.log(newval)
				if(newval === '/home'){
					this.flag = false
				}else{
					this.flag = true
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		padding: 50px 0rem;
		padding-top: 2.5rem;
	}

	.container {
		overflow-x: hidden;
	}

	.v-enter {
		opacity: 0;
		transform: translateX(100%);
	}

	.v-leave-to {
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
		/* transform:rotate(9deg); */
	}

	.v-enter-active,
	.v-leave-active {
		transition: all 0.8s ease;
	}

	.mui-tabbar-li {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}

	.mui-tabbar-li .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.mui-tabbar-li {
		text-align: center;
		white-space: nowrap;
		color: #929292;
	}

	.mui-tabbar-li .mui-icon~.mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mui-active {
		color: blue;
	}
</style>
