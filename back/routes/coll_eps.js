var express  = require('express');
var router   = express.Router();
let tblModel = require('../models/coll_eps')
let authenticate    = require('../Middleware/authenticate');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

/* GET users listing. */
router.get('/', function(req, res, next) 
{
    tblModel.findAll({})
    .then(function(response)
    {
        res.send({validate:true,data:response});
    })
    .catch(function(response){
        res.send({validate:false,data:response});
    })
});
router.post('/find',authenticate.auth,function(req,res,next)
{
    tblModel.findByPk(req.body.id)
    .then(function(response)
    {
        res.send({validate:true,data:response});
    })
    .catch(function(response){
        res.send({validate:false,data:response});
    });
})
router.post('/save',authenticate.auth, function(req, res, next)
{
    let rq = req.body;
    tblModel
    .create(rq)
    .then(function(response)
    {
        res.send({validate:true,data:response});
    })
    .catch(function(response)
    {
        res.send({validate:false,data:response});
    })
});
router.post('/update',authenticate.auth, async function(req, res, next)
{
    let rq = req.body;
    let form =
    {
        name        : rq.name,
        description : rq.description
    };
    tblModel
    .update(form,{where:{id:rq._id}})
    .then(function(response)
    {
        res.send({validate:true,data:response});
    })
    .catch(function(datares)
    {
        console.log(datares);
    });
});
router.post('/delete',authenticate.auth, async function(req, res, next)
{
    let rq = req.body;
    let data = await tblModel.findByPk(rq._id);
    data.destroy();
    res.send({validate:true});
});
module.exports = router;