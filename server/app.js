const qs = require('qs')
const cookie = require('cookie');
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { getPostData } = require('./src/utils')

const serverHandle = (req, res) => {
	res.setHeader('Content-Type', 'application/json')

	// 获取path
	const url = req.url
	req.path = url.split('?')[0]

	// 解析query
	req.query = qs.parse(url.split('?')[1]);
	console.log('req.query =', req.query)

	// 解析cookie
	req.cookie = cookie.parse(req.headers.cookie)
	console.log('req.cookie =', req.cookie)

	// 解析post data
	getPostData(req).then(postData => {
		req.body = postData

		// 博客路由
		const blogResult = handleBlogRouter(req, res)
		if (blogResult) {
			blogResult.then(blogData => {
				res.end(
					JSON.stringify(blogData)
				)
			})
			return
		}

		// 登录路由
		const userResult = handleUserRouter(req, res)
		if (userResult) {
			userResult.then(userData => {
				if (userData) {
					res.end(
						JSON.stringify(userData)
					)
				}
			})
			return
		}
		
		// 404的情况
		res.writeHead(404, {'Content-Type': 'text/plain'})
		res.write('404 Not Found\n')
		res.end()
	})
}

module.exports = serverHandle