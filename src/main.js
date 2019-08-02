//入口文件
//导入vue
import Vue from 'vue'

//引入axios
// import axios from 'axios'
import axios from 'axios'

//导入vue-router
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)

//导入app模板
import app from './app.vue'

//导入mint-ui组件 按需获取
import { header ,Swipe, SwipeItem } from 'mint-ui'
Vue.component(header.name,header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)

//导入mui样式
import Mui from './lib/mui/css/mui.min.css'
import MUI from './lib/mui/css/icons-extra.css'

//导入组件文件
import router from './router.js'

//实例化vue
var vm = new Vue({
	el:"#app",
	render:function(createElement){
		//不用注册，直接渲染过去,覆盖app
		return createElement(app)
	},
	router:router//挂载路由到实例 vm 上
})