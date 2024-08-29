<template>
    <div>
        <div class="row">
		    <router-link :to="{ name: 'users_create'}" class="btn btn-success"><i class="fas fa-plus"></i> Nuevo</router-link>
      </div>
	  <div class="row">
        <table class="table">
            <thead>
                <tr>
                    <th>Opciones</th>
                    <th>Usuario</th>
                    <th>Documento</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(users,index) in arrayUsuarios" :key="index">
                    <td>
                        <div>
                            <b-dropdown id="dropdown-1" text="Opciones" class="m-md-2">
                                <b-dropdown-item :to="{ name: 'users_edit', params: { id: users.id }}">
                                        Editar
                                </b-dropdown-item>
                                <b-dropdown-item @click="eliminar(users.id)">Eliminar</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </td>
                    <td>
                        {{users.nombre_primero}}
                        {{users.nombre_segundo}}
                        {{users.apellido_primero}}
                        {{users.apellido_segundo}}
                    </td>
                    <td>
                        {{users.documento_numero}}
                    </td>
                    <td>
                        {{users.email}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</template>
<script>
import formulario from './form';
export default {
    components:{formulario},
    name: 'usuarios-create',
  	data () {
    	return {
            arrayUsuarios:[]
        };
  	},
  	methods:{
		start()
		{
            let me = this;
            me.index();
        },
        index()
        {
            let me = this;
			axios
			.get(API_HOST+'/users/')
			.then(function(response)
			{
                me.arrayUsuarios=response.data.data;
			})
        },
        eliminar(_id)
        {
            let me = this;
            me.$swal({
            title: 'Va a eliminar este registro',
            text: "¿Desea continuar?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
            }).then((result) => 
            {
                axios
                .post(API_HOST+'/users/delete',{_id:_id})
                .then(function(response)
                {
                    me.$swal("Se ha eliminado con exito.");
                    me.index();
                })
            })
        }
        
    },
    mounted:function(){
        this.$parent._data.template='back'
        this.start()
    }

}
</script>