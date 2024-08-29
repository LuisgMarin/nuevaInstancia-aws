var express = require('express');
const env = require('../env')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index', { title: 'SISTEMA DE AGENDAMIENTO PARA ' + env.nombreSistema });
});
router.get('/version/mobile', (req, res) =>{
  res.send({version: env.versionMobile});
});

module.exports = router;
