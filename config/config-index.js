const userInfo = require('./config');

module.exports = {
	// mongodb+srv://hobermallow:<password>@cluster0.hancy0t.mongodb.net/?retryWrites=true&w=majority
	getDbConnectionString: function () {
		// return `mongodb://${userInfo.uname}:${userInfo.pwd}@ds255539.mlab.com:55539/contact-manager`

		console.log(`mongodb+srv://${userInfo.uname}:${userInfo.pwd}@cluster0.hancy0t.mongodb.net/?retryWrites=true&w=majority`)
		return `mongodb+srv://${userInfo.uname}:${userInfo.pwd}@cluster0.hancy0t.mongodb.net/?retryWrites=true&w=majority`
	}
}