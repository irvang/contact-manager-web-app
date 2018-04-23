const userInfo = require('./config');

module.exports = {
	getDbConnectionString: function() {
		return `mongodb://${userInfo.uname}:${userInfo.pwd}@ds255539.mlab.com:55539/contact-manager`
	}
}