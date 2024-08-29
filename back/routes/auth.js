const conf = require('../env')
const jwt    = require('jsonwebtoken');
var express  = require('express');
var router   = express.Router();
let tblModel = require('../models/coll_users')
var bcrypt = require('bcrypt');
let authenticate    = require('../Middleware/authenticate');
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  });
/* GET users listing. */

router.get('/versionapp',function(req,res,next){
    let data = {version:'2.0.0.5'};
    res.send(data);
})
router.post('/save',authenticate.auth, async function(req, res, next)
{
    let rq = req.body;
    let password = bcrypt.hashSync(rq.documento, 10);
    let datasave =
    {
        _id: new mongoose.Types.ObjectId(),
        nombre_primero:     rq.nombre_primero,
        nombre_segundo:     rq.nombre_segundo,
        apellido_segundo:   rq.apellido_segundo,
        apellido_primero:   rq.apellido_primero,
        email:              rq.email,
        documento_numero:   rq.documento,
        password:           password
    };
    tblModel.create(datasave,function(error,response)
    {
        res.send({validate:true,data:response});
    })
});
router.get('/logout',function(req, res, next){
    const token = req.headers.authorization;
    const users  = req.headers.source;
    jwt.verify(token, conf.secretKey, function (err, decoded){
        if(!err)
        {
            tblModel
            .findByPk(users)
            .then(function(response){
                if(response==null){
                    res.status(402).send({error:'User not autorized.'});
                }
                else{
                    jwt.sign({ id: response.id }, conf.secretKey, { expiresIn: 1 });
                    res.send({validate:true});
                }
            })
            .catch(function(response) {
                res.status(402).send({error:'User not autorized.'});
            })
        }
        else{
            res.status(402).send({error:'User not autorized.'});
        }
    });
})
router.post('/changePass',authenticate.auth, async function(req, res, next)
{
    let rq = req.body;
    let respuesta = false;
    let usr=JSON.parse(rq.local.user);
    pass=usr.password;
    if(usr.email==rq.user)
    {
        if(rq.passNew1==rq.passNew2)
        {
            respuesta = await new Promise((resolve, reject) =>
            {
                bcrypt.compare(rq.passold, pass, function(err, resp) {
                    if (err) reject(err)
                    resolve(resp)
                });
            });
            if(respuesta)
            {
                var password = await new Promise((resolve, reject) => {
                    bcrypt.hash(rq.passNew1, 10, function(err, hash) {
                        if (err) reject(err)
                        resolve(hash)
                    });
                });
                tblModel.updateOne({email:usr.user},{password:password})
                .then(function(error,response)
                {
                    res.send({validate:true,error:error,data:response});
                })
            }
        }
        else{
            respuesta=false;
        }
    }
    else
    {
        resultado=false;
    }
    res.send({validate:respuesta});
});
router.post('/login',async function(req, res, next) {

    tblModel
    .findOne({where:{email:req.body.email}})
    .then(async (datatemp) => {
        //let validate = false;
        if(datatemp!=null) {
            /*validate = await new Promise(async (resolve, reject) => {
                bcrypt.compare(req.body.password, datatemp.password, function(err, resultado) {
                    if (typeof err === 'undefined') {
                        resolve(resultado);
                    } else {
                        resolve(false);
                        reject(false);
                    }
                });
            });*/

            const validate = await bcrypt.compare(req.body.password, datatemp.password);

            if(validate) {
                let token = jwt.sign({ id: datatemp.id }, conf.secretKey, { expiresIn: 86400 });
                res.status(200).send({ auth: true, token: token, user: datatemp,validate:true,msj:null });
            } else {
                res.send({auth: true, token: null, user:null,validate:false,msj:'La contraseña no coincide'});
            }

        } else {
            res.send({validate:false,msj:'El usuario no existe'});
        }
    })
    .catch(error => {
        res.status(404).send(error);
    })

});
router.post('/validate',async function(req, res, next){
    const token = req.headers.authorization;
    const users  = req.headers.source;
    let validate = await new Promise(function(resolve,reject)
    {
        jwt.verify(token, conf.secretKey, function (err) {
            if (err) {
                resolve(false)
            } else {
                tblModel
                .findByPk(users)
                .then(function(response){
                    resolve(response!==null)
                })
                .catch(function(response) {
                    resolve(false)
                })
            }
        });
    });
    res.send({validate:validate});
})
module.exports = router;