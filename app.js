const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } = require('http-status');
require('dotenv').config();

const userRoutes = require('./api/routes/user');
const accountRoutes = require('./api/routes/account');

mongoose.connect(
	process.env.MONGO_URL,
	{ useNewUrlParser: true }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-Width, Content-Type, Accept, Authorization'
	);

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(OK).json({});
	}
	next();
});

app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = NOT_FOUND;
	next(error);
});

app.use((error, req, res) => {
	res.status(error.status || INTERNAL_SERVER_ERROR);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;