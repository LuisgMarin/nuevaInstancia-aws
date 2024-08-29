var express                 = require('express');
var router                  = express.Router();
let tblModel                = require('../models/coll_especialistas');
let tblEspecialistasHorario = require('../models/coll_especialistas_horario');
let tblSpecialties          = require('../models/coll_specialties');
let searchHorarios          = require('../controls/horarios');
let authenticate    = require('../Middleware/authenticate');
const moment = require('moment-timezone');
let fn              = require('../controls/horarios');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  });
/* GET users listing. */
router.get('/', function(req, res, next) 
{
    tblModel.findAll({include:[tblSpecialties]})
    .then(function(response)
    {
        res.send({validate:true,data:response});
    })
    .catch(function(response){
        res.send({validate:false,data:response});
    })
});
router.post('/update',authenticate.auth, function(req, res, next)
{
    let rq = req.body;
    let form={
        nombre_primero       : rq.nombre_primero,
        nombre_segundo       : rq.nombre_segundo,
        apellido_primero     : rq.apellido_primero,
        apellido_segundo     : rq.apellido_segundo,
        documento_numero     : rq.documento_numero,
        id_documento_tipo    : rq.documento_typo_id,
        id_especialidad_tipo : rq.especialidad_id
    };
    tblModel
    .update(form,{where:{id:rq.id}})
    .then(function(response)
    {
        res.send({validate:true,data:response});
    })
    .catch(function(datares)
    {
        console.log(datares);
    });
});
router.post('/find',authenticate.auth,function(req,res,next)
{
    tblModel
    .findByPk(req.body.id)
    .then(function(response)
    {
        res.send({validate:(typeof response !== "undefined"),data:response});
    })
    .catch(function(response){
        res.send({validate:false,data:response});
    });
})
router.post('/delete',authenticate.auth, async function(req, res, next)
{
    let rq = req.body;
    let data = await tblModel.findByPk(rq._id);
    data.destroy();
    res.send({validate:true});
});
router.post('/save',authenticate.auth, function(req, res, next)
{
    let rq = req.body;
    let form={
        nombre_primero       : rq.nombre_primero,
        nombre_segundo       : rq.nombre_segundo,
        apellido_primero     : rq.apellido_primero,
        apellido_segundo     : rq.apellido_segundo,
        documento_numero     : rq.documento_numero,
        id_documento_tipo    : rq.documento_typo_id,
        id_especialidad_tipo : rq.especialidad_id
    };
    tblModel
    .create(form)
    .then(function(response)
    {
        res.send({validate:true,data:response});
    })
    .catch(function(datares)
    {
        console.log(datares);
    });
});
router.post('/horario/save',async function(req, res)
{
    const rq = req.body;
    const tiempo      = rq.tiempo;
    let rangos = [];
    let i = 0;
    let isFinish = true;
    const fecha = rq.dia;
    let hora_fin    = moment(
                          `${rq.hora_fin.hh}:${rq.hora_fin.mm} ${rq.hora_fin.A}`,
                          ["h:mm A"]
                      )
                      .tz('America/Bogota')
                      .format("HH:mm:ss")

    let hora_inicio = moment(
                          `${rq.hora_inicio.hh}:${rq.hora_inicio.mm} ${rq.hora_inicio.A}`,
                          ["h:mm A"]
                      )
                      .tz('America/Bogota')
                      .format("HH:mm:ss")

    let hora_start  = moment(hora_inicio, ["HH:mm:ss"]).tz('America/Bogota');
    let hora_finish = moment(hora_fin, ["HH:mm:ss"]).tz('America/Bogota');

    hora_finish = moment(hora_start).add(tiempo, 'minutes')
                    .tz('America/Bogota')
                    .format('HH:mm:ss')

    while(isFinish) {
        hora_start  = moment(hora_inicio, ["HH:mm:ss"]).add(tiempo * i, 'minutes')
                        .tz('America/Bogota')
                        .format('HH:mm')
        hora_finish = moment(hora_start, ["HH:mm:ss"]).add(tiempo, 'minutes')
                        .tz('America/Bogota')
                        .format('HH:mm')


        console.log({
            hora_start:hora_start,
            hora_finish:hora_finish,
        })
        rangos.push({
            fecha           : fecha,
            hora_inicio     : hora_start,
            hora_fin        : hora_finish
        });
        tblEspecialistasHorario
        .create({
            id_especialista : parseInt(rq._id),
            fecha           : fecha,
            hora_inicio     : hora_start,
            hora_fin        : hora_finish
        })
        .catch(function(response){
            res.status(402).send({validate:false,data:response});
        });

        isFinish = moment(hora_finish, ["HH:mm:ss"]) < moment(hora_fin, ["HH:mm:ss"])

        i++;
    }
    res.send({validate:true,data:rangos});
});
router.post('/horario',authenticate.auth, async function(req,res,next)
{
    try {
        tblEspecialistasHorario
        .findAll({
            where:
            {
                id_especialista:req.body._id,
                fecha:req.body.fecha
            },
            order: [['fecha','ASC'],['hora_inicio','ASC']]
        })
        .then(function(response){
            res.send({validate:true,data:response});
        })
        .catch(function(response){
            console.log({response:response});
            res.status(402).send({validate:false,data:response});
        })
    }
    catch (error)
    {
        res.send({validate:true,data:[]});
    }
});
router.get('/horario',async function(req,res,next)
{
    try {
        let result = await searchHorarios.calcularMinutos();
        
        res.send(result);
    }
    catch (error)
    {
        res.status(402).send({validate:false,data:[]});
    }
});

router.post('/horario/delete',authenticate.auth, async function(req, res, next)
{
    let rq = req.body;
    tblEspecialistasHorario.destroy({where: {id:rq._id}})
    res.send({validate:true});
});



module.exports = router;