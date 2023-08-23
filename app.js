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

main();

async function main() {
	try {
		await mongoose.connect(config.getDbConnectionString());
	} catch (error) {
		console.error('ERROR - unable to connect', error)
	}
}

//====CONNECTION
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});