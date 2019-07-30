const express = require('express');
const app = express();
const records = require('./records');

/* Express middleware to tell express we expect requests as json, so we can have it available to use on the requesst object. All data will be sent here first */ 
app.use(express.json());

/* Express Get route handlers 
	greetings is the route we want to handle
	the call backfunction we want to respond with a function that has two arguments. One the incoming request (req) form the client the other the (res) response form the server. 
*/


/* Send a GET request to /quotes to READ a list of quote */
	app.get('/quotes', async (req, res)=>{
		try{
			// use the records ORM to get all quotes. We use async and wait to tell javascript to wait for the infor before moving on.
			const quotes = await records.getQuotes();
			res.json({quotes})
		}catch(err){
			res.status(500).json({message: err.message});
		}
	});


/* Send a GET request to /quote/:id to READ(view) a quote */
	app.get('/quotes/:id', async (req, res)=>{
		try{
			// use records geQuote method to find a single quote by passing the id from the file path in. 
			const quote = await records.getQuote(req.params.id);
			
			if(quote){
				res.json({quote})
			} else {
				res.status(404).json({message: "Quote not found."})
			}

		}catch(err){
			res.status(500).json({message: err.message});
		}
	});



/* Send a POST request to /quotes to CREATE a new quote */
	app.post('/quotes', async (req,res) =>{
		try{
			//throw new Error("Oh boy an error");

			if(req.body.author && req.body.quote){
				// take info sent from client, store it in data.json, then send respone of what we stored. 
				const quote = await records.createQuote({
					quote: req.body.quote,
					author: req.body.author
				});
				
				res.status(201).json(quote);
			} else {
				res.status(400).json({message: "Quote and author required"});
			}


		}catch(err){
			res.status(500).json({message: err.message});
		}

	});



// Sent a PUT request to /quotes/:id to UPDATE (edit) a quote
	app.put('/quotes/:id', async(req,res) =>{
		try{
			// pull id from request, feed it to getQuote method to get the quote we're looking for
			const quote = await records.getQuote(req.params.id);

			if(quote){
				quote.quote = req.body.quote;
				quote.author=req.body.author;
				await records.updateQuote(quote);
				//express uses the end request to not hang up the server since we are not sending data back
				res.status(204).end();
			} else{
				res.status(404).json({message: "Quote not found."});
			}

		} catch(err){
			res.status(500).json({message: err.message});

		}
	});


// Send a DELETE request to /quotes/:id to DELETE a quote
	app.delete("/quotes/:id", async(req,res) =>{
		try{
			const quote = await records.getQuote(req.params.id);
			await records.deleteQuote(quote);
			res.status(204).end();
		}catch(err){
			res.status(500).json({message: err.message});

		}
	});
// Send a GET request to /quotes/quote/random to READ (view) a random quote

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

