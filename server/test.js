const fs = require('fs')
const path = require('path')

const fileName1 = path.resolve(__dirname, 'test1.txt')
const fileName2 = path.resolve(__dirname, 'test2.txt')

const readStream = fs.createReadStream(fileName1)
const writeStream = fs.createWriteStream(fileName2)

readStream.pipe(writeStream)

readStream.on('data', chunk => {
	console.log('pipe')
})

readStream.on('end', () => {
	console.log('copy done')
})