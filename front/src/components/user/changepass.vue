<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md">
                <label>Usuario</label>
                <input type="text" v-model="form.user" class="form-control">
            </div>
            <div class="col-md">
                <label>Contrase&#241;a actual</label>
                <input type="text" v-model="form.passold" class="form-control">
            </div>
        </div>
        <div class="row">
            <div class="col-md">
                <label>Contrase&#241;a nueva</label>
                <input type="text" v-model="form.passNew1" class="form-control">
            </div>
            <div class="col-md">
                <label>Repita la contrase&#241;a</label>
                <input type="text" v-model="form.passNew2" class="form-control">
            </div>
        </div>
        <div class="row">
            <div class="col-md">
                <br>
                <button @click="cambiar" class="btn btn-success">Cambiar contrase&#241;a</button>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'especialistas-create',
  	data () {
    	return {
            form:
            {
                user:'',
                passold:'',
                passNew1:'',
                passNew2:''

            }
        };
  	},
  	methods:{
		start()
		{
            let me = this;
        },
        cambiar()
        {
            let me = this;
            let user = JSON.parse(localStorage.getItem('user'));
            if(user.email==me.form.user)
            {
                if(me.form.passNew1==me.form.passNew2)
                {
                    axios
                    .post(API_HOST+'/auth/changePass',
                        {
                            user:       me.form.user,
                            passold:    me.form.passold,
                            passNew1:   me.form.passNew1,
                            passNew2:   me.form.passNew2,
                            local:      localStorage
                        }
                    )
                    .then(function(response)
                    {
                        if(response.data.validate)
                        {
                            me.$swal('Actualizado con exito');
                        }
                        else
                        {                            
                            me.$swal({text:'Error al actualizar su contrase&#241;a',type:'warning'});
                        }
                    })
                }
                else
                {
                    me.$swal({text:'Error al actualizar su contrase&#241;a',type:'warning'});
                }
            }

        }
    },
    mounted:function(){
        this.$parent._data.template='back'
        this.start()
    }

}
</script>