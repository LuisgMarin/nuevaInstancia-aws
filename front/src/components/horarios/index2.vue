<template>
    <div>
        <form @submit.prevent="guardar">
            <div class="row">
                <div class="col-md-2">
                    <label for="">hora de inicio</label><br>
                    <vue-timepicker format="hh:mm A" v-model="form.hora_inicio" :required="true"></vue-timepicker>
                    <span class="badge badge-danger" v-if="!validate_inicio">Registre la hora correctamente</span>
                </div>
                <div class="col-md-2">
                    <label for="">hora de fin</label><br>
                    <vue-timepicker format="hh:mm A" v-model="form.hora_fin" :required="true"></vue-timepicker>
                    <span class="badge badge-danger" v-if="!validate_fin">Registre la hora correctamente</span>
                </div>
                <div class="col-md-3">
                    <label for="tiempo">Tiempo</label>
                    <select v-model="form.tiempo" name="tiempo" id="tiempo" class="form form-control">
                        <option value="">Seleccione</option>
                        <option value="15">15 minutos</option>
                        <option value="20">20 minutos</option>
                    </select>
                </div>
                <div class="col-md-5">
                    <label for="dia">Fecha</label>
                    <input v-model="form.dia" name="dia" id="dia" class="form form-control" required>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <br>
                    <button class="btn btn-success">Guardar</button>
                    <br>
                    <br>
                </div>
            </div>
        </form>
        <div>
            <table border="1" class="table-striped" style="width:100%">
                <thead>
                    <tr>
                        <th style="text-align:center">Opciones</th>
                        <th style="text-align:center">Dia</th>
                        <th style="text-align:center">Hora de inicio</th>
                        <th style="text-align:center">Hora de fin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(hor,index) in horario" :key="index">
                        <td>
                            <button class="btn btn-danger" @click="eliminar(hor.id)"><i class="fas fa-trash-alt"></i></button>
                        </td>
                        <td>{{hor.fecha}}</td>
                        <td>{{hor.hora_inicio | formatHour}}</td>
                        <td>{{hor.hora_fin | formatHour}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import VueTimepicker from 'vuejs-timepicker'
export default {
    components: { VueTimepicker },
    filters:{
        formatHour(value)
        {
            /*var date = new Date('2000-01-01 '+value);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = (minutes < 10 ? '0' :'')+ minutes;
            var strTime = (hours<10?'0':'') + hours + ':' + minutes + ' ' + ampm;
            return strTime;*/
            let [hora, minuto, segundo] = value.split(':');
            let formato12 = '';
            if (hora < 12) {
                formato12 = (hora === '00' ? '12' : hora.padStart(2, '0')) + ':' + minuto + ' AM';
            } else {
                formato12 = (hora - 12 === 0 ? '12' : (hora - 12).toString().padStart(2, '0')) + ':' + minuto + ' PM';
            }
            return formato12;
        }
    },
    data()
    {
        return {
            validate_inicio:true,
            validate_fin:true,
            form:{
                _id:'',
                dia:'',
                tiempo:'15',
                hora_inicio:{
                    hh:'',
                    mm:'', 
                    A:''
                },
                hora_fin:{
                    hh:'',
                    mm:'', 
                    A:''
                }
            },
            horario:[],
        }
    },
    watch:{
        'form.hora_inicio':function(data)
        {
            let me = this;
            me.validate_inicio=(data.hh!='' && data.mm!='' && data.A!='');
        },
        'form.hora_fin':function(data)
        {
            let me = this;
            me.validate_fin=(data.hh!='' && data.mm!='' && data.A!='');
        },
    },
    methods:{
        guardar()
        {
            let me = this;
            me.validate_inicio  = ( me.form.hora_inicio.hh!=''  && me.form.hora_inicio.mm!=''  && me.form.hora_inicio.A!=''   );
            me.validate_fin     = ( me.form.hora_fin.hh!=''     && me.form.hora_fin.mm!=''     && me.form.hora_fin.A!=''      );
            if(me.validate_fin && me.validate_inicio)
            {
                axios
                .post(API_HOST+'/especialista/horario/save',me.form)
                .then(function(response)
                {
                    me.arrayEspecialidad = response.data.data;
                    me.$swal('Creado con exito');
                    me.loadHorarios();
                })
            }
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
                .post(API_HOST+'/especialista/horario/delete',{_id:_id})
                .then(function(response)
                {
                    me.$swal("Se ha eliminado con exito.");
                    me.loadHorarios();
                })
            })
        },
        loadHorarios()
        {
            let me = this;
			axios
			.post(API_HOST+'/especialista/horario',{_id:me.form._id, fecha:me.form.dia})
			.then(function(response)
			{
                me.horario = response.data.data;
			})
        },
        fecha()
        {
            let me = this;
            $('#dia').datepicker({
                onSelect: function(dateText, inst) 
                {
                    me.form.dia=$(this).val();
                    me.loadHorarios();
                },
                dateFormat:'yy-mm-dd',
                yearRange: "-0:+1",
                //maxDate:'+30',
                minDate:'1',
                changeMonth: true,
                changeYear: true
            })
            var d = new Date();

            var month = d.getMonth()+1;
            var day = d.getDate();

            me.form.dia = d.getFullYear() + '-' +
                (month<10 ? '0' : '') + month + '-' +
                ((day+1)<10 ? '0' : '') + (day+1);
            me.loadHorarios();
        }
    },
    mounted:function(){
        this.$parent._data.template='back'
        this.form._id    =   this.$route.params.id;
        this.fecha();
    }
}
</script>

<style>

</style>