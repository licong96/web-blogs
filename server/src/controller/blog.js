const { exec } = require('../db/mysql')

// 获取博客列表
const getList = (author, keyword) => {
	let sql = `select * from blogs where 1=1 `

	if (author) {
		sql += `and author='${author}' `
	}
	if (keyword) {
		sql += `and title like '%${keyword}%' `
	}
	sql += `order by createtime desc`

	return exec(sql)
}

// 获取博客详情
const getDetail = (id) => {
	const sql = `select * from blogs where id=${id};`

	return exec(sql).then(rows => {
		return rows[0]
	})
}

// 新建一篇博客
const newBlog = (blogData = {}) => {
	const { title, content, author } = blogData
	const createtime = Date.now()
	const sql = `
		insert into blogs (title, content, createtime, author) 
		values ('${title}', '${content}', ${createtime}, '${author}');
	`
	return exec(sql).then(res => {
		return {
			id: res.insertId
		}
	})
}

// 更新一篇博客
const updateBlog = (id, blogData = {}) => {
	const { title, content } = blogData
	const sql = `
		update blogs set title='${title}',content='${content}' where id=${id};
	`
	return exec(sql).then(res => {
		return Boolean(res.affectedRows)
	})
}

// 删除一篇博客
const delBlog = (id, author) => {
	const sql = `delete from blogs where id=${id} and author='${author}'`

	return exec(sql).then(res => {
		return Boolean(res.affectedRows)
	})
}

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
}