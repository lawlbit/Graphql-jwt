const jwt = require('jsonwebtoken');
const key = process.env.SecretKey;
const pass = process.env.API_PWD

const verify = function(req, res, next){
    console.log(req.headers);
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    if (typeof authHeader !== 'undefined'){
        const bearer = authHeader.split(" ");
        const token = bearer[1];
        console.log(key);
        jwt.verify(token, key, function(err, data){
            if (err){
                console.log(err.message);
                res.sendStatus(403);
            } else if (data.pwd != pass){
                console.log(data.pwd);
                res.sendStatus(403);
            } else {
                console.log(data);
                return next();
            }
        }); 
    } else {
        res.sendStatus(403);
    }
};

module.exports = {
    verify
}