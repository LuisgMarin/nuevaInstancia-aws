<template>
  <div class="container-fluid">
	  <div class="row">
		  <div class="col-md">
				<table v-if="arraySugerencia.length>0" style="background-color:#FFF" class="table table-hover">
					<thead>
						<tr>
							<th>Opciones</th>
							<th>sugerencia</th>
							<th>Fecha</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(sugerencias,index) in arraySugerencia" :key="index">
							<td>
								<div>
                                    <router-link class="btn btn-success" :to="{ name: 'sugerencias_show', params: { id: sugerencias.id }}">
                                        Ver mas
                                    </router-link>
                        		</div>
							</td>
							<td>
								{{sugerencias.description|RecortarTexto}}
							</td>
							<td>{{sugerencias.fecha|dateFormat}}</td>
						</tr>
					</tbody>
				</table>
			</div>
  		</div>
		<div class="row">
		  <div class="col-md">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" @click="paginar(1)"><i class="fas fa-step-backward"></i></a></li>
                        <li class="page-item"><a class="page-link" @click="paginar(pagination.page-1)">Anterior</a></li>
                        <li v-for="(paginate,index) in pagination.pages" :key="index" v-if="(pagination.page<paginate+5) && (pagination.page>paginate-5)" class="page-item" :class="pagination.page==paginate?'active':''"><a class="page-link" @click="paginar(paginate)">{{paginate}}</a></li>
                        <li class="page-item"><a class="page-link" @click="paginar(pagination.page+1)">Siguiente</a></li>
                        <li class="page-item"><a class="page-link" @click="paginar(pagination.pages)"><i class="fas fa-step-forward"></i></a></li>
                    </ul>
                </nav>
            </div>
		</div>
  </div>
</template>

<script>
import BootstrapVue from 'bootstrap-vue'
export default {
	components:{BootstrapVue},
	filters: 
	{
        RecortarTexto:function(text)
        {
            var res='';
            if(text.length>20)
            {
                res=text.slice(0, 20)+'...';
            }
            else{
                res=text;
            }
            return res;
        },
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
			arraySugerencia:[],
			pagination:{
                limit: 0,
                page: 0,
                pages: 0,
                total: 0
            }
        }
    },
    methods:{
        start()
        {
            this.paginar(1);
		},
        paginar(pag)
        {
			let me = this;
			if(pag>me.pagination.pages)
            {
                pag=me.pagination.pages;
            }
            if(pag<1)
            {
                pag=1;
            }
            axios
			.post(API_HOST+'/sugerencias',{pag:pag})
			.then(function(response)
			{
                let value           = response.data.data;
                me.arraySugerencia  = value.docs;
                me.pagination.limit = value.limit;
                me.pagination.page  = value.page;
                me.pagination.pages = value.pages;
                me.pagination.total = value.total;  
			})
        }
    },
	mounted:function()
	{
		this.$parent._data.template='back'
    	this.start();
  	}
}
</script>

<style>

</style>