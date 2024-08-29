<template>
	<div id="pedir">
		<div id="navbarfull">
			<div>
				<b-navbar type="" variant="">
					<b-navbar-brand><img :src="logo" class="logo" alt=""></b-navbar-brand>
					<b-navbar-nav>
					<!-- Navbar dropdowns -->
					<b-nav-item-dropdown text="NUESTRA INSTITUCION" right>
					</b-nav-item-dropdown>
					<b-nav-item-dropdown text="ATENCION AL PACIENTE" right>
					</b-nav-item-dropdown>
					<b-nav-item-dropdown text="DEPARTAMENTOS Y SERVICIOS" right>
					</b-nav-item-dropdown>
					<b-nav-item-dropdown text="EDUCACION" right>
					</b-nav-item-dropdown>
					<b-nav-item-dropdown text="OFICINA INTERNACIONAL" right>
					</b-nav-item-dropdown>
					<b-nav-item-dropdown text="Lang" right>
					<b-dropdown-item href="#">EN</b-dropdown-item>
					<b-dropdown-item href="#">ES</b-dropdown-item>
					<b-dropdown-item href="#">RU</b-dropdown-item>
					<b-dropdown-item href="#">FA</b-dropdown-item>
					</b-nav-item-dropdown>
					</b-navbar-nav>
				</b-navbar>
			</div>
			<div>
				<section class="jumbotron-grid">
					<div class="picture">
						<img alt="Contacto" class="image" :src="contacto">
					</div>
					<div class="bg-pattern">
						<div class="text-container">
							<p class="title">Contacto</p>
							<p class="content">Estamos atentos para responder tus preguntas.</p>
						</div>
					</div>
				</section>
			</div>
		</div>
		<div id="navbarfull2">
			<div class="alert alert-success" role="alert" style="font-size:1.5rem">
				Bienvenido al sistema de citas medicas de {{empresa}}
			</div>
		</div>

		<div class="container-fluid">
			<form id="formulario" @submit.prevent="save" class="contact-us container col-lg-10 offset-lg-1" >
				<!--============================ 01 ============================-->
				<div class="row">
					<div class="col-md">
						<h3 class="form-title">Sus datos serán tratados según la Ley 1266 de 2008 para la administración de datos personales.</h3>
						<div class="custom-control custom-radio">
							<div class="row" style="width:100%">
								<div class="col-md-4">
									<label for="appointment">
										<input v-model="buscar" checked="" class="form-type-option" id="appointment" name="formType" type="radio" value="programe">
										<span class="radio-label">Programe su cita</span>
									</label>
								</div>
								<div class="col-md-4">
										<label for="appointment2">
											<input v-model="buscar" checked="" class="form-type-option" id="appointment2" name="formType" type="radio" value="consulta">
											<span class="radio-label">Consulte su cita</span>
										</label>
								</div>
								<div class="col-md-4">
										<label for="appointment3">
											<input v-model="buscar" checked="" class="form-type-option" id="appointment3" name="formType" type="radio" value="sugerencia">
											<span class="radio-label">Deje una sugerencia</span>
										</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="buscar=='programe'">
					<div class="row">
						<div class="col-md">
							<h3 class="form-title">02. Informacion personal</h3>
						</div>
					</div>
					<div class="row">
						<div class="col-md">
						<label class="form-label">Tipo de documento</label>
						<select v-model="form.paciente.documentoType" class="form form-control text-input"  required>
							<option value="" style="display:none">Seleccione un tipo de documento</option>
							<option v-for="(documentosTipos,index) in arrayDocumentosTipos" :key="index" :value="documentosTipos.id">{{documentosTipos.name_short}} - {{documentosTipos.name}}</option>
						</select>
						</div>
					<div class="col-md">
						<label class="form-label">Numero de documento</label>
						<input v-model="form.paciente.documento" @change="loadPaciente" type="text" class="form form-control text-input"   required>
					</div>
					</div>
						<div class="row">
							<div class="col-md">
								<label class="form-label">Nombre primero</label>
								<input v-model="form.paciente.nombre_primero" type="text" class="form form-control text-input"   required>
							</div>
							<div class="col-md">
								<label class="form-label">Nombre segundo</label>
								<input v-model="form.paciente.nombre_segundo" type="text" class="form form-control text-input"  >
							</div>
							<div class="col-md">
								<label class="form-label">Apellido primero</label>
								<input v-model="form.paciente.apellido_primero" type="text" class="form form-control text-input"   required>
							</div>
							<div class="col-md">
								<label class="form-label">Apellido segundo</label>
								<input v-model="form.paciente.apellido_segundo" type="text" class="form form-control text-input"  >
							</div>

						</div>
					<div class="row">
					<div class="col-md">
						<label class="form-label">Fecha de nacimiento</label>
						<input type="text" id="fecha"  v-model="form.paciente.fecha_nacimiento" class="form form-control text-input" required>
					</div>
					</div>
					<div class="row">
					<div class="col-md">
						<label class="form-label">Email</label>
						<input v-model="form.paciente.email" type="email" class="form form-control text-input"  >
					</div>
					<div class="col-md">
						<label class="form-label">Numero fijo o celular</label>
						<input v-model="form.paciente.numero_contacto" type="number" class="form form-control text-input"   required>
					</div>
					</div>
					<div class="row">
					<div class="col-md">
						<label class="form-label">Pais</label>
						<input readonly v-model="form.paciente.pais" type="text" class="form form-control text-input"  >
					</div>
					<div class="col-md">
						<label class="form-label">Ciudad</label>
						<input readonly v-model="form.paciente.ciudad" type="text" class="form form-control text-input"  >
					</div>
					</div>
					<!--============================ 02 ============================-->

					<!--============================ 03 ============================-->
					<div class="row">
					<div class="col-md">
						<h3 class="form-title">03. ¿Que tipo de cita requieres agendar?</h3>
						<p class="form-sub-title">Seleccione la especilidad o servicio correspondiente a la cita</p>
					</div>
					</div>
					<div class="row">
					<div class="col-md">
						<label for="" class="form-label">Especialidad</label>
						<select v-model="especialidad" class="form form-control text-input" required>
							<option value="" style="display:none">Seleccione</option>
							<option v-for="(especialidades, index) in arrayEspecialidades" :key="index" :value="especialidades.id">
								{{especialidades.name}}
							</option>
						</select>
					</div>
					<div class="col-md">
						<label for="" class="form-label">Nombre del especialista</label>
						<select @change="selectDays" v-model="form.especialista" class="select-input form form-control"  required>
							<option value="">{{especialidad==''?'Primero seleccione una especialidad':'Seleccione al especialista'}}</option>
							<template v-for="(especialistas, index) in arrayEspecialistas">
								<option :value="especialistas.id" :key="index" v-if="especialidad==especialistas.id_especialidad_tipo">
									{{especialistas.apellido_primero}}
									{{especialistas.apellido_segundo}}
									{{especialistas.nombre_primero}}
									{{especialistas.nombre_segundo}}
								</option>
							</template>
						</select>
					</div>
					</div>
					<!--============================ 03 ============================-->

					<!--============================ 04 ============================-->
					<div class="row">
					<div class="col-md">
						<h3 class="form-title">04. Su cita es a traves de</h3>
					</div>
					</div>
					<div class="row">
					<div class="col-md">
						<div  class="custom-control custom-radio">
							<div class="row">
								<div class="col-md-4">
									<label  for="selecteps">
										<input v-model="form.tipocita" value="eps" class="form-type-option" id="selecteps" name="tipo" type="radio" required>
										<span class="radio-label">EPS</span>
									</label>
								</div>
								<div class="col-md-4">
									<label  for="selectparticular">
										<input v-model="form.tipocita" value="particular" class="form-type-option" id="selectparticular" name="tipo" type="radio">
										<span class="radio-label">Particular</span>
									</label>
								</div>
								<div class="col-md-4"></div>
							</div>
						</div>
					</div>
					</div>
					<div class="row" v-if="form.tipocita=='eps'">
						<div class="col-md">
							<label class="form-label">Seleccione su EPS</label>
							<select v-model="form.eps" class="form form-control text-input" required>
								<option value="" style="display:none">Seleccione una EPS</option>
								<option v-for="(eps,index) in arrayEps" :key="index" :value="eps.id">{{eps.name}}</option>
							</select>
						</div>
					</div>
					<!--============================ 04 ============================-->


					<!--============================ 05 ============================-->
					<div class="row">
					<div class="col-md">
						<h3 class="form-title">05. Campo de observaciones</h3>
						<textarea v-model="form.observacion" class="form form-control" name=""  cols="30" rows="10"></textarea>
					</div>
					</div>
					<!--============================ 05 ============================-->

					<!--============================ 06 ============================-->
					<div class="row">
					<div class="col-md">
						<h3 class="form-title">06. Seleccione la hora y la fecha </h3>
					</div>
					</div>
					<div v-if="form.especialista==''"  class="alert alert-danger" role="alert">
					Debe seleccionar un especialista
					</div>
					<div class="row">
						<div class="col-md">
							<label for="" class="form-label">Seleccione la fecha</label>
							<input type="text" id="fecha_cita" class="form form-control others-2 text-input" required>
						</div>
						<div class="col-md">
							<label for="" class="form-label">Horas disponibles</label>
							<input type="text" v-model="form.hora" placeholder="hora de la cita" class="others-2 form-control" style="background-color:#FFF" readonly required>
							<div class="container-fluid" id="div_hora" v-if="arrayHora.length">
								<b-list-group>
									<template v-if="arrayHora.length">
										<b-list-group-item v-for="(hora,index) in arrayHora" :key="index" @click="NewHour(hora)" :active="hora.hora==form.hora" style="font-size:1.5rem" button>
											<i class="far fa-calendar-alt"></i> {{hora.hora}} <i class="fas fa-user-md"></i>
										</b-list-group-item>
									</template>
								</b-list-group>
							</div>
						</div>
					</div>
					<div class="row">
					<div class="col-md">
						<button type="submit" class="btn-grande btn btn-lg btn-success" :disabled="required" >Enviar</button>
					</div>
				</div>
				<!--============================ 06 ============================-->
				</div>
			</form>
			<div id="other" class="contact-us container col-lg-8 offset-lg-2" >
				<div v-if="buscar=='consulta'">
					<div class="row">
						<div class="col-md">
							<h3 class="form-title">Ingrese su numero de documento</h3>
							<input v-model="id_consulta" type="text" class="form form-control text-input">
						</div>
					</div>
					<div class="row">
					<div class="col-md">
						<br>
						<button @click="consultar" class="btn-lg btn-grande btn btn-success">consultar</button>
					</div>
					</div>
					<div id="resultado">
						<br>
						<div v-for="(citas,index) in arrayCitas" :key="index">
							<span v-if="index===0" style="font-size: 4em;" class="badge badge-dark">
							{{citas.coll_patient.nombre_primero}}
							{{citas.coll_patient.nombre_segundo}}
							{{citas.coll_patient.apellido_primero}}
							{{citas.coll_patient.apellido_segundo}}
							</span>
							<table style="background-color:#FFF" class="table table-hover">
								<tbody>
									<tr>
										<td>Fecha</td>
										<td>{{citas.fecha | dateFormats}}</td>
									</tr>
									<tr>
										<td>Hora</td>
										<td>{{citas.hora}}</td>
									</tr>
									<tr>
										<td>Especialista</td>
										<td v-if="citas.coll_especialistum!=null">
											{{citas.coll_especialistum.nombre_primero}}
											{{citas.coll_especialistum.nombre_segundo}}
											{{citas.coll_especialistum.apellido_primero}}
											{{citas.coll_especialistum.apellido_segundo}}
										</td>
										<td v-else>
											<span class="badge badge-danger">No asignado</span>
										</td>
									</tr>
									<tr>
										<td>Especialidad</td>
										<td  v-if="citas.coll_especialistum!=null">{{citas.coll_especialistum.coll_specialtie.name}}</td>
										<td v-else><span class="badge badge-danger">No asignado</span></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div v-if="buscar=='sugerencia'" class="contact-us container col-lg-8 offset-lg-2" >
				<div class="container-fluid">
					<br>
					<div class="row">
						<div class="col-md">
							<textarea class="form form-control" cols="30" v-model="sugerencias" rows="10" style="font-size: 2.5em;"></textarea>
						</div>
					</div>
					<div class="row">
						<div class="col-md">
							<br>
							<button class="btn-grande btn btn-success btn-small" @click="newSugerencia()">Guardar</button>
						</div>
					</div>
				</div>
			</div>
			<br>
			<br>
			<br>
			<br>
		</div>
	</div>
