<template>
    <div>
        <form @submit.prevent="guardar">
            <div class="row">
                <div class="col-md-4">
                    <label for="">hora de inicio</label><br>
                    <vue-timepicker format="hh:mm A" v-model="form.hora_inicio"></vue-timepicker>
                </div>
                <div class="col-md-4">
                    <label for="">hora de fin</label><br>
                    <vue-timepicker format="hh:mm A" v-model="form.hora_fin"></vue-timepicker>
                </div>
                <div class="col-md-4">
                    <label for="dia">Dia</label>
                    <select v-model="form.dia" name="dia" id="dia" class="form form-control" required>
                        <option value="">Seleccione</option>
                        <option v-for="(dia,index) in dias" :key="index" :value="dia">{{dia.nombre}}</option>
                    </select>
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
            <table class="table-hover table">
                <thead>
                    <tr>
                        <th>Opciones</th>
                        <th>Dia</th>
                        <th>Hora de inicio</th>
                        <th>Hora de fin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(hor,index) in horario" :key="index">
                        <td>
                            <b-dropdown id="dropdown-1" text="Opciones" class="m-md-2">
                                <b-dropdown-item @click="eliminar(hor.id)">Eliminar</b-dropdown-item>
                            </b-dropdown>
                            <pre>{{ hor }}</pre>
                        </td>
                        <td>{{hor.dia_nombre}}</td>
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
            var date = new Date('2000-01-01 '+value);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = (minutes < 10 ? '0' :'')+ minutes;
            var strTime = (hours<10?'0':'') + hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }
    },
    data()
    {
        return {
            form:{
                _id:'',
                dia:'',
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
            dias:[
                {dia:1,nombre:'Lunes'},
                {dia:2,nombre:'Martes'},
                {dia:3,nombre:'Miercoles'},
                {dia:4,nombre:'Jueves'},
                {dia:5,nombre:'Viernes'},
                {dia:6,nombre:'Sabado'},
                {dia:0,nombre:'Domingo'}
            ],
            horario:[],
        }
    },
    methods:{
        guardar()
        {
            let me = this;
			axios
			.post(API_HOST+'/especialista/horario/save',me.form)
			.then(function(response)
			{
                me.arrayEspecialidad = response.data.data;
                me.$swal('Creado con exito');
                me.loadHorarios();
			})
        },
        eliminar(_idarray)
        {
            alert(_idarray);
        },
        loadHorarios()
        {
            let me = this;
			axios
			.post(API_HOST+'/especialista/horario',{_id:me.form._id})
			.then(function(response)
			{
                me.horario = response.data.data;
			})
        }
    },
    mounted:function(){
        this.$parent._data.template='back'
        this.form._id    =   this.$route.params.id;
        this.loadHorarios();
    }
}
</script>

<style>

</style>