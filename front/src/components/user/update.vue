<template>
    <div>
        <formulario v-bind:form="form" @guardar="guardar"></formulario>
    </div>
</template>
<script>
import formulario from './form';
export default {
    components:{formulario},
    name: 'usuarios-update',
  	data () {
    	return {
            _id:'',
            form:
            {
                nombre_primero:'',
                nombre_segundo:'',
                apellido_primero:'',
                apellido_segundo:'',
                email:'',
                documento_typo_id:'',
                documento_numero:''
            },
        };
  	},
  	methods:{
		start()
		{
            let me = this;
            me._id = me.$route.params.id;
            me.updateData();
        },
        updateData()
        {
            let me = this;
			axios
			.post(API_HOST+'/users/find',{id:me._id},)
			.then(function(response)
			{
                if(response.data.validate)
                {
                    var value                   = response.data.data;
                    me.form.nombre_primero      = value.nombre_primero;
                    me.form.nombre_segundo      = value.nombre_segundo;
                    me.form.apellido_primero    = value.apellido_primero;
                    me.form.apellido_segundo    = value.apellido_segundo;
                    me.form.documento_typo_id   = value.id_documentoType;
                    me.form.documento_numero    = value.documento_numero;
                    me.form.email               = value.email;
                    me.form._id                 = me._id;
                }
                else{
                    alert('error');
                }
			})
        },
        guardar(form)
        {
            let me = this;
			axios
			.post(API_HOST+'/users/update',form)
			.then(function(response)
			{
                me.$swal('Actualizado con exito');
                me.$router.push({ name: 'users_index' });
			})
        }
    },
    mounted:function(){
        this.$parent._data.template='back'
        this.start()
    }

}
</script>