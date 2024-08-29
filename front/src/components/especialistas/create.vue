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
  	methods:{
		start()
		{
            let me = this;
        },
        guardar(form)
        {
            let me = this;
			axios
			.post(API_HOST+'/especialista/save',form)
			.then(function(response)
			{
                me.arrayEspecialidad = response.data.data;
                me.$swal('Creado con exito');
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