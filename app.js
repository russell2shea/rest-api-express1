const express = require('express');
const app = express();

/* Express Get route handler 
	greetings is the route we want to handle
	the call backfunction we want to respond with a function that has two arguments. One the incoming request (req) form the client the other the (res) response form the server. 
*/


/* Send a GET request to /quotes to READ a list of quote */
	app.get('/quotes', (req, res)=>{
		res.json({data})
	});

/* Send a GET request to /quote/:id to READ(view) a quote */
	app.get('/quotes/:id', (req, res)=>{
		// look at the quotes array using javaScripts built in find method. For each quote compare the id number to the id number sent by the client. Needs to be doulbe equal for type corrosion because the parameter is a string while the quote is a number
		const quote = data.quotes.find(quote => quote.id == req.params.id);
		res.json({quote})
	});
// Sent a POST request to /quotes to CREATE a new quote

// Sent a PUT request to /quotes/:id to UPDATE (edit) a quote

// Send a DELETE request to /quotes/:id to DELETE a quote

// Send a GET request to /quotes/quote/random to READ (view) a random quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));


// stored in this JS fine just as a test for now
const data = {
  quotes: [
    {
      "id": 8721,
      "quote": "We must accept finite disappointment, but we must never lose infinite hope.",
      "author": "Martin Luther King"
    },
    {
      "id": 5779,
      "quote": "Use what you’ve been through as fuel, believe in yourself and be unstoppable!",
      "author": "Yvonne Pierre"
    },
    {
      "id": 3406,
      "quote": "To succeed, you have to do something and be very bad at it for a while. You have to look bad before you can look really good.",
      "author": "Barbara DeAngelis"
    }
  ]
}
