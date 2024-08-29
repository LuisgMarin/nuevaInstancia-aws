<template>

 <div id="login">
        <h3 class="text-center text-white pt-5">Sistema de citas</h3>
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <h3 class="text-center text-info">Login</h3>
                        <div class="form-group">
                            <label for="username" class="text-info">Correo:</label><br>
                            <input @keyup.enter="loguearse()" type="text" v-model="form.email" name="username" id="username" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="password" class="text-info">contrase&#241;a:</label><br>
                            <input @keyup.enter="loguearse()" type="password" v-model="form.password" name="password" id="password" class="form-control">
                        </div>
                        <div class="form-group">
                            <button @click="loguearse()" name="submit" class="btn btn-info btn-md">Iniciar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data ()
    {
        return {
            respuesta:'',
            form:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        loguearse()
        {
            let me = this;
			axios
			.post(API_HOST+'/auth/login',me.form)
			.then(function(response)
			{
                me.respuesta=response.data;
                if(me.respuesta.validate)
                {
                    localStorage.setItem('user',JSON.stringify(response.data.user));
                    localStorage.setItem('jwt',response.data.token);
                    if (localStorage.getItem('jwt') != null){
                        //me.$router.push({ name: 'cita_index' });
                        window.location="/cita/index";
                    }
                }
                else
                {
                    me.$swal('Error, no se puede iniciar session');
                }
			})
        }
    },
    mounted:function()
    {
        this.$parent._data.template='login'
    }
}
</script>

<style>
#login {
  margin: 0;
  padding: 0;
  background-color: #17a2b8;
  height: 100vh;
}
#login .container #login-row #login-column #login-box {
  margin-top: 120px;
  max-width: 600px;
  height: 320px;
  border: 1px solid #9C9C9C;
  background-color: #EAEAEA;
}
#login .container #login-row #login-column #login-box #login-form {
  padding: 20px;
}
#login .container #login-row #login-column #login-box #login-form #register-link {
  margin-top: -85px;
}
</style>