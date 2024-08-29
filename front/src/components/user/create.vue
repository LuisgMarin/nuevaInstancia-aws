<template>
    <div>
        <formulario @guardar="guardar"></formulario>
    </div>
</template>
<script>
import formulario from './form';
export default {
    components:{formulario},
    name: 'usuarios-create',
  	data () {
    	return {
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
        };
  	},
  	methods:{
		start()
		{
            let me = this;
        },
        guardar(form)
        {
            let me = this;
			axios
			.post(API_HOST+'/users/save',form)
			.then(function(response)
			{
                me.arrayEspecialidad = response.data.data;
                me.$swal('Creado con exito');
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