//入口文件
//导入vue
import Vue from 'vue'

//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//引入axios
// import axios from 'axios'
import Axios from 'axios'
Vue.prototype.$axios = Axios

//导入vue-router
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)

//导入app模板
import app from './app.vue'

//导入mint-ui组件 按需获取
// import { header ,Swipe, SwipeItem ,Button ,Lazyload  } from 'mint-ui'
// Vue.component(header.name,header)
// Vue.component(Swipe.name,Swipe)
// Vue.component(SwipeItem.name,SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


//导入mui样式
import Mui from './lib/mui/css/mui.min.css'
import MUI from './lib/mui/css/icons-extra.css'

//导入组件文件
import router from './router.js'
//格式化时间组件
import moment from 'moment'

Vue.filter('hous',function(data,f="YYYY-MM-DD HH:mm;ss"){
	return moment(data).format(f);
})

import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// Vue.use(preview, {
//   mainClass: 'pswp--minimal--dark',
//   barsSize: {top: 0, bottom: 0},
//   captionEl: false,
//   fullscreenEl: false,
//   shareEl: false,
//   bgOpacity: 0.85,
//   tapToClose: true,
//   tapToToggleControls: false
// })

//进入之前从本地获取数据
let cart = window.JSON.parse(localStorage.getItem('cart') || "[]")

//实例化vuex >> 记得挂载到vue
var store = new Vuex.Store({
	state:{
		cart:cart,
	},
	mutations:{//this.$store.commit('方法名'，'按需传递的函数')
		//调用方法获取到，信息，先判断数组中有没有该对象，如果有就只改变数量
		addcar:function(state , add){
			let flag = false;
			state.cart.forEach(item=>{
				if(item.id == add.id){
					item.numberb = add.numberb;
					flag = true;
					return true
				}
			});
			//得到false就吧数据push进数组
			if(!flag){
				state.cart.push(add)
			}
			
			//保存完后将商品传入本地存储
			localStorage.setItem('cart',window.JSON.stringify(state.cart))
		},
		//需要从numberbox中获取 商品id 还有数量 
		// 1. 匹配到获取到的id
		// 2. 把拿到的数量，更新到cart 和locaStorage本地 
		//在 shop-numberbox调用该方法，传一个对象进来，其中有{id：商品id，cont：新的数据}
		addsetcart:function(state,number){
			//遍历cart寻找对应id
			state.cart.forEach(function(item){
				if(item.id == number.id){
					//找到对应的id，把新数据赋值过去
					item.numberb = number.cont
				}
			})
			//把新的cart保存到localStorage
			localStorage.setItem('cart',window.JSON.stringify(state.cart))
		}, // 我再重申一遍，state 是固定的数据
		removecartitem:function(state, id){//获取到数据id，用foreach找到数据，再根据索引删除
			state.cart.forEach(function(item,index){//当前元素，还有索引
				if(item.id == id){
					state.cart.splice(index,1)
					return true
				};
			})
			localStorage.setItem('cart',window.JSON.stringify(state.cart));//保存到本地locdlStorage
		},                           //用Json。stringify转换成字符串再存进去，；localStrorage值只支持字符串
		getshopstate:function(state,status){//获取到id的状态，保存到cart中
			state.cart.forEach(item=>{      //对应id改值
				if(item.id == status.id){
					item.selected = status.state
				}
			})
			localStorage.setItem('cart',window.JSON.stringify(state.cart));//保存到本地locdlStorage
		}
	},
	getters:{//可以当成computed属性使用 也相当于过滤器
		getnumber:function(state){//第一个参数固定，和mutation一样
			var c = 0;
			state.cart.forEach(item=>{
				c = c + item.numberb;
			});
			return c;
			
		},//因为购物车中已经有了循环，所以要用商品数据数组的 id(键) 和 number(值)，重新绑一组数据，让循环中的组件直接根据id去获取number 
		getshopnum:function(state){
			var idinfo = {};
			state.cart.forEach(item=>{
				idinfo[item.id] = item.numberb;
			})
			return idinfo;
		},
		getboxstate:function(state){
			let o = {};
			state.cart.forEach(item=>{
				o[item.id] = item.selected
			})
			return o;
		},
		zs:function(state){
			//循环数组，有状态为true的就，把数量和价格分别提取出来 输出对象{ 数量 ，总价 }
			var kk = { shu:0,jia:0 };
			state.cart.forEach(item=>{ //循环
				if(item.selected){ //item.selected是booleam值
					kk.shu += item.numberb //数量累加
					kk.jia += item.numberb * item.price  //总价累加
				}
			})
			return kk;
		}
	},
	
})

//实例化vue
var vm = new Vue({
	el:"#app",
	render:function(createElement){
		//不用注册，直接渲染过去,覆盖app
		return createElement(app)
	},
	router:router,//挂载路由到实例 vm 上
	store:store
})