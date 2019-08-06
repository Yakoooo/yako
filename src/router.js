import VueRouter from 'vue-router'

//导入组件模板,给组件模板一个文件夹
import homecontainer from './components/HomeContainer.vue'
import membercontainer from './components/memberContainer.vue'
import searchcontainer from './components/searchContainer.vue'
import shopcarcontainer from './components/shopContainer.vue'
import newsList from './components/news/newsList.vue'
import newinfo from './components/news/newinfo.vue'
import photoList from './components/photo/photoList.vue'
import photoinfo from './components/photo/photoinfo.vue'
import goodslist from './components/goodslist/goodslist.vue'
import goodsitem from './components/goodslist/goodsitem.vue'
import goodsdesc from './components/goodslist/goodsdesc.vue'
import goodscomment from './components/goodslist/goodscomment.vue'

//创建路由对象
var router = new VueRouter({
	routes:[//配置路由规则
	    {path : '/' ,redirect : '/home'},
		{path : '/home' ,component : homecontainer},
		{path : '/membr' ,component : membercontainer},
		{path : '/search' ,component : searchcontainer},
		{path : '/shopcar' ,component : shopcarcontainer},
		{path : '/home/news' , component : newsList},
		{path : '/home/news/info/:id' ,component : newinfo},//路由传参
		{path : '/home/photo' ,component : photoList},
		{path : '/home/photo/info/:id' ,component : photoinfo},
		{path : '/home/goodslist' ,component : goodslist},
		{path : '/home/goodslist/item/:id' , component : goodsitem},
		{path : '/home/goodslist/item/desc/:id' , component : goodsdesc , name:'godesc'},
		{path : '/home/goodslist/item/comment/:id' , component : goodscomment , name:'gocom'}
	],
	linkActiveClass:'mui-active' //默认覆盖路由高亮的类叫 router-link-active 
})

// 把路由对象暴露出去
export default router