const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
	res.setHeader('Content-Type', 'application/json')

	// const resData = {
	// 	name: 'name',
	// 	site: 'site',
	// 	env: process.env.NODE_ENV
	// }

	const url = req.url
	req.path = url.split('?')[0]

	// 博客路由
	const blogData = handleBlogRouter(req, res)
	if (blogData) {
		res.end(
			JSON.stringify(blogData)
		)
		return
	}

	// 登录路由
	const userData = handleUserRouter(req, res)
	if (userData) {
		res.end(
			JSON.stringify(userData)
		)
		return
	}

	// 404的情况
	res.writeHead(404, {'Content-Type': 'text/plain'})
	res.write('404 Not Found\n')
	res.end()
}

module.exports = serverHandle