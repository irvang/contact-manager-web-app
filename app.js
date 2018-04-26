const express = require('express');
const app = express();
const mongoose = require('mongoose');

const config = require('./config/config-index');
const apiController = require('./controllers/apiController');
const setupController = require('./controllers/setupController');

// console.log(setupController.toString());

//====MODELS

//====PORT
const port = process.env.PORT || 3000;

//====STATIC FILES 

//====VIEW
app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/public'));

//====CONTROLLERS
apiController(app);
setupController(app);

//====MONGOOSE CONNECTION
mongoose.connect(config.getDbConnectionString());//returns string

//====CONNECTION
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});