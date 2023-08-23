const userInfo = require('./config');

module.exports = {
	getDbConnectionString: function () {
		return `mongodb+srv://${userInfo.uname}:${userInfo.pwd}@cluster0.hancy0t.mongodb.net/${userInfo.dbName}?retryWrites=true&w=majority`
	}
}
