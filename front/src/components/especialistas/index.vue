<template>
    <div>
        <div class="row">
		    <router-link :to="{ name: 'especialistas_create'}" class="btn btn-success"><i class="fas fa-plus"></i> Nuevo</router-link>
      </div>
	  <div class="row">
        <table class="table">
            <thead>
                <tr>
                    <th>Opciones</th>
                    <th>Especialista</th>
                    <th>Documento</th>
                    <th>Especialidad</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(Especialistas,index) in arrayEspecialistas" :key="index">
                    <td>
                        <b-dropdown id="dropdown-1" text="Opciones" class="m-md-2">
                            <b-dropdown-item :to="{ name: 'especialistas_load', params: { id: Especialistas.id }}">
                                <i class="far fa-edit"></i>
                                Editar
                            </b-dropdown-item>
                            <b-dropdown-item :to="{ name: 'horario_index', params: { id: Especialistas.id }}">
                                <i class="far fa-calendar-alt"></i>
                                Horario
                            </b-dropdown-item>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item @click="eliminar(Especialistas.id)">
                                <i class="far fa-trash-alt"></i>
                                Eliminar
                            </b-dropdown-item>
                        </b-dropdown>
                    </td>
                    <td>
                        {{Especialistas.nombre_primero}}
                        {{Especialistas.nombre_segundo}}
                        {{Especialistas.apellido_primero}}
                        {{Especialistas.apellido_segundo}}
                    </td>
                    <td>
                        {{Especialistas.documento_numero}}
                    </td>
                    <td>
                        {{Especialistas.coll_specialtie.name}}
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
    name: 'especialistas-create',
  	data () {
    	return {
            arrayEspecialistas:[]
        };
  	},
  	methods:{
		start()
		{
            let me = this;
            me.index();
        },
        eliminar(_id,nombre)
        {
            let me = this;
            me.$swal({
            title: '¿Desea eliminar?',
            text: "Va a eliminar al especialista "+nombre+". ¿Desea continuar?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
            }).then((result) => 
            {
                if(typeof result.value != 'undefined')
                {
                    axios
                    .post(API_HOST+'/especialista/delete',{_id:_id})
                    .then(function(response)
                    {
                        me.$swal("Se ha eliminado con exito.");
                        me.index();
                    })
                }
            })
        },
        index()
        {
            let me = this;
			axios
			.get(API_HOST+'/especialista/')
			.then(function(response)
			{
                me.arrayEspecialistas=response.data.data;
            })
        }

    },
    mounted:function(){
        this.$parent._data.template='back'
        this.start()
    }

}
</script>