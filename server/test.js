const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, 'test.txt')

// 读取文件内容
fs.readFile(fileName, (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	// data 是二进制类型，需要转为字符串
	console.log(data.toString())
})

// 写入文件
const content = '\n这是新写入的内容'
const opt = {
	flag: 'a'	// a: 追加写入，w: 覆盖写入
}
fs.writeFile(fileName, content, opt, (err) => {
	if (err) {
		console.log(err)
	}
})