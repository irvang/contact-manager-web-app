const configValues = require('./config');

// console.log(configValues);

module.exports = {
	getDbConnectionString: function () {
		return `mongodb://${configValues.uname}:${configValues.pwd}@ds153494.mlab.com:53494/node-todo`
	}
}


//if exporting as function, would need to call as config()

// module.exports = function getDbConnectionString() {
// 	return `mongodb://${configValues.uname}:${configValues.pwd}@ds153494.mlab.com:53494/node-todo`
// }