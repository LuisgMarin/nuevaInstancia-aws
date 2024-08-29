var express  = require('express');
var router   = express.Router();
let tblModel = require('../models/coll_documents_types');
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  });
/* GET users listing. */
router.get('/', function(req, res, next) 
{
    tblModel
    .findAll({})
    .then(function(response)
    {
        res.send({validate:true,data:response});
    })
    .catch(function(response){
        res.send({validate:false,data:response});
    })
});
router.post('/find',function(req,res,next)
{
    tblModel
    .findByPk(req.body.id)
    .then(function(response)
    {
        res.send({validate:true,data:response});
    })
    .catch(function(response){
        res.send({validate:false,data:response});
    });
})
module.exports = router;