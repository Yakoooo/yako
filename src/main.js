//导入vue
import Vue from 'vue'

//导入app模板
import app from '../app.vue'

//导入mint-ui组件 按需获取
import { header } from 'mint-ui'
Vue.component(header.name,header)

//导入mui样式
import Mui from './lib/mui/css/mui.min.css'

//实例化vue
var vm = new Vue({
	el:"#app",
	render:function(createElement){
		//不用注册，直接渲染过去,覆盖app
		return createElement(app)
	}
})