const express = require('express');
const app = express();
const path = require('path');
const graphqlHTTP = require('express-graphql');
const router = express.Router();

//Custom Scripts and functions
const schema = require('./GraphqlSchema/index');
const auth = require('./authHandler');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.disable('x-powered-by')

router.get('/', function(req,res){
	res.json({
        text: 'Hello World'
    });
});

router.get('/protected', function(req, res){
    res.sendFile(path.join(__dirname, 'helloWorld.html'));
});

app.use('/', router);

app.use('/graphql', graphqlHTTP({
	schema: schema,
	graphiql: true
}));


app.listen(8080, function() {
    console.log("purchaseInsights server has started on port 8080");
});
