const express = require('express');
const app = express();
const path = require('path');
const graphqlHTTP = require('express-graphql');
const jwt = require('jsonwebtoken');
//Custom Scripts and functions
const schema = require('./GraphqlSchema/index');
const auth = require('./Scripts/authHandler');
const secret = process.env.SecretKey;

app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.disable('x-powered-by');

app.listen(8080, function() {
    console.log("purchaseInsights server has started on port 8080");
});
const router = express.Router();

router.get('/', function(req,res){
	// res.json({
    //     text: 'Hello World'
    // });
    res.sendFile(path.join(__dirname, 'query.html'));
});

router.get('/logAccess', function(req, res){
    res.sendFile(path.join(__dirname, 'token.html'));    
});

//Mock Authentication 
router.post('/signIn', function(req, res){
    console.log(req.headers);
    var user = req.body.Username;
    var pwd = req.body.pwd;
    if (pwd != "1858Ventures"){
        res.sendStatus(403);
    } else {
        var token = jwt.sign({pwd}, secret);
        res.json({token: token});
    }
}); 

router.get('/protected', auth.verify, function(req, res){
    res.json({
        text: "Hello to you!"
    })
    // res.sendFile(path.join(__dirname, 'helloWorld.html'));
});

app.use('/', router);
//auth.verify,
app.use('/graphql', auth.verify, graphqlHTTP({
	schema: schema,
	graphiql: true
}));
// console.log(process.env);
module.exports = app;