var express  = require('express');
var router   = express.Router();
let tblModel = require('../models/coll_sugerencia')
let authenticate    = require('../Middleware/authenticate');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});
/* GET users listing. */
router.post('/',authenticate.auth, function(req, res, next) 
{
    let rq   = req.body;
    let limit = 10;
    let pag = rq.pag
    let offset = (limit*pag)-limit;
    tblModel
    .findAndCountAll({order: ['id'],offset: offset})
    .then(function(datatemp)
    {
      let data={
        docs:datatemp.rows,
        limit: limit,
        page: rq.pag,
        pages: Math.ceil(datatemp.count/limit),
        total: datatemp.count
      };
      res.send({validate:true,data:data});
    })
    .catch(function(datatemp)
    {
      console.log(datatemp);
        res.send({validate:false,data:datatemp});
    })
});
router.post('/find',authenticate.auth,function(req,res,next)
{
    tblModel.
    findByPk(req.body._id)
    .then(function(response)
    {
        res.send({validate:true,data:response});
    });
})
router.post('/save', function(req, res, next)
{
    let rq = req.body;
    let fecha=new Date();
    fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
    tblModel.create({description :rq.description,fecha: fecha})
    .then(function(response)
    {
        res.send({validate:true,data:response});
    });
});
module.exports = router;