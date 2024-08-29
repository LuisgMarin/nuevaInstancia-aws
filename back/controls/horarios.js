let tblEspecialista         = require('../models/coll_especialistas');
let tblEspecialistasHorario = require('../models/coll_especialistas_horario');
let functions={
    async rangosHorarios(dia,id_especialista)
    {
        return await tblEspecialistasHorario.findAll({where:{dia:dia,id_especialista:id_especialista},order: [['hora_inicio','ASC']]})
        
    },
    async verHorariosEspecialista(id_especialista)
    {
    },
    async asyncForEach(array, callback)
    {
        for (let index = 0; index < array.length; index++)
        {
            await callback(array[index], index, array);
        }
    },
    formatHour(value)
    {
        var date = new Date('2000-01-01 '+value);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = (minutes < 10 ? '0' :'')+ minutes;
        var strTime = (hours<10?'0':'') + hours + ':' + minutes + ' ' + ampm;
        return strTime;
    },
    async calcularMinutos()
    {
        var hora = new Date('2000-01-01 08:00:00');
        hora.setMinutes(hora.getMinutes() + hora.getTimezoneOffset());
        for(var i=0;i<32;i++)
        {
            horas=hora.setMinutes((15*i));
            let temp = new Date(horas);
            //temp =`${temp}`;
            console.log({time:hora,i:(15*i),hora:temp.getHours()});
        }
    }

}

module.exports = functions;