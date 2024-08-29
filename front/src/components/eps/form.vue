<template>
    <div>
        <div class="container-fluid">
            <form @submit.prevent="guardar">
                <div class="row">
                    <div class="col-md">
                        <label>Nombre</label>
                        <input v-model="forms.name" type="text" class="form-control">
                    </div>
                    <div class="col-md">
                        <label>Descripcion</label>
                        <input v-model="forms.description" type="text" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md">
                        <br>
                        <button class="btn btn-success">Guardar</button>
                    </div>
                </div>
            </form>

        </div>
    </div>
</template>
<script>
export default {
    name: 'especialistas-form',
    props:['form'],
	data () {
        return {
            disabled:false,
            forms:
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
            me.disabled=true;
            me.$emit('guardar',me.forms);	
        }
    },
    mounted:function(){
        this.$parent._data.template='back'
        this.start()
    }

}
</script>