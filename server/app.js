const queryString = require('query-string')
const cookie = require('cookie');
const { access } = require('./src/utils/log')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { getPostData, getCookieExpires } = require('./src/utils')
const redis = require('./src/db/redis')

const serverHandle = (req, res) => {
	// 记录 access log
	access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${new Date().toString()}`)

	res.setHeader('Content-Type', 'application/json')

	// 获取path
	const url = req.url
	req.path = url.split('?')[0]

	// 解析query
	req.query = queryString.parse(url.split('?')[1])
	console.log('req.query =', req.query)

	// 解析cookie
	req.cookie = cookie.parse(req.headers.cookie || '')
	console.log('req.cookie =', req.cookie)

	// 解析session
	let userId = req.cookie.userId
	let needSetCookie = false
	if (!userId) {
		needSetCookie = true
		userId = `${Date.now()}_${Math.floor(Math.random() * 100)}`
		redis.set(userId, {})
	}
	redis.get(userId).then(redisData => {
		req.session = redisData || {}

		// 解析post data
		getPostData(req).then(postData => {
			req.body = postData

			// 博客路由
			const blogResult = handleBlogRouter(req, res)
			if (blogResult) {
				blogResult.then(blogData => {
					if (needSetCookie) {
						res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
					}
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
						if (needSetCookie) {
							res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
						}
						redis.set(userId, userData.data)
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
	})
}

module.exports = serverHandle