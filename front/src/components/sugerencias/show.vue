<template>
	<div>
        <h5 align="center">Sugerencia enviada el {{msj.fecha|dateFormat}}</h5>
		{{msj.description}}
	</div>
</template>
<script>
export default{
    filters:
    {
        dateFormat: function (value) 
		{
			let fechas ='';
			if(value!=null)
			{
				try {
					var fecha = value.split("T");
					fechas=fecha[0];
				} catch (error) {
					console.warn({error:error})
				}
			}
			return fechas;
		}
    },
  	data () {
    	return {
			msj:''
    	}
  	},
  	methods:{
		start()
		{
			let me = this;
			axios
			.post(API_HOST+'/sugerencias/find',{_id : me.$route.params.id})
			.then(function(response)
			{
				me.msj=response.data.data;
			})
		}
  	},
	mounted:function()
	{
		this.start();
		let me = this;
		this.$parent._data.template='back'
  	}
}
</script>
<style>