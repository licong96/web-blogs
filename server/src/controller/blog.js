
const getList = (author, keyword) => {
	return [
		{
			id: 1,
			title: 'title',
			desc: 'desc',
			createTime: 1635230353128,
			author: 'licong '
		}
	]
}

const getDetail = (id) => {
	return [
		{
			id: 1,
			title: 'title',
			desc: 'desc',
			createTime: 1635230353128,
			author: 'licong '
		}
	]
}

const newBlog = (blogData = {}) => {
	return {
		id: 2
	}
}

const updateBlog = (id, blogData = {}) => {
	return true
}

const delBlog = (id) => {
	return true
}

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
}