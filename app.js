const express = require('express');
const app = express();
const path = require('path');
const graphqlHTTP = require('express-graphql');
const jwt = require('jsonwebtoken');
//Custom Scripts and functions
const schema = require('./GraphqlSchema/index');
const auth = require('./authHandler');

app.use(express.json());

app.use(express.urlencoded({extended:true}));
// app.disable('x-powered-by');

app.listen(8080, function() {
    console.log("purchaseInsights server has started on port 8080");
});
const router = express.Router();

router.get('/', function(req,res){
	res.json({
        text: 'Hello World'
    });
});

router.get('/logAccess', function(req, res){
    res.sendFile(path.join(__dirname, 'token.html'));    
});

// router.get('/getToken', function(req, res){
//     console.log(req.body);
//     var user = req.body.Username;
//     var pwd = req.body.pwd;
//     res.json({
//         user: user,
//         password: pwd
//     });
//     // user = {
//     //     id: user,  
//     // }
// });
router.post('/signIn', function(req, res){
    console.log(req.body);
    res.json({
        user: req.body.Username,
        password: req.body.pwd
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