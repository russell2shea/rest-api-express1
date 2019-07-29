const express = require('express');
const app = express();
const records = require('./records');

/* Express middleware to tell express we expect requests as json, so we can have it available to use on the requesst object. All data will be sent here first */ 
app.use(express.json());

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


/* Send a POST request to /quotes to CREATE a new quote */
	app.post('/quotes', (req,res) =>{
		// take info sent from client, store it in data.json, then send respone of what we stored. 
		const quote = records.createQuote({
			quote: req.body.quote,
			author: req.body.author
		});
		res.json(quote);
	});

// Sent a PUT request to /quotes/:id to UPDATE (edit) a quote

// Send a DELETE request to /quotes/:id to DELETE a quote

// Send a GET request to /quotes/quote/random to READ (view) a random quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));

