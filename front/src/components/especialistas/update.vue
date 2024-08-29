<template>
    <div>
        <formulario v-if="visible" v-bind:form="form" @guardar="guardar"></formulario>
    </div>
</template>
<script>
import formulario from './form';
export default {
    components:{formulario},
    name: 'especialistas-create',
  	data () {
    	return {
            visible:false,
            id:'',
            form:
            {
                nombre_primero:'',
                nombre_segundo:'',
                apellido_primero:'',
                apellido_segundo:'',
                documento_typo_id:'',
                documento_numero:'',
                especialidad_id:''
            }
        };
  	},
  	methods:{
		start()
		{
            let me = this;
            me.id = me.$route.params.id;
            me.updateData();
        },
        updateData()
        {
            let me = this;
			axios
			.post(API_HOST+'/especialista/find',{id:me.id},)
			.then(function(response)
			{
                if(response.data.validate)
                {
                    var value                   = response.data.data;
                    me.form.nombre_primero      = value.nombre_primero;
                    me.form.nombre_segundo      = value.nombre_segundo;
                    me.form.apellido_primero    = value.apellido_primero;
                    me.form.apellido_segundo    = value.apellido_segundo;
                    me.form.documento_numero    = value.documento_numero;
                    me.form.documento_typo_id   = `${value.id_documento_tipo}`,
                    me.form.especialidad_id     = `${value.id_especialidad_tipo}`;
                    me.form.id                  = me.id;
                    console.log(me.form);
                }
                else{
                    alert('error');
                }
                me.visible=true;
			})
        },
        guardar(form)
        {
            let me = this;
			axios
			.post(API_HOST+'/especialista/update',form)
			.then(function(response)
			{
                me.arrayEspecialidad = response.data.data;
                me.$swal('Actualizado con exito');
                me.$router.push({ name: 'especialistas_index' });
			})
        }
    },
    mounted:function(){
        this.$parent._data.template='back'
        this.start()
    }

}
</script>