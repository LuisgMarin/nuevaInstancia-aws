<template>
    <div>
        <formulario @guardar="guardar"></formulario>
    </div>
</template>
<script>
import formulario from './form';
export default {
    components:{formulario},
    name: 'especialistas-create',
  	data () {
    	return {
            form:
            {
                name:'',
                description:''
            }
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
			.post(API_HOST+'/specialties/save',form)
			.then(function(response)
			{
                me.$swal('Creado con exito');
                me.$router.push({ name: 'especialidades_index' });
			})
        }
    },
    mounted:function(){
        this.$parent._data.template='back'
        this.start()
    }

}
</script>