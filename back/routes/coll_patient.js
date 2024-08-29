var express = require('express');
var router = express.Router();
let documentType = require('../models/coll_documents_types');
let tblPatient = require('../models/coll_patients');
let authenticate = require('../Middleware/authenticate');
let env = require('../env');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/', function(req, res, next) {
    let rq = req.body;
    let limit = 10;
    let pag = rq.pag;
    let offset = (limit * pag) - limit;
    
    tblPatient.findAndCountAll({
        include: [documentType],
        order: ['id'],
        offset: offset,
        limit: limit
    })
    .then(function(datatemp) {
        // Enmascarar los datos
        const maskedDocs = datatemp.rows.map(doc => doc.getMaskedData());
        let data = {
            docs: maskedDocs,
            limit: limit,
            page: rq.pag,
            pages: Math.ceil(datatemp.count / limit),
            total: datatemp.count
        };
        res.send({validate: true, data: data});
    })
    .catch(function(response) {
        res.send({validate: false, data: response});
    });
});

router.post('/save', authenticate.auth, function(req, res, next) {
    let rq = req.body;
    let form = {
        documento: rq.documento,
        id_documentoType: rq.documento_typo_id,
        nombre_primero: rq.nombre_primero,
        nombre_segundo: rq.nombre_segundo,
        apellido_primero: rq.apellido_primero,
        apellido_segundo: rq.apellido_segundo,
        fecha_nacimiento: rq.fecha_nacimiento,
        email: rq.email,
        numero_contacto: rq.numero_contacto,
        ciudad: env.ciudadDefecto,
        pais: 'Colombia'
    };
    
    tblPatient.create(form)
    .then(function(response) {
        res.send({validate: true, data: response});
    })
    .catch(function(response) {
        res.status(402).send({validate: false, data: response});
    });
});

router.post('/find', authenticate.auth, function(req, res, next) {
    tblPatient.findByPk(req.body.id)
    .then(function(response) {
        res.send({validate: true, data: response.getMaskedData()});
    })
    .catch(function(response) {
        res.send({validate: false, data: response});
    });
});

router.post('/update', authenticate.auth, async function(req, res, next) {
    let rq = req.body;
    let form = {
        documento: rq.documento,
        id_documentoType: rq.documento_typo_id,
        nombre_primero: rq.nombre_primero,
        nombre_segundo: rq.nombre_segundo,
        apellido_primero: rq.apellido_primero,
        apellido_segundo: rq.apellido_segundo,
        fecha_nacimiento: rq.fecha_nacimiento,
        email: rq.email,
        numero_contacto: rq.numero_contacto
    };
    
    tblPatient.update(form, { where: { id: rq._id } })
    .then(function(response) {
        res.send({validate: true, data: response});
    })
    .catch(function(response) {
        res.status(402).send({validate: false, data: response});
    });
});

router.post('/delete', authenticate.auth, async function(req, res, next) {
    let rq = req.body;
    let data = await tblPatient.findByPk(rq._id);
    data.destroy();
    res.send({validate: true});
});

router.post('/documento', function(req, res, next) {
    tblPatient.findOne({ where: { documento: req.body.documento } })
    .then(function(response) {
        res.send({validate: true, data: response.getMaskedData()});
    })
    .catch(function(response) {
        res.send({validate: false, data: response});
    });
});

router.post('/saveMany', authenticate.auth, async function(req, res, next) {
    let rqs = req.body;
    for (var i = 0; i < rqs.length; i++) {
        let rq = rqs[i];
        documentTypes = await new Promise((resolve, reject) => {
            if (rq.documento_typo_id == null) {
                resolve({_id: null, name: "--", name_short: "--"});
            } else {
                documentType.findById(rq.documento_typo_id, function(err, resultado) {
                    if (typeof resultado != 'undefined') {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(resultado);
                        }
                    } else {
                        resolve({data: null});
                    }
                });
            }
        });
        rq.documentoType = documentTypes;
        await tblPatient.upsert(rq);
    }
    res.send({validate: true});
});

module.exports = router;
