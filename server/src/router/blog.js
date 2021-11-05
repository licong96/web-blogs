const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { loginCheck } = require('../utils')

const handleBlogRouter = (req, res) => {
	const method = req.method

	// 获取博客列表
	if (method === 'GET' && req.path === '/api/blog/list') {
		let { author, keyword } = req.query

		if (req.query.isadmin) {
			// 管理员界面
			const loginCheckResult = loginCheck(req)
			if (loginCheckResult) {
				return loginCheckResult
			}
			// 强制查询自己的博客
			author = req.session.username
		}
		
		const result = getList(author, keyword)
		return result.then(listData => {
			return new SuccessModel(listData)
		})
	}

	// 获取博客详情
	if (method === 'GET' && req.path === '/api/blog/detail') {
		const { id } = req.query
		const result = getDetail(id)
		return result.then(data => {
			return new SuccessModel(data)
		})
	}

	// 新建一篇博客
	if (method === 'POST' && req.path === '/api/blog/new') {
		const loginCheckResult = loginCheck(req)
		if (loginCheckResult) {
			return loginCheckResult
		}

		req.body.author = req.session.username
		const result = newBlog(req.body)
		return result.then(data => {
			return new SuccessModel(data)
		})
	}

	// 更新一篇博客
	if (method === 'POST' && req.path === '/api/blog/update') {
		const loginCheckResult = loginCheck(req)
		if (loginCheckResult) {
			// 未登录
			return loginCheckResult
		}

		const { id } = req.query
		const result = updateBlog(id, req.body)
		return result.then(val => {
			if (val) {
				return new SuccessModel('更新成功')
			} else {
				return new ErrorModel('更新失敗')
			}
		})
	}

	// 删除一篇博客
	if (method === 'POST' && req.path === '/api/blog/del') {
		const loginCheckResult = loginCheck(req)
		if (loginCheckResult) {
			// 未登录
			return loginCheckResult
		}

		const { id } = req.query
		const author = req.session.username
		const result = delBlog(id, author)
		return result.then(val => {
			if (val) {
				return new SuccessModel('删除成功')
			} else {
				return new ErrorModel('删除失敗')
			}
		})
	}
}

module.exports = handleBlogRouter