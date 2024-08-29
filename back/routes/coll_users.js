var express  = require('express');
var router   = express.Router();
let documentType = require('../models/coll_documents_types');
let tblModel = require('../models/coll_users');
var bcrypt = require('bcrypt');
let authenticate    = require('../Middleware/authenticate');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

router.get('/',authenticate.auth, function(req, res, next) 
{
  tblModel.findAll()
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
router.post('/update',authenticate.auth, async function(req, res, next)
{
  let rq = req.body;
  let form =
  {
    id_documentoType : rq.documento_typo_id,
    apellido_primero : rq.apellido_primero,
    apellido_segundo : rq.apellido_segundo,
    documento_numero : rq.documento_numero,
    email            : rq.email,
    nombre_primero   : rq.nombre_primero,
    nombre_segundo   : rq.nombre_segundo
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
router.post('/save',authenticate.auth, async function(req, res, next)
{
    let rq = req.body;
    let password = bcrypt.hashSync(rq.documento_numero, 10);
    let form =
    {
      id_documentoType : rq.documento_typo_id,
      apellido_primero : rq.apellido_primero,
      apellido_segundo : rq.apellido_segundo,
      documento_numero : rq.documento_numero,
      email            : rq.email,
      nombre_primero   : rq.nombre_primero,
      nombre_segundo   : rq.nombre_segundo,
      password         : password
    };
    tblModel
    .create(form)
    .then(function(response)
    {
      res.send({validate:true,data:response});
    })
    .catch(function(response){
      res.status(402).send({validate:true,data:response});
    })
});
module.exports = router;