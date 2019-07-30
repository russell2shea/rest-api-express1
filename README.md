## Overview

This is an open REST API to generate quotes. It was developed for practice. To continue practice this API will be migrated from REST to GraphQL 

### How to use

Download the files and run; npm install.

Then to start a local server run; npm start. 

### Root endpint

You can issue a GET request to the root endpoint to get all the quotes in data.json

http://localhost:3000/api/quotes/

### GET a signle quote

You can issue a GET request to return a single quote if the quotes id is passed to the following endpoint:

http://localhost:3000/api/quotes/:id

### Add a quote

To add a quote to data.json you need to make a POST request to the following endpoint: 

http://localhost:3000/api/quotes/

The API is expecting the payload of the POST to be in JSON format with both a "quote" and an "author".

### Update a quote

To update an existing quote make a PUT request to the following endpoint:

http://localhost:3000/api/quotes/:id

The API is expecting the payload to be in JSON format with both a "quote" and an "author".

### Delete a quote

To delate an existing quote make a DELETE request to the following endpoing: 

http://localhost:3000/api/quotes/:id

If the post is succesful you will get a 204 status code


#### Notes

REST API is different from a traditional serverside application because it responds to requests with data such as JSON; a traditional serverside application responds to requests with HTML. REST is less flexible than GraphQL which can more flexible and eliminate over and underfetching.  

Client: application requesting info

REST = Representational State Transfer. How the server should respond to the request of a client. 

Example github api. 

REST API's us HTTP methods; GET POST PUT DELETE. As opposed to the more traditional CRUD. 

API nouns are usually used to define resouces. For example; movies. 


