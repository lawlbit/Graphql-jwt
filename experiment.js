const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const token = process.env.TOKEN;
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open("GET", "/graphql");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Accept", "application/json");
var headerString = "Bearer " + token; 
xhr.setRequestHeader("Authorization", headerString);
xhr.onload = function () {
	console.log('data returned:', xhr.response);
}
var query = `query {helloWorld}`;
xhr.send(JSON.stringify({
    query: query
}));
