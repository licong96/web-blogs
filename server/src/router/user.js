const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getCookieExpires } = require('../utils')

const handleUserRouter = (req, res) => {
	const method = req.method

	// 登录
	if (method === 'GET' && req.path === '/api/user/login') {
		const { username, password } = req.query
		const result = login(username, password)
		return result.then(data => {
			if (data.username) {
				// 设置cookie
				res.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`)
				return new SuccessModel('登录成功')
			}
			return new ErrorModel('登录失敗')
		})
	}

	// 登录校验
	if (method === 'GET' && req.path === '/api/user/login-test') {
		if (req.cookie.username) {
			return Promise.resolve(new SuccessModel(req.cookie.username))
		}
		return Promise.resolve(new ErrorModel('尚未登录'))
	}

}

module.exports = handleUserRouter