const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
	console.error(err)
})

function set(key, val) {
	if (typeof val === 'object') {
		val = JSON.stringify(val)
	}
	redisClient.set(key, val, redis.print)
}

function get(key) {
	return new Promise((resolve, reject) => {
		redisClient.get(key, (err, val) => {
			if (err) {
				reject(err)
				return
			}
			if (val == null) {
				resolve(null)
				return
			}
			// 这里使用 try-catch 是为了兼容JSON的转换，满足多种情况
			try {
				resolve(
					JSON.parse(val)
				)
			} catch (e) {
				resolve(val)
			}
		})
	})
}

module.exports = {
	set,
	get
}