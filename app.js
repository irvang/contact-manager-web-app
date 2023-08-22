const express = require('express');
const app = express();
const mongoose = require('mongoose');

const config = require('./config/config-index');
const apiController = require('./controllers/apiController');
const setupController = require('./controllers/setupController');

//====MODELS

//====PORT
const port = process.env.PORT || 3000;

// main().catch(err => console.log(err));

//====VIEW
// app.set('view engine', 'ejs');
// app.use('/', express.static('views'));//rendering static html

//====STATIC FILES 
// app.use('/assets', express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/assets'));
app.use(express.static('assets'));

//====CONTROLLERS
apiController(app);
setupController(app);

//====MONGOOSE CONNECTION
mongoose.set('useFindAndModify', false);// turns off deprecation warning
//config.getDbConnectionString() returns string
mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// main().catch(err => console.log(err));

// async function main() {
// 	// await mongoose.connect('mongodb://127.0.0.1:27017/test');
// 	await mongoose.connect(config.getDbConnectionString());

// 	// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

//====CONNECTION
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});