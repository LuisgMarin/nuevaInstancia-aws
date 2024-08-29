<template>
	<div>
		<div v-if="values.tipo_dato.nombre=='numero_positivo'" :id="values.tipo_dato.nombre+values._id">
			<input :value="vmodels" @input="$emit('input', $event.target.value)" :class="clase!=''?clase:''" min="0" placeholder="Cuanto" type="number">
		</div>
		<div v-if="values.tipo_dato.nombre=='numero_negativo'" :id="values.tipo_dato.nombre+values._id" >
			<input :value="vmodels" @input="$emit('input', $event.target.value)" :class="clase!=''?clase:''" max="0" placeholder="Cuanto" type="number">
		</div>
		<div v-if="values.tipo_dato.nombre=='numero'" :id="values.tipo_dato.nombre+values._id">
			<input :value="vmodels" @input="$emit('input', $event.target.value)" :class="clase!=''?clase:''" placeholder="Cuanto" type="number">
		</div>
		<div v-if="values.tipo_dato.nombre=='text'" :id="values.tipo_dato.nombre+values._id">
			<input :value="vmodels" @input="$emit('input', $event.target.value)" :class="clase!=''?clase:''" placeholder="Cuanto" type="text">
		</div>
		<div v-if="values.tipo_dato.nombre=='textarea'" :id="values.tipo_dato.nombre+values._id">
			<textarea :value="vmodels" @input="$emit('input', $event.target.value)" :class="clase!=''?clase:''" placeholder="Cuanto" type="text">
			</textarea>
		</div>
        <div v-if="values.tipo_dato.nombre=='texto'" :id="values.tipo_dato.nombre+values._id">
			<input type="text" :value="vmodels" @input="$emit('input', $event.target.value)" :class="clase!=''?clase:''" placeholder="solo letras, no numeros">
		</div>
        


		<div v-if="values.tipo_dato.nombre=='select'" :id="values.tipo_dato.nombre+values._id">
			<select :value="vmodels" @input="$emit('input', $event.target.value)" :class="clase!=''?clase:''">
				<option style="display:none" value="">Seleccione</option>
				<option v-for="(val,index) in values.valores" :key="index" :value="val">{{val}}</option>
			</select>
		</div>
		<div v-if="values.tipo_dato.nombre=='selectmultiple'" :id="values.tipo_dato.nombre+values._id">
			<multiselect :multiple="true" v-model="values.resultado"  @input="$emit('input', $event.target.value)"  :options="values.valores"></multiselect>
		</div>
		<div v-if="values.tipo_dato.nombre=='checktrue_selectmultiple'" :id="values.tipo_dato.nombre+values._id">
			<input type="checkbox" @click="values.resultado.value=!values.resultado.value" v-model="values.resultado.value">
			<multiselect :multiple="true" v-model="values.resultado.response" v-if="values.resultado.value"  @input="$emit('input', $event.target.value)"  :options="values.valores"></multiselect>
		</div>


		<div v-if="values.tipo_dato.nombre=='checkmultiple'" :id="values.tipo_dato.nombre+values._id">
			<label v-for="(valores,index) in values.valores" :key="index">
				{{valores}}-EN DESARROLLO
				<input type="checkbox" >
			<br>
			</label>
		</div>

		
		<div v-if="values.tipo_dato.nombre=='check'" :id="values.tipo_dato.nombre+values._id">
			<div class="col-auto inputOther">
				<div class="input-group mb-2">
					<div class="input-group-prepend">
						<div class="input-group-text" style="height: 38px;">
							<input :value="vmodels" @click="vmodels=!vmodels" @input="$emit('input', $event.target.value)" type="checkbox" >
						</div>
					</div>
				</div>
			</div>
		</div>


        <div v-if="values.tipo_dato.nombre=='radio'" :id="values.tipo_dato.nombre+values._id">
            <div v-for="(val,index) in values.valores" :key="index">
                <input type="radio" :id="'radios'+values._id+index" :name="'nombre'+values.tipo_dato.nombre+values._id" :value="val" @input="$emit('input', $event.target.value)">
                <label :for="'radios'+values._id+index">{{val}}</label>
            </div>
            <br>
		</div>
		<div v-if="values.tipo_dato.nombre=='boleanotreurespuesta'" :id="values.tipo_dato.nombre+values._id">
			<div class="col-auto inputOther">
				<div class="input-group mb-2">
					<div class="input-group-prepend">
						<div style="height: 38px;" class="input-group-text">
							<input type="checkbox" v-model="vmodels.value">
						</div>
					</div>
					<input type="text" class="form-control" v-if="vmodels.value" v-model="vmodels.response" placeholder="Describalos" >
				</div>
			</div>
		</div>
		<div v-if="values.tipo_dato.nombre=='check_texto_false'" :id="values.tipo_dato.nombre+values._id">
			<div class="col-auto inputOther">
				<div class="input-group mb-2">
					<div class="input-group-prepend">
						<div style="height: 38px;" class="input-group-text">
							<input type="checkbox" v-model="vmodels.value">
						</div>
					</div>
					<input type="text" class="form-control" v-if="!vmodels.value" v-model="vmodels.response" placeholder="Describalos" >
				</div>
			</div>
		</div>
        <div v-if="values.tipo_dato.nombre=='check_texto_true'" :id="values.tipo_dato.nombre+values._id">
			<div class="col-auto inputOther">
				<div class="input-group mb-2">
					<div class="input-group-prepend">
						<div style="height: 38px;" class="input-group-text">
							<input type="checkbox" v-model="vmodels.value">
						</div>
					</div>
					<input type="text" class="form-control" v-if="vmodels.value" v-model="vmodels.response" required placeholder="Describalos" >
				</div>
			</div>
		</div>





	</div>
