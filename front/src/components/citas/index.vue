<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 alert alert-info">
                Sus datos son tratados según la ley Ley 1266 de 2008 administración de datos personales.
            </div>
        </div>
        <div class="row">
            <router-link :to="{ name: 'cita_create'}" class="btn btn-success"><i class="fas fa-plus"></i> Nuevo</router-link>
        </div>
        <form @submit.prevent="paginar(1)">
            <div class="row">
                <div class="col-md-4">
                    <label for="">Especialista</label>
                    <select name="" id="" v-model="form.especialista" class="form form-control">
                        <option value="">Todos</option>
                        <option v-for="(data, index) in especialistasArray" :key="index" :value="data.id">{{data.nombre_primero}} {{data.apellido_primero}}</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="">Documento paciente</label>
                    <input type="text" class="form form-control" v-model="form.pacienteDocumento">
                </div>
                <div class="col-md-4">
                    <label for="">Fecha</label>
                    <input type="text" class="form form-control" id="citaFecha" name="citaFecha" v-model="form.citaFecha">
                </div>
                <div class="col-md-4">
                    <br>
                    <button class="btn btn-success">Filtrar</button>
                </div>
            </div>
        </form>
        <br>
        <div class="row">
            <div class="col-md">
                <table style="background-color:#FFF" class="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Opciones</th>
                            <th>Paciente</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Especialista</th>
                            <th>Estado</th>
                            <th>EPS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(citas, index) in arrayCitas.docs" :key="index">
                            <td>
                                {{(index+1)+(10*((arrayCitas.page)-1))}}
                            </td>
                            <td>
                                <div>
                                    <b-dropdown id="dropdown-1" text="Opciones" class="m-md-2">
                                        <b-dropdown-item>
                                            <router-link class="btn btn-succes" :to="{ name: 'cita_edit', params: { id: citas.id }}">Editar</router-link>
                                        </b-dropdown-item>
                                        <b-dropdown-item><button class="btn btn-succes" @click="eliminar(citas.id)">Eliminar</button></b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </td>
                            <td>
                                {{citas.coll_patient | nombres}}
                            </td>
                            <td>{{citas.fecha | dateFormat}}</td>
                            <td>{{citas.hora}}</td>
                            <td>
                                <template v-if="citas.coll_especialistum != null">
                                    {{citas.coll_especialistum.nombre_primero}}
                                    {{citas.coll_especialistum.apellido_primero}}
                                </template>
                            </td>
                            <td>
                                <span class="badge" v-if="citas.coll_citas_estado" :style="'background-color:'+citas.coll_citas_estado.color">
                                    {{citas.coll_citas_estado.name}}
                                </span>
                            </td>
                            <td>
                                <span v-if="citas.coll_ep != null">{{citas.coll_ep.name}}</span>
                                <span v-else class="badge badge-success">Particular</span>
                            </td>
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
                        <li class="page-item"><a class="page-link" @click="paginar(pagination.page - 1)">Anterior</a></li>
                        <template v-for="(paginate, index) in pagination.pages">
                            <li :key="index" v-if="(pagination.page < paginate + 5) && (pagination.page > paginate - 5)" class="page-item" :class="pagination.page == paginate ? 'active' : ''">
                                <a class="page-link" @click="paginar(paginate)">{{paginate}}</a>
                            </li>
                        </template>
                        <li class="page-item"><a class="page-link" @click="paginar(pagination.page + 1)">Siguiente</a></li>
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
    components: { BootstrapVue },
    filters: {
        dateFormat: function (value) {
            let fechas = '';
            if (value != null) {
                try {
                    var fecha = value.split("T");
                    fechas = fecha[0];
                } catch (error) {
                    console.warn({ error: error })
                }
            }
            return fechas;
        },
        nombres: function (citas) {
            let nombre = '';
            try { nombre = nombre + ' ' + citas.nombre_primero; } catch (error) { }
            try { nombre = nombre + ' ' + citas.nombre_segundo; } catch (error) { }
            try { nombre = nombre + ' ' + citas.apellido_primero; } catch (error) { }
            try { nombre = nombre + ' ' + citas.apellido_segundo; } catch (error) { }
            return nombre;
        }
    },
    data() {
        return {
            especialistasArray: [],
            form: {
                especialista: '',
                pacienteDocumento: '',
                citaFecha: ''
            },
            arrayCitas: [],
            pagination: {
                limit: 0,
                page: 0,
                pages: 0,
                total: 0
            }
        }
    },
    computed: {
        dataStatus() {
            return this.$parent._data.actualizacion;
        }
    },
    watch: {
        dataStatus() {
            this.paginar(1);
        }
    },
    methods: {
        start() {
            this.paginar(1);
            let me = this;
            $('#citaFecha').datepicker({
                onSelect: function (dateText, inst) {
                    me.form.citaFecha = $(this).val();
                },
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true
            });
            me.loadEspecialistas();
        },
        loadEspecialistas() {
            let me = this;
            axios
                .get(API_HOST + '/especialista')
                .then(function (response) {
                    me.especialistasArray = response.data.data;
                });
        },
        eliminar(id) {
            let me = this;
            me.$swal({
                title: 'Va a eliminar este registro',
                text: "¿Desea continuar?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!'
            }).then((result) => {
                axios
                    .post(API_HOST + '/cita/delete', { id: id })
                    .then(function (response) {
                        me.$swal("Se ha eliminado con exito.");
                        me.paginar(me.pagination.page);
                    })
            })
        },
        paginar(pag) {
            let me = this;
            if (pag > me.pagination.pages) {
                pag = me.pagination.pages;
            }
            if (pag < 1) {
                pag = 1;
            }
            let temp = me.form;
            temp.pag = pag;
            axios
                .post(API_HOST + '/cita/all', temp)
                .then(function (response) {
                    console.log(response.data.data);

                    let value = response.data.data;
                    me.arrayCitas = response.data.data;
                    me.pagination.limit = value.limit;
                    me.pagination.page = value.page;
                    me.pagination.pages = value.pages;
                    me.pagination.total = value.total;
                })
        }
    },
    mounted: function () {
        this.$parent._data.template = 'back'
        this.start();
    }
}
</script>

<style>

</style>
