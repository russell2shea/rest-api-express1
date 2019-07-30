const express = require('express');
const app = express();
const routes = require('./routes');


/* Express middleware to tell express we expect requests as json, so we can have it available to use on the requesst object. All data will be sent here first */ 
app.use(express.json());

/* middle ware to use routes in the routes.js file if the request starts with / api */ 
app.use('/api', routes);

/* Middleware to run if a request comes in that doesn't match any known route. */ 
app.use((req, res, next) =>{
	// create an error object
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

/* custom error handler, needs four params */
app.use((err,req,res,next) =>{
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	})
});

app.listen(3000, () => console.log('Quote API listening on port 3000!'));

