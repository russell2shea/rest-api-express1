const express = require('express');
const app = express();

/* Express Get route handler 
	greetings is the route we want to handle
	the call backfunction we want to respond with a function that has two arguments. One the incoming request (req) form the client the other the (res) response form the server. 
*/
app.get('/greetings', (req, res)=>{
	res.json({greeting: "Hello World!"})
});

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