</template>
<script>
import Multiselect from 'vue-multiselect'//npm install vue-multiselect --save
export default {
  name: 'inputs',
  components: { Multiselect },
  props:['values','clase'],
  data () {
    return {
        vmodels:'',
    }
  },

  methods:{
    start(){
      	let me =this;
      	switch(me.values.tipo_dato.nombre)
      	{
          	case 'check_texto_false':
            	me.vmodels={value:false,response:''};
				me.values.resultado=me.vmodels;
          	break;
          	case 'check_texto_true':
              	me.vmodels={value:false,response:''};
				me.values.resultado=me.vmodels;
		  	break;
		  	case 'check':
				  me.vmodels=false;
				  me.values.resultado=false;
			break;
			case 'selectmultiple':
				me.vmodels=null;
				me.values.resultado= null;
			break;
			case 'checktrue_selectmultiple':
				me.vmodels={value:false,response:null};
				me.values.resultado = {value:false,response:null};
			break;
			case 'checkmultiple':
				me.vmodels=[];
				me.values.resultado = [];
			break;
      }
    }
  },
    computed: {
        localAddress: {
            get() { return this.vmodels },
            set(localAddress) {this.$emit('input', vmodels)}
        }
    },
  mounted:function(){
    this.start();
  },
  formato()
  {
	  var datas =
      [ 
        { 
          "alert":{ 
            "status":true,
            "msj":"Paciente con bajo peso al nacer",
            "value":2500,
            "cond":"menor"
          },
          "tipo_dato":{ 
            "_id":"5d94fc0f50b8d44ebe2fce23",
            "nombre":"textarea",
            "tipo":"alfanumerico"
          },
          "restricciones":{ 
            "status":true,
            "msj":"valor minimo",
            "cond":"mayor",
            "value":0
          },
          
          "_id":"5d7fef77f460d00c872f76d7",
          "nombre":"Gramos de peso al nacer",
          "valores":null,
          "resultado":""
        },
        { 
          "alert":{ 
            "status":true,
            "msj":"Paciente con bajo peso al nacer",
            "value":2500,
            "cond":"menor"
          },
          "tipo_dato":{ 
            "_id":"5d94fc2050b8d44ebe2fce33",
            "nombre":"text",
            "tipo":"alfanumerico"
          },
          "restricciones":{ 
            "status":true,
            "msj":"valor minimo",
            "cond":"mayor",
            "value":0
          },
          "_id":"5d7fef77f460d00c872f76d7",
          "nombre":"Gramos de peso al nacer",
          "valores":null,
          "resultado":""
        },
        { 
          "alert":{ 
            "status":true,
            "msj":"Paciente con bajo peso al nacer",
            "value":2500,
            "cond":"menor"
          },
          "tipo_dato":{ 
            "_id":"5d94fc3550b8d44ebe2fce3c",
            "nombre":"texto",
            "tipo":"alfabetico"
          },
          "restricciones":{ 
            "status":true,
            "msj":"valor minimo",
            "cond":"mayor",
            "value":0
          },
          "_id":"5d7fef77f460d00c872f76d7",
          "nombre":"Gramos de peso al nacer",
          "valores":null,
          "resultado":""
        },
        { 
          "alert":{ 
            "status":true,
            "msj":"Paciente con bajo peso al nacer",
            "value":2500,
            "cond":"menor"
          },
          "tipo_dato":{ 
            "_id":"5d94fc7750b8d44ebe2fce4d",
            "nombre":"select",
            "tipo":"listado"
          },
          "restricciones":{ 
            "status":true,
            "msj":"valor minimo",
            "cond":"mayor",
            "value":0
          },
          "_id":"5d7fef77f460d00c872f76d7",
          "nombre":"Gramos de peso al nacer",
          "valores":["a",2,4,6,242,6453],
          "resultado":""
        },
        { 
          "alert":{ 
            "status":true,
            "msj":"Paciente con bajo peso al nacer",
            "value":2500,
            "cond":"menor"
          },
          "tipo_dato":{ 
            "_id":"5d94fc7750b8d44ebe2fce4d",
            "nombre":"selectmultiple",
            "tipo":"listadomultiple"
          },
          "restricciones":{ 
            "status":true,
            "msj":"valor minimo",
            "cond":"mayor",
            "value":0
          },
          "_id":"5d7fef77f460d00c872f7fg7",
          "nombre":"Gramos de peso al nacer",
          "valores":['a','b','c','d'],
          "resultado":""
        },
        
        { 
          "alert":{ 
            "status":true,
            "msj":"Paciente con bajo peso al nacer",
            "value":2500,
            "cond":"menor"
          },
          "tipo_dato":{ 
            "_id":"5d94fc7750b8d44ebe2fce4d",
            "nombre":"checktrue_selectmultiple",
            "tipo":"listadomultiple"
          },
          "restricciones":{ 
            "status":true,
            "msj":"valor minimo",
            "cond":"mayor",
            "value":0
          },
          "_id":"5d7fef77f460d00c872f7fg7",
          "nombre":"Gramos de peso al nacer",
          "valores":['a','b','c','d'],
          "resultado":""
        },
        
        {
          "alert":{ 
            "status":false,
            "msj":"",
            "value":0,
            "cond":""
          },
          "tipo_dato":{ 
            "_id":"5d94fc7750b8d44ebe2fce4d",
            "nombre":"checkmultiple",
            "tipo":"listadomultiple"
          },
          "restricciones":{ 
            "status":false,
            "msj":"",
            "cond":"",
            "value":0
          },
          "_id":"5d7fef77f460d00c872f7fg7",
          "nombre":"Gramos de peso al nacer",
          "valores":['a','b','c','d'],
          "resultado":""
        },
        { 
          "alert":{ 
            "status":true,
            "msj":"Paciente con bajo peso al nacer",
            "value":2500,
            "cond":"menor"
          },
          "tipo_dato":{ 
            "_id":"5d94fc8750b8d44ebe2fce52",
            "nombre":"radio",
            "tipo":"listado"
          },
          "restricciones":{ 
            "status":true,
            "msj":"valor minimo",
            "cond":"mayor",
            "value":0
          },
          "_id":"5d7fef77f460d00c872f76d7",
          "nombre":"Gramos de peso al nacer",
          "valores":['a','b','c'],
          "resultado":""
        },
        { 
          "alert":{ 
            "status":true,
            "msj":"Paciente con bajo peso al nacer",
            "value":2500,
            "cond":"menor"
          },
          "tipo_dato":{ 
            "_id":"5d94fc9950b8d44ebe2fce5c",
            "nombre":"check",
            "tipo":"boleano"
          },
          "restricciones":{ 
            "status":true,
            "msj":"valor minimo",
            "cond":"mayor",
            "value":0
          },
          "_id":"5d7fef77f460d00c872f76d7",
          "nombre":"Gramos de peso al nacer",
          "valores":null,
          "resultado":""
        },
        { 
          "alert":{ 
            "status":true,
            "msj":"Paciente con bajo peso al nacer",
            "value":2500,
            "cond":"menor"
          },
          "tipo_dato":{ 
            "_id":"5d94fcb650b8d44ebe2fce65",
            "nombre":"check_texto_true",
            "tipo":"boleanotruerespuesta"
          },
          "restricciones":{ 
            "status":true,
            "msj":"valor minimo",
            "cond":"mayor",
            "value":0
          },
          "_id":"5d7fef77f460d00c872f76d7",
          "nombre":"Gramos de peso al nacer",
          "valores":null,
          "resultado":""
        },
        { 
          "alert":{ 
            "status":true,
            "msj":"Paciente con bajo peso al nacer",
            "value":2500,
            "cond":"menor"
          },
          "tipo_dato":{ 
            "_id":"5d94fcd450b8d44ebe2fce70",
            "nombre":"check_texto_false",
            "tipo":"boleanofalserespuesta"
          },
          "restricciones":{ 
            "status":true,
            "msj":"valor minimo",
            "cond":"mayor",
            "value":0
          },
          "_id":"5d7fef77f460d00c872f76d7",
          "nombre":"Gramos de peso al nacer",
          "valores":null,
          "resultado":""
        },
        { 
          "alert":{ 
            "status":true,
            "msj":"Paciente con bajo peso al nacer",
            "value":2500,
            "cond":"menor"
          },
          "tipo_dato":{ 
            "_id":"5d94fd1150b8d44ebe2fce81",
            "nombre":"numero",
            "tipo":"numerico"
          },
          "restricciones":{ 
            "status":true,
            "msj":"valor minimo",
            "cond":"mayor",
            "value":0
          },
          "_id":"5d7fef77f460d00c872f76d7",
          "nombre":"Gramos de peso al nacer",
          "valores":null,
          "resultado":""
        },
        { 
          "alert":{ 
            "status":true,
            "msj":"Paciente con bajo peso al nacer",
            "value":2500,
            "cond":"menor"
          },
          "tipo_dato":{ 
            "_id":"5d94fd2950b8d44ebe2fce8a",
            "nombre":"numero_positivo",
            "tipo":"numerico_positivo"
          },
          "restricciones":{ 
            "status":true,
            "msj":"valor minimo",
            "cond":"mayor",
            "value":0
          },
          "_id":"5d7fef77f460d00c872f76d7",
          "nombre":"Gramos de peso al nacer",
          "valores":null,
          "resultado":""
        }
      ];
  }
}
</script>

