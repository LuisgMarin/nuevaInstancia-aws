<template>
	<div>
		<div >
			<div >
				<!--============================ 01 ============================-->
				</div>
				<div v-if="buscar=='programe'">
				<!--============================ 01 ============================-->

				<!--============================ 02 ============================-->
					<div class="row">
					<div class="col-md">
						<h3 class="form-title">01. Informacion personal</h3>
					</div>
					</div>
					<div class="row">
					<div class="col-md">
						<label class="form-label">Tipo de documento</label>
						<select v-model="form.paciente.documentoType" class="form form-control text-input" id="">
							<option value="" style="display:none">Seleccione un tipo de documento</option>
							<option v-for="(documentosTipos,index) in arrayDocumentosTipos" :key="index" :value="documentosTipos.id">{{documentosTipos.name_short}} - {{documentosTipos.name}}</option>
						</select>
					</div>
					<div class="col-md">
						<label class="form-label">Numero de documento</label>
						<input v-model="form.paciente.documento" @change="loadPaciente" type="text" class="form form-control text-input" id="" placeholder="">
					</div>
					</div>
					<div class="row">
							<div class="col-md">
								<label class="form-label">Nombre primero</label>
								<input v-model="form.paciente.nombre_primero" type="text" class="form form-control text-input" id="" placeholder="">
							</div>
							<div class="col-md">
								<label class="form-label">Nombre segundo</label>
								<input v-model="form.paciente.nombre_segundo" type="text" class="form form-control text-input" id="" placeholder="">
							</div>
							<div class="col-md">
								<label class="form-label">Apellido primero</label>
								<input v-model="form.paciente.apellido_primero" type="text" class="form form-control text-input" id="" placeholder="">
							</div>
							<div class="col-md">
								<label class="form-label">Apellido segundo</label>
								<input v-model="form.paciente.apellido_segundo" type="text" class="form form-control text-input" id="" placeholder="">
							</div>

						</div>
					<div class="row">
					<div class="col-md">
						<label class="form-label">Fecha de nacimiento</label>
						<input type="text" id="fecha"  v-model="form.paciente.fecha_nacimiento" class="form form-control text-input">
					</div>
					</div>
					<div class="row">
					<div class="col-md">
						<label class="form-label">Email</label>
						<input v-model="form.paciente.email" type="email" class="form form-control text-input" id="" placeholder="">
					</div>
					<div class="col-md">
						<label class="form-label">Numero fijo o celular</label>
						<input v-model="form.paciente.numero_contacto" type="number" class="form form-control text-input" id="" placeholder="">
					</div>
					</div>
					<div class="row">
					<div class="col-md">
						<label class="form-label">Pais</label>
						<input readonly v-model="form.paciente.pais" type="text" class="form form-control text-input" id="" placeholder="">
					</div>
					<div class="col-md">
						<label class="form-label">Ciudad</label>
						<input readonly v-model="form.paciente.ciudad" type="text" class="form form-control text-input" id="" placeholder="">
					</div>
					</div>
					<!--============================ 02 ============================-->

					<!--============================ 03 ============================-->
					<div class="row">
					<div class="col-md">
						<h3 class="form-title">02. ¿Que tipo de cita requieres agendar?</h3>
						<p class="form-sub-title">Seleccione la especilidad o servicio correspondiente a la cita</p>
					</div>
					</div>
					<div class="row">
					<div class="col-md">
						<label for="" class="form-label">Especialidad</label>
						<select v-model="especialidad" class="form form-control text-input">
							<option value="" style="display:none">Seleccione</option>
							<option v-for="(especialidades, index) in arrayEspecialidades" :key="index" :value="especialidades.id">
								{{especialidades.name}}
							</option>
						</select>
					</div>
					<div class="col-md">
						<label for="" class="form-label">Nombre del especialista</label>
						<select @change="selectHour" v-model="form.especialista" class="select-input form form-control" id="">
							<option value="" style="display:none">{{especialidad==''?'Primero seleccione una especialidad':'Seleccione al especialista'}}</option>
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
						<h3 class="form-title">03. Su cita es a traves de</h3>
					</div>
					</div>
					<div class="row">
					<div class="col-md">
						<div  class="custom-control custom-radio">
							<label  for="appointment2">
								<input v-model="form.tipocita" value="eps" class="form-type-option" id="appointment2" name="tipo" type="radio">
								<span class="radio-label">EPS</span>
							</label>
							<label  for="appointment2">
								<input v-model="form.tipocita" value="particular" class="form-type-option" id="appointment2" name="tipo" type="radio">
								<span class="radio-label">Particular</span>
							</label>
						</div>
					</div>
					</div>
					<div class="row" v-if="form.tipocita=='eps'">
						<div class="col-md">
							<label class="form-label">Seleccione su EPS</label>
							<select v-model="form.eps" class="form form-control text-input" >
								<option value="" style="display:none">Seleccione una EPS</option>
								<option v-for="(eps,index) in arrayEps" :key="index" :value="eps.id">{{eps.name}}</option>
							</select>
						</div>
					</div>
					<!--============================ 04 ============================-->


					<!--============================ 05 ============================-->
					<div class="row">
					<div class="col-md">
						<h3 class="form-title">04. Campo de observaciones</h3>
						<textarea v-model="form.observacion" class="form form-control" name="" id="" cols="30" rows="10"></textarea>
					</div>
					</div>
					<!--============================ 05 ============================-->

					<!--============================ 06 ============================-->
					<div class="row">
					<div class="col-md">
						<h3 class="form-title">05. Seleccione la hora y la fecha </h3>
					</div>
					</div>
					<div class="row">
					<div class="col-md">
						<label for="" class="form-label">Seleccione la fecha</label>
						<input type="text" id="fecha_cita" class="form form-control others-2 text-input">
					</div>
					<div class="col-md">
						<label for="" class="form-label">Horas disponibles</label>
						<input type="text" v-model="form.hora" v-if="form.hora!=''" class="others-2 form-control" style="background-color:#FFF" readonly>
						<div class="container-fluid" id="div_hora">
								<div class="row" v-for="(hora,index) in arrayHora" :key="index">
									<div class="col-md" v-if="hora.disponible">
										<div @click="NewHour(hora)" style="cursor: pointer;" :class="'alert alert-'+(hora.hora==form.hora?'secondary':'success')" role="alert">
											{{hora.hora}}
										</div>
									</div>

								</div>
							</div>
					</div>
					</div>
					<div class="row">
					<div class="col-md">
						<button @click="save()" class="btn btn-success" :disabled="required" >Enviar</button>
					</div>
				</div>

					<!--============================ 06 ============================-->
				</div>
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
						<button @click="consultar" class="btn btn-success">consultar</button>
					</div>
					</div>
					<div id="resultado">
						<br>
						<table v-if="arrayCitas.length>0" style="background-color:#FFF" class="table table-hover">
							<thead>
								<tr>
									<th>Paciente</th>
									<th>Fecha</th>
									<th>Hora</th>
									<th>Especialista</th>
									<th>Especialidad</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(citas,index) in arrayCitas" :key="index">
									<td>
										{{citas.paciente.nombre_apellido}}
									</td>
									<td>{{citas.fecha}}</td>
									<td>{{citas.hora}}</td>
									<td>
										{{citas.especialista.nombre_primero}}
										{{citas.especialista.nombre_segundo}}
										{{citas.especialista.apellido_primero}}
										{{citas.especialista.apellido_segundo}}

									</td>
									<td>{{citas.especialista.especialidad_tipo.name}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import BootstrapVue from 'bootstrap-vue'
import 'jquery-ui/ui/widgets/datepicker'
import 'jquery-ui/themes/base/core.css'
import 'jquery-ui/themes/base/datepicker.css'
import 'jquery-ui/themes/base/theme.css'
import { cityDefault } from '../../../config/config'
import {es} from 'vuejs-datepicker/dist/locale';

export default{
	name: 'HelloWorld',
	components:{BootstrapVue},
	computedDates (value) {
    	return moment(value).format('YYYY-MM-D')
    },
  	data () {
    	return {
			arrayCitas:[],
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
					ciudad: cityDefault
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
		start()
		{
			this.especialidades();
			this.especialistas();
			this.documentosTipos();
			this.Eps();
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
					me.form.paciente.documentoType	  = '';
					me.form.paciente.nombre_primero	  = '';
					me.form.paciente.nombre_segundo	  = '';
					me.form.paciente.apellido_primero = '';
					me.form.paciente.apellido_segundo = '';
					me.form.paciente.fecha_nacimiento = '';
					me.form.paciente.email			  = '';
					me.form.paciente.numero_contacto  = '';
					me.form.paciente.pais			  = '';
					me.form.paciente.ciudad			  = '';
				}
			})
		},
		selectHour()
		{
			let me = this;
			if(me.form.especialista!='' && me.form.fecha!='')
			{
				axios
				.post(API_HOST+'/cita/hours',
				{
					especialista:me.form.especialista,
					fecha		:me.form.fecha
				})
				.then(function(response)
				{
					me.arrayHora = response.data.hora;
				})
			}
		},
		Eps()
		{
			let me = this;
			axios
			.get(API_HOST+'/eps')
			.then(function(response)
			{
				me.arrayEps = response.data.data;
			})
		},
		documentosTipos()
		{
			let me = this;
			axios
			.get(API_HOST+'/documentsTypes')
			.then(function(response)
			{
				me.arrayDocumentosTipos = response.data.data;
			})
		},
		especialidades()
		{

			let me = this;
			axios
			.get(API_HOST+'/specialties')
			.then(function(response)
			{
				me.arrayEspecialidades = response.data.data;
			})
		},
		especialistas()
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
			let validate=true;
			if(me.form.paciente.documentoType=='')
			{
				validate=false;
			}
			if(me.form.paciente.documento=='')
			{
				validate=false;
			}
			if(me.form.paciente.nombre_primero=='')
			{
				validate=false;
			}
			if(me.form.paciente.apellido_primero=='')
			{
				validate=false;
			}
			if(me.form.paciente.fecha_nacimiento=='')
			{
				validate=false;
			}
			if(me.form.paciente.numero_contacto=='')
			{
				validate=false;
			}
			if(me.form.especialista=='')
			{
				validate =false;
			}
			if(me.form.tipocita=='')
			{
				validate =false;
			}
			if(me.form.tipocita=='eps')
			{
				if(me.form.eps=='')
				{
					validate =false;
				}
			}
			if(me.form.fecha=='')
			{
				validate =false;
			}
			if(me.form.observacion=='')
			{
				validate =false;
			}
			if(validate)
			{
				me.required=true;
				axios
				.post(API_HOST+'/cita/save',me.form)
				.then(function(response)
				{
					$('input,select,textarea').attr('readonly','readonly');
					me.$toasted.show('Se ha guardado su cita con exito');
				})
			}
			else{
				me.$toasted.show('Debe completar todos los campos',{type : 'error',icon : 'error_outline'});
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

		}

  	},
	mounted:function()
	{
		this.start();
		let me = this;
		this.$parent._data.template='back'
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
				me.form.fecha=$(this).val();
				me.selectHour()
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
