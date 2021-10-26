const login = (username, password) => {
	console.log(username, password)
	if (username === 'licong' && password === '123456') {
		return true
	}
	return false
}

module.exports = {
	login
}