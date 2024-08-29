<template>
    <div>
        <div class="container-fluid">
            <form @submit.prevent="guardar">
                <div class="row">
                    <div class="col-md">
                        <label>Primer nombre</label>
                        <input v-model="forms.nombre_primero" type="text" class="form-control" required>
                    </div>
                    <div class="col-md">
                        <label>Segundo nombre</label>
                        <input v-model="forms.nombre_segundo" type="text" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md">
                        <label>Primer apellido</label>
                        <input v-model="forms.apellido_primero" type="text" class="form-control" required>
                    </div>
                    <div class="col-md">
                        <label>Segundo apellido</label>
                        <input v-model="forms.apellido_segundo" type="text" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md">
                        <label>Tipo de documento</label>
                        <select v-model="forms.documento_typo_id" type="text" class="form-control" required>
                            <option value="">Seleccione</option>
                            <option v-for="(DocumentoTipo,index) in arrayDocumentoTipo" :value="DocumentoTipo.id" :key="index">{{DocumentoTipo.name}}</option>
                        </select>
                    </div>
                    <div class="col-md">
                        <label>Documento</label>
                        <input v-model="forms.documento" type="text" class="form-control" required>
                    </div>
                    <div class="col-md">
                        <label>Fecha de nacimiento</label>
                        <input v-model="forms.fecha_nacimiento" id="fecha_nacimiento" name="fecha_nacimiento" type="password" class="form-control" required readonly>
                    </div>
                </div>
                <!-- Campos ocultos -->
                <div v-if="false">
                    <div class="row">
                        <div class="col-md">
                            <label>email</label>
                            <input v-model="forms.email" type="email" class="form-control">
                        </div>
                        <div class="col-md">
                            <label>Numero de contacto</label>
                            <input v-model="forms.numero_contacto" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md">
                            <label>Ciudad</label>
                            <input v-model="forms.ciudad" type="text" class="form-control">
                        </div>
                    </div>
                </div>
                <!-- Fin de campos ocultos -->
                <div class="row">
                    <div class="col-md">
                        <br>
                        <button class="btn btn-success" :disabled="disabled">Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'usuarios-form',
    data () {
        return {
            forms:{
                nombre_primero:null,
                nombre_segundo:null,
                apellido_primero:null,
                apellido_segundo:null,
                documento:null,
                documento_typo_id:null,
                fecha_nacimiento:null,
                email:null,
                numero_contacto:null,
                pais:'Colombia',
                ciudad:null
            },
            arrayDocumentoTipo:[],
            disabled:false
        };
    },
    methods:{
        guardar()
        {
            let me = this;
            me.disabled=true;
            me.forms.fecha_nacimiento=$("#fecha_nacimiento").val();
            axios
            .post(API_HOST+'/patient/save',me.forms)
            .then(function(response)
            {
                // Manejar respuesta
            });
        }
    },
    mounted()
    {
        // Cargar tipos de documentos
        let me = this;
        axios.get(API_HOST+'/document_types')
        .then(function(response)
        {
            me.arrayDocumentoTipo = response.data;
        });
    }
}
</script>

<style scoped>
.table td.text-white {
    color: white;
}
</style>
