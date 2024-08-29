<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md">
                    <label>Primer nombre</label>
                    <input v-model="forms.nombre_primero" type="text" class="form-control">
                </div>
                <div class="col-md">
                    <label>Segundo nombre</label>
                    <input v-model="forms.nombre_segundo" type="text" class="form-control">
                </div>
            </div>
            <div class="row">
                <div class="col-md">
                    <label>Primer apellido</label>
                    <input v-model="forms.apellido_primero" type="text" class="form-control">
                </div>
                <div class="col-md">
                    <label>Segundo apellido</label>
                    <input v-model="forms.apellido_segundo" type="text" class="form-control">
                </div>
            </div>
            <div class="row">
                <div class="col-md">
                    <label>Tipo de documento</label>
                    <select v-model="forms.documento_typo_id" type="text" class="form-control">
                        <option style="display:none" value="">Seleccione</option>
                        <option v-for="(DocumentoTipo,index) in arrayDocumentoTipo" :value="DocumentoTipo.id" :key="index">{{DocumentoTipo.name}}</option>
                    </select>
                </div>
                <div class="col-md">
                    <label>Documento</label>
                    <input v-model="forms.documento_numero" type="text" class="form-control">
                </div>
                <div class="col-md">
                    <label>Email</label>
                    <input v-model="forms.email" type="email" class="form-control">
                </div>
            </div>
            <div class="row">
                <div class="col-md">
                    <br>
                    <button class="btn btn-success" :disabled="disabled" @click="guardar()">Guardar</button>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    name: 'usuarios-form',
    props:['form'],
	data () {
        return {
            disabled:false,
            forms:
            {
                nombre_primero:'',
                nombre_segundo:'',
                apellido_primero:'',
                apellido_segundo:'',
                email:'',
                documento_typo_id:'',
                documento_numero:''
            },
            arrayDocumentoTipo:[]
        };
  	},
  	methods:{
		start()
		{
            let me = this;
            this.documentoTipo();
            this.formulario();
        },
        formulario()
        {
            let me = this;
            if (typeof me.form !== "undefined")
            {
                me.forms = me.form;
            }
        },
        guardar()
        {
            let me = this;
            //me.disabled=true;
            me.$emit('guardar',me.forms);	
        },
        documentoTipo()
        {
            let me = this;
			axios
			.get(API_HOST+'/documentsTypes')
			.then(function(response)
			{
				me.arrayDocumentoTipo = response.data.data;
			})
        },
    },
    mounted:function(){
        this.$parent._data.template='back'
        this.start()
    }

}
</script>