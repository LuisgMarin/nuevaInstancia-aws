<template>
  <div>
    <div id="app" v-if="template=='back'">
      <notifications group="foo" />
      <div id="wrapper">
    
        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    
          <!-- Sidebar - Brand -->
          <div class="sidebar-brand d-flex align-items-center justify-content-center">
            <div class="sidebar-brand-text mx-3">Gestion de Citas</div>
          </div>
    
          <!-- Divider -->
          <hr class="sidebar-divider my-0">
    
          <!-- Nav Item - Dashboard -->
          <li class="nav-item">
            <router-link class="nav-link collapsed" :to="{ name: 'cita_index'}">
              <i class="far fa-calendar-alt"></i>
              <span>Citas</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link collapsed" :to="{ name: 'sugerencias_index'}">
              <i class="fas fa-fw fa-tachometer-alt"></i>
              <span>Sugerencias</span>
            </router-link>
          </li>
          
    
          <!-- Divider -->
          <hr class="sidebar-divider">
          
          <li class="nav-item">
            <router-link  class="nav-link collapsed" :to="{ name: 'especialistas_index'}">
              <i class="fas fa-user-md"></i>
              <span>Especialistas</span>
            </router-link>
          </li>
        
          <li class="nav-item">
            <router-link  class="nav-link collapsed" :to="{ name: 'especialidades_index'}">
              <i class="fas fa-notes-medical"></i>
              <span>Especialidades</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link  class="nav-link collapsed" :to="{ name: 'eps_index'}">
              <i class="fas fa-clinic-medical"></i>
              <span>Eps</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link  class="nav-link collapsed" :to="{ name: 'patient_index'}">
              <i class="fas fa-user-injured"></i>
              <span>Pacientes</span>
            </router-link>
          </li>    
          
          <li class="nav-item">
            <router-link  class="nav-link collapsed" :to="{ name: 'users_index'}">
              <i class="fas fa-user-shield"></i>
              <span>Usuarios</span>
            </router-link>
          </li>    
          
        </ul>
        <!-- End of Sidebar -->
    
        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
    
          <!-- Main Content -->
          <div id="content">
    
            <!-- Topbar -->
            <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    
              <!-- Sidebar Toggle (Topbar) -->
              <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                <i class="fa fa-bars"></i>
              </button>

              <!-- Topbar Navbar -->





              <ul class="navbar-nav ml-auto">
                <div class="topbar-divider d-none d-sm-block"></div>
                <!-- Nav Item - User Information -->
                <li class="nav-item dropdown no-arrow">
                  <!-- Dropdown - User Information -->
                      <b-nav-item-dropdown
                        id="my-nav-dropdown"
                        text="Usuario"
                        right
                      >
                        <b-dropdown-item>Opciones</b-dropdown-item>
                        <b-dropdown-item  :to="{ name: 'chagePass'}">
                            Cambiar contrase&#241;a
                        </b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item  :to="{ name: 'loguot'}">Cerrar sesion</b-dropdown-item>
                      </b-nav-item-dropdown>
                </li>
    
              </ul>
    
            </nav>
            <!-- End of Topbar -->
    
            <!-- Begin Page Content -->
            <div class="container-fluid">
              <!-- Content Row -->
              <div class="row">
    
                <!-- Area Chart -->
                <div class="col-xl-12 col-lg-12">
                  <div class="card shadow mb-4">
                    <!-- Card Header - Dropdown -->
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 class="m-0 font-weight-bold text-primary">Titulo</h6>
                      <div class="dropdown no-arrow">
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                          <div class="dropdown-header">Dropdown Header:</div>
                          <a class="dropdown-item" href="#">Action</a>
                          <a class="dropdown-item" href="#">Another action</a>
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                      </div>
                    </div>
                    <!-- Card Body -->
                    <div class="card-body">
                        <router-view/>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <!-- /.container-fluid -->
    
          </div>
          <!-- End of Main Content -->
    
          <!-- Footer -->
          <footer class="sticky-footer bg-white">
            <div class="container my-auto">
              <div class="copyright text-center my-auto">
              </div>
            </div>
          </footer>
        </div>
      </div>
      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
      </a>
    </div>
    <div v-if="template=='front'">
      <router-view/>
    </div>
    <div v-if="template=='login'">
      <router-view/>
    </div>
    <div v-if="template=='not_found'">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
        return {
            template:'back',
            actualizacion:new Date()
        }
    },
    methods:
    {
      recibir()
      {
        let me = this;
        let value = JSON.parse(localStorage.getItem('user'));
        me.$socket.on('newAlert', (data) => 
        {
          me.$notify({
            group: 'foo',
            title: data.title,
            text: data.text,
            type:'warn'
          });
          var audio = new Audio(require('../src/assets/sound/notifi.mp3'));
          audio.play();
          me.actualizacion=new Date();
        });
        let nombre ='logout_'+value.id;
        me.$socket.on(nombre, (data) => 
        {
          let me = this;
          localStorage.clear();
          me.$parent._data.template='back'
          axios.get(API_HOST+'/auth/logout')
          window.location="../";
        });
        
      },
      validate(){
        let me = this;
        axios
        .post(API_HOST+'/auth/validate')
        .then(function(response){
          if(response.data.validate!=true)
          {
            localStorage.clear();
            me.$parent._data.template='back'
            axios.get(API_HOST+'/auth/logout')
            window.location="../";
          }
        })
      }
    },
  mounted:function()
  {
    switch(this.template)
    {
      case 'back':
        this.recibir();
        this.validate();
        require('../src/assets/css/sb-admin-2.min.css');
        break;
      case 'login':
      break;
      case 'front':
        require('../src/assets/css/pedir.css');
      break;
    }
  }
}
</script>