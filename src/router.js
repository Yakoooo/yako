import VueRouter from 'vue-router'

//导入组件模板,给组件模板一个文件夹
import homecontainer from './components/HomeContainer.vue'
import membercontainer from './components/memberContainer.vue'
import searchcontainer from './components/searchContainer.vue'
import shopcarcontainer from './components/shopContainer.vue'

//创建路由对象
var router = new VueRouter({
	routes:[//配置路由规则
	    {path : '/' ,redirect : '/home'},
		{path : '/home' ,component : homecontainer},
		{path : '/membr' ,component : membercontainer},
		{path : '/search' ,component : searchcontainer},
		{path : '/shopcar' ,component : shopcarcontainer}
	],
	linkActiveClass:'mui-active' //默认覆盖路由高亮的类叫 router-link-active 
})

// 把路由对象暴露出去
export default router