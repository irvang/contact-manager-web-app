const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiController = require('./controllers/apiController');
//config added later

//====MODELS

//====PORT
const port = process.env.PORT || 3000;

//====STATIC FILES 

//====VIEW
app.set('view engine', 'ejs');
// app.use('/assets', express.static(__dirname + '/public'));



//====CONTROLLERS

apiController(app);

//====CONNECTION
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
