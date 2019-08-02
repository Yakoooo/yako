//由于webpack 是基于node进行构建的。所以webpack的配置文件中，任何合法的node代码都是支持的
const path = require('path');
//在内存中，根据指定的模板页面，生成一份内存中的首页  同时吧打包好的bundle注入里面
//如果要配置插件，需要在导出的对象中，挂载一个plugin节点
var htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

//当以命令行 运行webpack和webpack-dev-server的时候，工具会发现，我们并没有提供要打包
// 的文件 和入口 和出口文件,此时,他会检查项目根目录中的配置文件 ,并读取这个文件,就拿到了
// 导出的这个配置对象 ,然后根据这个对象,进行打包构建

module.exports = {//模块，出口对象
	entry: path.resolve(__dirname,'./src/main.js'),//入口文件地址
	output:{//出口文件配置
		path:path.resolve(__dirname,'./dist'),//出口文件存放地址
		filename:'bundle.js'//出口文件名称
	},
	plugins:[//所有webpack 插件的配置点
		new htmlWebpackPlugin({
			template:path.resolve(__dirname,'./src/index.html'),//指定模板文件
			filename:'index.html'//指定文件名
		}),
		new VueLoaderPlugin(),
	],
	module:{//所有第三方加载器的配置节点
		rules:[//第三方模块的匹配规则
			{test:/\.css$/ , use:['style-loader','css-loader']},//处理css文件的load规则
			//less需要nom安装 less 和less-loader
			{test:/\.less$/, use:['style-loader','css-loader','less-loader']},
			//scss需要nom安装 node-scss 和less-loader
			// {test:/\.jpg|png|gif|pang$/, use:'url-loader?limit=80000&name=[hash:8]-[name].[ext]' },
			{test:/\.jpg|png|gif|pang$/, use:'url-loader'},
			//处理 图片路径 的loader
			//limit 给定的值 是图片的大小 ，单位是byte 如果我们引用的 图片大于或等于给定的 limit值
			// 则不会被转为base64格式的字符串,如果给定的图片 小于 limit值 ,就会转化为base64字符串
			{test:/\.ttf|eot|svg|woff|woff2$/,use:'url-loader'},//的处理 字体文件的loader
			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
			{test:/\.vue$/,use:'vue-loader'},
		]
	},
	resolve:{//英文翻译是 ‘决定’
		alias:{//修改 vue被导入时包的路径
			'vue$':'vue/dist/vue.js'//不写./会自动在node_modules下找
		}
	}
}