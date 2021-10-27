const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
	const method = req.method

	// 获取博客列表
	if (method === 'GET' && req.path === '/api/blog/list') {
		const { author, keyword } = req.query
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
		const result = newBlog(req.body)
		return result.then(data => {
			return new SuccessModel(data)
		})
	}

	// 更新一篇博客
	if (method === 'POST' && req.path === '/api/blog/update') {
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
		const { id } = req.query
		const result = delBlog(id)
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