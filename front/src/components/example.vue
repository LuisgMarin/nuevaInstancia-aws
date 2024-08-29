<template>
  <div>
    ==============================================================================================================
    <div v-for="(dat,index) in datas" :key="index">
        <inputform v-model="form[index].resultado" v-bind:clase="'form-control'" v-bind:values="dat"></inputform>
      <pre>[{{form[index]}}]</pre>
      ==============================================================================================================
    </div>
  </div>
</template>
<script>
import inputform from './input';
export default {
  name: 'example',
  data () {
    return {
      datas:[],
      form:[]
    }
  },
  components:{inputform},
  methods:{
    start(){
      let me =this;
      me.datas =
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
      ]
      for(var i=0;i<me.datas.length;i++)
      {
        me.form[i]=me.datas[i];
      }
    }
  },
  mounted:function(){
    this.start();
  }
}
</script>

