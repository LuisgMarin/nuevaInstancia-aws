<template>
    <div>
        <div class="row">
            <router-link :to="{ name: 'patient_create'}" class="btn btn-success"><i class="fas fa-plus"></i> Nuevo</router-link>
        </div>
        <div class="row">
            <label>Importar</label>
            <input type="file" @change="CargarPacientes" name="myfile" :disabled="arrayInsert.visible">
        </div>
        <div class="row">
            <div class="alert alert-warning" role="alert" v-if="arrayInsert.visible">
                subiendo <strong>{{arrayInsert.inc}}</strong> de <strong>{{arrayInsert.total}}</strong> pacientes
            </div>
        </div>
        <div class="row">
            <div class="col-md">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Opciones</th>
                            <th>Nombres y apellidos</th>
                            <th>Documento</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(patients,index) in arrayPatient" :key="index">
                            <td>
                                <div>
                                    <b-dropdown id="dropdown-1" text="Opciones" class="m-md-2">
                                        <b-dropdown-item :to="{ name: 'patient_edit', params: { id: patients.id }}">
                                            Editar
                                        </b-dropdown-item>
                                        <b-dropdown-item @click="eliminar(patients.id)" >Eliminar</b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </td>
                            <td>
                                {{patients.nombre_primero}}
                                {{patients.nombre_segundo}}
                                {{patients.apellido_primero}}
                                {{patients.apellido_segundo}}
                            </td>
                            <td>
                                {{patients.documento}}
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
                        <li class="page-item"><a class="page-link" @click="paginar(pagination.page-1)">Anterior</a></li>
                        <li v-for="(paginate,index) in pagination.pages" :key="index" v-if="(pagination.page<paginate+5) && (pagination.page>paginate-5)" class="page-item" :class="pagination.page==paginate?'active':''"><a class="page-link" @click="paginar(paginate)">{{paginate}}</a></li>
                        <li class="page-item"><a class="page-link" @click="paginar(pagination.page+1)">Siguiente</a></li>
                        <li class="page-item"><a class="page-link" @click="paginar(pagination.pages)"><i class="fas fa-step-forward"></i></a></li>
                    </ul>
                </nav>
            </div>
        </div>
        <div class="row">
            <div class="col-md">
                Mostrando {{pagination.limit}} de {{pagination.total}} pacientes registrados
            </div>
        </div>
    </div>
</template>

<script>
import formulario from './form';

export default {
    components:{formulario},
    name: 'usuarios-create',
    filters:
    {
        dateFormat: function (value)
        {
            var res = value.split("T");
            return res[0];
        }
    },
    data () {
        return {
            arrayPatient:[],
            arrayInsert:{
                total:0,
                inc:0,
                visible:false
            },
            pagination:{
                limit: 0,
                page: 0,
                pages: 0,
                total: 0
            }
        };
    },
    methods:{
        start()
        {
            let me = this;
            me.paginar(1);
        },
        CargarPacientes(event)
        {
            let me = this;
            var input = event.target;
            var reader = new FileReader();
            let jsonObj =Object;
            reader.onload = function(){
                var fileData = reader.result;
                var wb = XLSX.read(fileData, {type : 'binary'});

                wb.SheetNames.forEach(function(sheetName){
                var rowObj =XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                jsonObj = JSON.parse(JSON.stringify(rowObj));
                me.insertData(jsonObj)
                })
            };
            reader.readAsBinaryString(input.files[0]);
        },
        insertData(data)
        {
            let me = this;
            let validate = true;
            let fecha_nacimiento = '';
            me.arrayInsert.total=data.length;
            me.arrayInsert.visible=true;
            me.$swal({
            title: 'Se va a hacer una carga masiva',
            text: "Este proceso puede demorar. Se van a subir "+me.arrayInsert.total+ " registros. Desea continuar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, subir!'
            }).then((result) =>
            {
                if (result.value)
                {
                    let errorFecha = false;
                    var resultadoFinal=[]
                    $.each(data,async function(index,value)
                    {
                        if(validate)
                        {
                            let fecha_nacimiento1 = value.birthdate.split('/');
                            if(fecha_nacimiento1[2]<1000)
                            {
                                validate=false;
                                errorFecha = true;
                                fecha_nacimiento = fecha_nacimiento1;
                            }
                            else
                            {
                                fecha_nacimiento1=fecha_nacimiento1[2]+'-'+fecha_nacimiento1[1]+'-'+fecha_nacimiento1[0];
                                var resultado={
                                    documento: value.number_de_document,
                                    nombre_primero: value.name1,
                                    nombre_segundo: value.name2,
                                    apellido_primero: value.surnames1,
                                    apellido_segundo: value.surnames2,
                                    fecha_nacimiento: fecha_nacimiento1,
                                    email: null,
                                    numero_contacto: value.telephone,
                                    pais: 'Colombia',
                                    ciudad: value.municipality,
                                    documento_typo_id:null
                                }
                                resultadoFinal.push(resultado);
                                me.arrayInsert.inc=me.arrayInsert.inc+1
                            }
                        }
                    })
                    if(validate)
                    {
                        me.guardarMany(resultadoFinal);
                    }
                    else{
                        me.$swal(
                          "Error. Por favor revise el excel en la linea "
                          + me.arrayInsert.inc + "."
                          + (
                            errorFecha
                            ? ' La fecha " ' + fecha_nacimiento + ' " no concuerda(DD/MM/AAAA).'
                            : '')
                          );
                    }
                }
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
                .post(API_HOST+'/patient/delete',{_id:_id})
                .then(function(response)
                {
                    me.$swal("Se ha eliminado con exito.");
                    me.paginar(me.pagination.page);
                })
            })
        },
        async guardarMany(form)
        {
            let me = this;
            await axios
            .post(API_HOST+'/patient/saveMany',form)
            .then(function(response)
            {
                me.paginar(1);
            });
        },
        async guardar(form)
        {
            let me = this;
            await axios
            .post(API_HOST+'/patient/save',form)
            .then(function(response)
            {
            });
            return me.arrayInsert.inc+1;
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
            .post(API_HOST+'/patient/',{pag:pag})
            .then(function(response)
            {
                let value           = response.data.data;
                me.arrayPatient     = value.docs;
                me.pagination.limit = value.limit;
                me.pagination.page  = value.page;
                me.pagination.pages = value.pages;
                me.pagination.total = value.total;
            }).
            catch(function(e){
                console.warn({Error:e});
            })
        }
    },
    mounted:function(){
        this.$parent._data.template='back'
        this.start();
    }
}
</script>

<style scoped>
.table td.text-white {
    color: white;
}
</style>
