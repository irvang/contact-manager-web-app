const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');//an object with a function

//setupController is a function to which we can pass app, it adds the endpoint
//====MODELS
const setupController = require('./controllers/setupController');
const apiController = require('./controllers/apiController');

//====PORT
const port = process.env.PORT || 3000; 	

//====STATIC FILES - delivered to browser
app.use('/assets', express.static(__dirname + '/public'));

//====VIEW
app.set('view engine', 'ejs');

//====CONNECTION AND SETUP
mongoose.connect(config.getDbConnectionString());

//====CONTROLLERS
setupController(app);
apiController(app);//adds all handles and endpoints in apiController

app.listen(port);