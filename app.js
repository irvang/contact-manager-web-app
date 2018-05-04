const express = require('express');
const app = express();
const mongoose = require('mongoose');

const config = require('./config/config-index');
const apiController = require('./controllers/apiController');
const setupController = require('./controllers/setupController');

//====MODELS

//====PORT
const port = process.env.PORT || 3000;

//====VIEW
app.set('view engine', 'ejs');

//====STATIC FILES 
// app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/assets', express.static(__dirname + '/public'));
app.use('/assets', express.static(__dirname + '/public'));
// console.log(__dirname);
//====CONTROLLERS
apiController(app);
setupController(app);

//====MONGOOSE CONNECTION
mongoose.connect(config.getDbConnectionString());//returns string

//====CONNECTION
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});