var sequelize = require('../config/dbcon');
var express         = require('express');
var router          = express.Router();
let tblPatient      = require('../models/coll_patients');
let tblEspecilaista = require('../models/coll_especialistas');
let tblEspecilidad  = require('../models/coll_specialties');
let citas           = require('../models/coll_citas');
let tblEps          = require('../models/coll_eps')
let tblConfig       = require('../models/coll_config')
let citasEstado     = require('../models/coll_citas_estado');
let authenticate    = require('../Middleware/authenticate');
let moment          = require('moment');
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});
router.get('/',authenticate.auth, function(req, res, next) 
{
  citas
  .findAll({})
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
    citas
    .findOne({where:{id:req.body.id},include: [tblPatient,tblEspecilaista,citasEstado,tblEps]})
    .then(function(response)
    {
        res.send({validate:true,data:response});
    })
    .catch(function(response){
        res.send({validate:false,data:response});
    });
});
router.post('/update',authenticate.auth, async function(req, res, next)
{
  let rq = req.body;
  var id_paciente = await new Promise((resolve,reject)=>{
    tblPatient
    .findOne({where:{documento:rq.paciente.documento}})
    .then(function (response)
    {
      if(response!==null)
      {
        resolve(response.id);
      }
      else
      {
        let pac=rq.paciente;
        let form={
          apellido_primero : pac.apellido_primero, 
          apellido_segundo : pac.apellido_segundo, 
          ciudad           : pac.ciudad, 
          documento        : pac.documento, 
          id_documentoType :pac.documentoType,          
          email:pac.email, 
          fecha_nacimiento:pac.fecha_nacimiento, 
          nombre_primero:pac.nombre_primero, 
          nombre_segundo:pac.nombre_segundo, 
          numero_contacto:pac.numero_contacto, 
          pais:pac.pais, 
        };
        tblPatient
        .create(form)
        .then(function(response2){
          resolve(response2.id)
        })
        .catch(function(response2){
          console.warn({error:response2})
        })
      }
    })
    .catch(function (response)
    {
        res.send({validate:false,data:response});
    });
  })
  let form ={
    id_paciente     : id_paciente,
    id_especialista : rq.especialista,
    id_eps          : rq.eps,
    tipocita        : rq.tipocita,
    fecha           : rq.fecha,
    hora            : (rq.hora=='' ? null:rq.hora),
    observacion     : rq.observacion,
    id_estado       : 1,
  };
  citas
  .update(form,{where:{id:rq.id}})
  .then(function (response) {
    res.send({validate:true,data:response});
  })
  .catch(function(response)
  {
    res.send('error');
  })
});
router.post('/all',authenticate.auth,async function(req,res,next)
{
    let rq   = req.body;
    let limit = 10;
    let pag = rq.pag
    let offset = (limit*pag)-limit+0;
    let where={};
    if(rq.especialista!='')
    {
      where['id_especialista']=rq.especialista;
    }
    if(rq.citaFecha!='')
    {
      where['fecha']=rq.citaFecha;
    }
    if(rq.pacienteDocumento!='')
    {
      let id_paciente= await new Promise(function(resolve,reject)
      {
        tblPatient
        .findOne({where:{documento:rq.pacienteDocumento}})
        .then(function(response){
          resolve(response.id);
        })
        .catch(function(response){
          resolve(false);
        })
      });
      where['id_paciente']=(id_paciente)?id_paciente:0;
    }
    if(Object.keys(where).length>0)
    {
      //where = {where:where};
    }
    else{
      where=null;
    }
    console.log('==========================================')
    console.log(where)
    console.log('==========================================')
    citas
    .findAndCountAll(
    {
      where:where,
      include: [tblPatient,tblEspecilaista,citasEstado,tblEps],
      order: ['fecha'],
      offset: offset,
      limit:limit
    })
    .then(function(datatemp)
    {
      let data={
        docs:datatemp.rows,
        limit: limit,
        page: pag,
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
router.post('/delete',authenticate.auth, async function(req, res, next)
{
    let rq = req.body;
    let data = await citas.findByPk(rq.id);
    data.destroy();
    res.send({validate:true});
});
router.post('/dias/',async function(req,res,next)
{
  let rq          = req.body;
  let sql =
  `SELECT
    "public"."coll_especialistas_horarios"."fecha"
  FROM
    "public"."coll_especialistas_horarios"
  WHERE
  "public"."coll_especialistas_horarios"."id_especialista" = ${rq.especialista}
  GROUP BY 
  "public"."coll_especialistas_horarios"."fecha"`;
  sequelize
  .query(sql)
  .then(function(response)
  {
    res.send(
    {
      validate:true,
      data:response[0]
    });
  })
  .catch(function(response,other)
  {
    res.send({validate:false,data:response});
  })
});


router.post('/hours/', async function(req, res, next) {
  try {
    let rq = req.body;
    let fechas = rq.fecha;

    console.log(fechas);
    
    const sql = `
      SELECT
        "coll_especialistas_horarios"."id",
        to_char("coll_especialistas_horarios"."hora_inicio"::time, 'HH12:MI AM') as hora,
        "coll_especialistas_horarios"."hora_fin",
        "coll_especialista"."id_especialidad_tipo"
      FROM
        "coll_especialista"
      INNER JOIN "coll_especialistas_horarios" ON "coll_especialista"."id" = "coll_especialistas_horarios"."id_especialista" 
      WHERE
        "coll_especialistas_horarios"."fecha"='${fechas}'
      AND
        "coll_especialistas_horarios"."id_especialista" NOT IN 
        (
          SELECT
            "coll_cita"."id_especialista"
          FROM
            "coll_cita"
          WHERE
            "coll_cita"."fecha" = date('${fechas}')
          AND
            "coll_cita"."id_especialista" = ${rq.especialista} 
          AND
            "coll_cita"."hora" BETWEEN "coll_especialistas_horarios"."hora_inicio" AND "coll_especialistas_horarios"."hora_fin"
        )
      ORDER BY
        "coll_especialistas_horarios"."hora_inicio"
    `;


    const response = await sequelize.query(sql); // Ejecuta la consulta SQL utilizando Sequelize

    res.send(response[0]); // Envia la respuesta al cliente
  } catch (error) {
    // Manejo de errores
    console.error('Error al consultar las horas disponibles:', error);
    res.status(500).send('Error al consultar las horas disponibles');
  }
});


router.post('/consultar', async function(req,res,next)
{
    let rq   = req.body;
    id_paciente = await new Promise(function(result,reject){
      tblPatient
      .findOne({where:{documento:rq.documento}})
      .then(function(response){
        console.log({response:response});
        result(response!=null?response.id:null);
      })
    })
    citas
    .findAll({include:[tblPatient,{model:tblEspecilaista,include:[tblEspecilidad]}],where:{id_paciente:id_paciente}})
    .then(function(response)
    {
        res.send({data:response});
    })
    .catch(function(response){
      res.send({data:'ERROR'}).status(500);
      console.log('=================================================',response)
    })
});
router.post('/save', async function(req, res, next)
{
  let rq = req.body;
  var id_paciente = await new Promise((resolve,reject)=>{
    tblPatient
    .findOne({where:{documento:rq.paciente.documento}})
    .then(function (response)
    {
      if(response!==null)
      {
        resolve(response.id);
      }
      else
      {
        let pac=rq.paciente;
        let form={
          apellido_primero : pac.apellido_primero, 
          apellido_segundo : pac.apellido_segundo, 
          ciudad           : pac.ciudad, 
          documento        : pac.documento, 
          id_documentoType :pac.documentoType,          
          email:pac.email, 
          fecha_nacimiento:pac.fecha_nacimiento, 
          nombre_primero:pac.nombre_primero, 
          nombre_segundo:pac.nombre_segundo, 
          numero_contacto:pac.numero_contacto, 
          pais:pac.pais, 
        };
        tblPatient
        .create(form)
        .then(function(response2){
          resolve(response2.id)
        })
        .catch(function(response2){
          console.warn({error:response2})
        })
      }
    })
    .catch(function (response)
    {
        res.send({validate:false,data:response});
    });
  })
  let form ={
    id_paciente     : id_paciente,
    id_especialista : rq.especialista,
    id_eps          : rq.eps,
    tipocita        : rq.tipocita,
    fecha           : rq.fecha,
    hora            : (rq.hora==''?null:rq.hora),
    observacion     : rq.observacion,
    id_estado       : 1,

  };
  citas
  .create(form)
  .then(function(response)
  {
    res.send({validate:true,data:response});
  })
  .catch(function(response)
  {
    res.status(401).send({validate:false,data:'Cita repetida'});
  })
});
module.exports = router;