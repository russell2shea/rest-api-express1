const express = require('express');
const router = express.Router();
const records = require('./records');

/* Take in a function, wrap it in a try catch block, and pass errors to global error handler*/
function asyncHandler(cb){
	return async (req,res,next) =>{
		try{
			await cb(req,res,next);
		} catch(err){
			next(err);
		}
	}
}

/* Express Get route handlers 
	greetings is the route we want to handle
	the call backfunction we want to respond with a function that has two arguments. One the incoming request (req) form the client the other the (res) response form the server. 
*/


/* Send a GET request to /quotes to READ a list of quote */
	router.get('/quotes', asyncHandler (async (req, res)=>{
			// use the records ORM to get all quotes. We use async and wait to tell javascript to wait for the infor before moving on.
			const quotes = await records.getQuotes();
			res.json({quotes})
	}));


/* Send a GET request to /quote/:id to READ(view) a quote */
	router.get('/quotes/:id', asyncHandler (async (req, res)=>{

			// use records geQuote method to find a single quote by passing the id from the file path in. 
			const quote = await records.getQuote(req.params.id);
			
			if(quote){
				res.json({quote})
			} else {
				res.status(404).json({message: "Quote not found."})
			}
	}));



/* Send a POST request to /quotes to CREATE a new quote */
	router.post('/quotes', asyncHandler( async(req,res)=>{
		if(req.body.author && req.body.quote){
				// take info sent from client, store it in data.json, then send respone of what we stored. 
				const quote = await records.createQuote({
					quote: req.body.quote,
					author: req.body.author
				});
				//throw new Error("Oh boy an error");

				res.status(201).json(quote);
			} else {
				res.status(400).json({message: "Quote and author required"});
			}

	}));



// Sent a PUT request to /quotes/:id to UPDATE (edit) a quote
	router.put('/quotes/:id', asyncHandler (async(req,res) =>{
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
	}));


// Send a DELETE request to /quotes/:id to DELETE a quote
	router.delete("/quotes/:id", asyncHandler (async(req,res, next) =>{
			const quote = await records.getQuote(req.params.id);
			await records.deleteQuote(quote);
			res.status(204).end();
	}));


// Send a GET request to /quotes/quote/random to READ (view) a random quote
router.get('/qoutes/quote/random', asyncHandler(async(req,res,next)=>{
	const quote = await records.getRandomQuote();
	res.json(quote);
}));


module.exports = router;