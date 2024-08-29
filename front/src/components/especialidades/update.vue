<template>
    <div>
        <formulario v-bind:form="form" @guardar="guardar"></formulario>
    </div>
</template>
<script>
import formulario from './form';
export default {
    components:{formulario},
    name: 'especialistas-create',
  	data () {
    	return {
            _id:'',
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
            me._id = me.$route.params.id;
            me.updateData();
        },
        updateData()
        {
            let me = this;
			axios
			.post(API_HOST+'/specialties/find',{id:me._id},)
			.then(function(response)
			{
                if(response.data.validate)
                {
                    var value           = response.data.data;
                    me.form.name        = value.name;
                    me.form.description = value.description;
                    me.form._id         = me._id;
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
			.post(API_HOST+'/specialties/update',form)
			.then(function(response)
			{
                me.$swal('Actualizado con exito');
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