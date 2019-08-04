<template>
	<div>
		<h3>发表评论</h3>
		<hr />
		<textarea maxlength="120" placeholder="最多输入120个字"></textarea>
		<mt-button type="primary" size="large" @click="getcom">发表评论</mt-button>
		
		<!-- comment -->
		<div class="list">
			<div class="item" v-for="(item,i) in comment" :key="item.add_time">
				<div class="title">第 {{ ++i }} 楼 用户:{{ item.user_name }} &nbsp;&nbsp;发表时间:{{ item.add_time | hous }} </div>
				<div class="comment">{{ item.content == 'undefined'&&' ' ? "这个用户不行":item.content }}</div>
			</div>
		</div>
		
		<mt-button type="primary" size="large" plain @click="getcom2">加载更多</mt-button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	export default{
		data:function(){
			return {
				comment : [],
				pageindex : 1
			}
		},
		created(){
			this.getcom();
		},
		methods:{
			getcom(){
				this.$axios.get('http://www.liulongbin.top:3005/api/getcomments/'+ this.comdata +'?pageindex=' + this.pageindex).then((result)=>{
					if(result.data.status === 0){
						this.comment = this.comment.concat(result.data.message)
						// console.log(this.comment)
					}else{
						Toast('消息提醒')
					}
				})
			},
			getcom2(){
				this.pageindex ++;
				this.getcom();
			}
		},
		props:['comdata'],
	}
</script>

<style lang="less">
	textarea{
		margin-bottom: 5px
	}
	.list{
		.item{
			margin: 5px 0rem;
			.title{
				background-color:darkgray;
				line-height: 30px;
			}
			.comment{
				line-height: 30px;
				text-indent: 2em;
			}
		}
	}
</style>