</template>
<script>

import BootstrapVue from 'bootstrap-vue'
import 'jquery-ui/ui/widgets/datepicker'
import 'jquery-ui/themes/base/core.css'
import 'jquery-ui/themes/base/datepicker.css'
import 'jquery-ui/themes/base/theme.css'
import {es} from 'vuejs-datepicker/dist/locale';
import Datepicker from 'vuejs-datepicker';
import config from './../../../config/config';

export default{
	name: 'HelloWorld',
	components:{BootstrapVue,Datepicker},
	computedDates (value) {
    	return moment(value).format('YYYY-MM-D')
	},
	filters: {
		dateFormats: function (value) {
			var f = new Date(value);
			return ( f.getFullYear()+ "-" + (f.getMonth() +1) + "-" +f.getDate() );
		}
	},
  	data () {
    	return {
      logo: require('@/assets/images/logoDefault.png'),
      contacto: require('@/assets/images/contactoDefault.png'),
      empresa: config.nameESE,
			pruebadatepicker:'',
			arrayCitas:[],
			sugerencias:'',
			es:es,
			required:false,
			arrayHora:[],
			buscar:'programe',//'consulta',
			especialidad:'',
			form:{
				paciente:{
					documentoType:'',
					documento:'',
					nombre_primero:'',
					nombre_segundo:'',
					apellido_primero:'',
					apellido_segundo:'',
					fecha_nacimiento:'',
					email:'',
					numero_contacto:'',
					pais:'Colombia',
					ciudad:config.cityDefault
				},
				especialista:'',
				eps:'',
				tipocita:'',
				fecha:'',
				hora:'',
				observacion:''
			},
			arrayEspecialidades:[],
			arrayEspecialistas:[],
			arrayDocumentosTipos:[],
			arrayEps:[],
			id_consulta:''
    	}
  	},
  	methods:{
		async start()
		{
			let me = this;
			await me.especialidades();
			await me.especialistas();
			await me.documentosTipos();
			await me.Eps();
		},
		customFormatter(date) {
			return moment(date).format('YYYY-MM-DD');
		},
		newSugerencia()
		{
			let me = this;
			const url = API_HOST+'/sugerencias/save';
			axios
			.post(url,{description:me.sugerencias})
			.then(async function(response)
			{
				me.$swal('Sugerencia fue enviada');
				await me.$socket.emit('newMsj',{title: 'Sugerencia',text: 'Se ha registrado una nueva sugerencia'});
			})
			.catch(function(e)
			{
				me.$swal('ERROR');
				me.required=false;
			})
		},
		NewHour(hora)
		{
			let me = this;
			me.form.hora=hora.hora;
		},
		loadPaciente()
		{
			let me = this;
			axios
			.post(API_HOST+'/patient/documento',{documento:me.form.paciente.documento})
			.then(function(response)
			{
				if(response.data.data!=null)
				{
					let value						  = response.data.data;
					let fecha			  			  = new Date(value.fecha_nacimiento);
					me.form.paciente.documentoType	  = value.id_documentoType;
					me.form.paciente.nombre_primero	  = value.nombre_primero;
					me.form.paciente.nombre_segundo	  = value.nombre_segundo;
					me.form.paciente.apellido_primero = value.apellido_primero;
					me.form.paciente.apellido_segundo = value.apellido_segundo;
					me.form.paciente.fecha_nacimiento = fecha.getFullYear() + "-" + (fecha.getMonth() +1) + "-" + fecha.getDate();
					me.form.paciente.email			  = value.email;
					me.form.paciente.numero_contacto  = value.numero_contacto;
					me.form.paciente.pais			  = value.pais;
					me.form.paciente.ciudad			  = value.ciudad;
				}
				else{
					me.form.paciente.nombre_primero	  = '';
					me.form.paciente.nombre_segundo	  = '';
					me.form.paciente.apellido_primero = '';
					me.form.paciente.apellido_segundo = '';
					me.form.paciente.fecha_nacimiento = '';
					me.form.paciente.email			  = '';
					me.form.paciente.numero_contacto  = '';
				}
			})
		},
		selectDays()
		{
			let me = this;
			axios
			.post(API_HOST+'/cita/dias',
			{
				especialista:me.form.especialista
			})
			.then(function(response)
			{
				let days = response.data.data;
				let dias = [];
				for(var i=0; i<days.length; i++)
				{
					dias[i]=(days[i].fecha);
				}
				$('#fecha_cita').datepicker("option",{
					beforeShowDay: function(date){
						var string = $.datepicker.formatDate('yy-mm-dd', date);
						return [ dias.indexOf(string) !== -1 ]
					},
					onSelect:function(date)
					{
						me.form.fecha=date;
						me.selectHour();
					}
				});
			})
		},
		selectHour()
		{
			let me = this;
			if(me.form.especialista!='')
			{
				axios
				.post(API_HOST+'/cita/hours',
				{
					especialista:me.form.especialista,
					fecha		:me.form.fecha
				})
				.then(function(response)
				{
					me.arrayHora = response.data;
				})
			}
		},
		async Eps()
		{
			let me = this;
			axios
			.get(API_HOST+'/eps')
			.then(function(response)
			{
				me.arrayEps = response.data.data;
			})
		},
		async documentosTipos()
		{
			let me = this;
			axios
			.get(API_HOST+'/documentsTypes')
			.then(function(response)
			{
				me.arrayDocumentosTipos = response.data.data;
			})
		},
		async especialidades()
		{

			let me = this;
			axios
			.get(API_HOST+'/specialties')
			.then(function(response)
			{
				me.arrayEspecialidades = response.data.data;
			})
		},
		async especialistas()
		{
			let me = this;
			axios
			.get(API_HOST+'/especialista')
			.then(function(response)
			{
				me.arrayEspecialistas = response.data.data;
			})
		},
		save()
		{
			let me = this;
			let validate=$('form').valid();
			if(validate)
			{
				me.required=true;
				axios
				.post(API_HOST+'/cita/save',me.form)
				.then(async function(response)
				{
					$('input,select,textarea').attr('readonly','readonly');
					me.$swal('Se ha guardado su cita con exito');
					await me.$socket.emit('newMsj',{title: 'Citas',text: 'Se ha registrado una nueva cita'});
				})
				.catch(function(e)
				{
					me.$swal({
						icon: 'error',
						title: 'Cita asignada',
						text: 'Ya se ha asignado una cita a esta hora con este especialista.',
						footer: 'Por favor seleccione otra o u otra fecha'
					});
					me.selectHour();
					me.required=false;
				})
			}
			else{
				me.$swal('Debe completar todos los campos');
			}
		},
		consultar()
		{
			let me = this;
			axios
			.post(API_HOST+'/cita/consultar',{documento:me.id_consulta})
			.then(function(response)
			{
				me.arrayCitas=response.data.data;
			})

		},
    loadLogo() {
      try {
        this.logo = require('@/assets/images/logo.png')
      } catch (error) {
        }

      try {
        this.contacto = require('@/assets/images/contacto.png')
      } catch (error) {
      }
      //this.logo = require('@/assets/images/logo.png');
      //this.contacto = require('@/assets/images/contacto.jpg');
    }
  },
	mounted:function()
	{
    this.loadLogo()
		this.start();
		let me = this;
		this.$parent._data.template='front'
		$('#fecha').datepicker({

			onSelect: function(dateText, inst)
			{
				me.form.paciente.fecha_nacimiento=$(this).val();
			},
			dateFormat:'yy-mm-dd',
			yearRange: "-150:+0",
			maxDate:'+0',
			changeMonth: true,
      		changeYear: true
		});
		$('#fecha_cita').datepicker({

			onSelect: function(dateText, inst)
			{
			alert('asd');
				me.form.fecha=$(this).val();
				me.selectHour();
			},
			beforeShowDay: function (day)
			{
				return [false, "somecssclass"]
			},
			dateFormat:'yy-mm-dd',
			yearRange: "+0:+1",
			minDate:'+0',
			changeMonth: true,
      		changeYear: true
		});

  	}
}
</script>
<style>
.ui-datepicker{
	font-size: 1.5rem;
}
.btn-grande{
    font-size: 2.5em;
}
.error{
	width: none !important;
}
label.error{
	display: inline-block;
    padding: .25em .4em;
    font-size: 1.5em;
    color: #fff;
    background-color: #dc3545;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.alert-danger {
    font-size: 1.5rem;
}
.custom-radio .row .col-md-4{
	width: auto !important;
}
#ui-datepicker-div{font-size: 2rem !important;}
</style>
