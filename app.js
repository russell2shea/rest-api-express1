const express = require('express');
const app = express();
const records = require('./records');

/* Express Get route handler 
	greetings is the route we want to handle
	the call backfunction we want to respond with a function that has two arguments. One the incoming request (req) form the client the other the (res) response form the server. 
*/


/* Send a GET request to /quotes to READ a list of quote */
	app.get('/quotes', async (req, res)=>{
		// use the records ORM to get all quotes. We use async and wait to tell javascript to wait for the infor before moving on.
		const quotes = await records.getQuotes();
		res.json({quotes})
	});

/* Send a GET request to /quote/:id to READ(view) a quote */
	app.get('/quotes/:id', async (req, res)=>{
		// use records geQuote method to find a single quote by passing the id from the file path in. 
		const quote = await records.getQuote(req.params.id);
		res.json({quote})

	});


// Sent a POST request to /quotes to CREATE a new quote

// Sent a PUT request to /quotes/:id to UPDATE (edit) a quote

// Send a DELETE request to /quotes/:id to DELETE a quote

// Send a GET request to /quotes/quote/random to READ (view) a random quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));

