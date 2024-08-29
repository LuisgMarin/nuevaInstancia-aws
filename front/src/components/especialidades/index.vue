<template>
    <div>
                	  <div class="row">
		  <router-link :to="{ name: 'especialidades_create'}" class="btn btn-success"><i class="fas fa-plus"></i> Nuevo</router-link>
	  </div>
	  <div class="row">
        <table class="table">
            <thead>
                <tr>
                    <th>Opciones</th>
                    <th>nombre</th>
                    <th>Descripcion</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="(Especialidades,index) in arrayEspecialidades" :key="index">
                    <td>
                        <div>
                            <b-dropdown id="dropdown-1" text="Opciones" class="m-md-2">
                                <b-dropdown-item :to="{ name: 'especialidades_load', params: { id: Especialidades.id }}">
                                        Editar
                                </b-dropdown-item>
                                <b-dropdown-item>Eliminar</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </td>
                    <td>
                        {{Especialidades.name}}
                    </td>
                    <td>
                        {{Especialidades.description}}
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
    name: 'especialidades-create',
  	data () {
    	return {
            arrayEspecialidades:[]
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
			.get(API_HOST+'/specialties/')
			.then(function(response)
			{
                me.arrayEspecialidades=response.data.data;
			})
        }
    },
    mounted:function(){
        this.$parent._data.template='back'
        this.start()
    }

}
</script>