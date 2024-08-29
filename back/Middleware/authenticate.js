const conf = require('../env')
const jwt = require('jsonwebtoken');
let user = require('../models/coll_users');
module.exports = {
    auth(req, res, next)
    {
        const token = req.headers.authorization;
        const users  = req.headers.source;
        jwt.verify(token, conf.secretKey, function (err, decoded){
            if (err) {
                res.status(402).send({error:'User not autorized.'});
            } else {
                user
                .findByPk(users)
                .then(function(response){
                    if(response==null) {
                        res.status(402).send({error:'User not autorized.'});
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                })
                .catch(function(response){
                    res.status(402).send({error:'User not autorized.'});
                })
            }
        });
    }
}