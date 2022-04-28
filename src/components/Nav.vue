<template>
    <b-navbar class="is-dark mb-2">
        <!-- <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template> -->
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <h1>SPCNA&nbsp;
                    <div v-show="userType==1" >
                    (Administración)
                </div>
                <div v-show="userType==2" >
                    (Profesor)
                </div>
                <div v-show="userType==3" >
                    (Estudiante)
                </div>
                </h1>
                
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Inicio
            </b-navbar-item>
            <b-navbar-item v-show="userType==1" tag="router-link" :to="{ path: '/usuarios' }">
                Usuarios
            </b-navbar-item>
            <b-navbar-item v-show="userType==2" tag="router-link" :to="{ path: '/administracionCursos' }">
                Administración Cursos
            </b-navbar-item>
            <b-navbar-item v-show="userType==2" tag="router-link" :to="{ path: '/cursos' }">
                Cursos
            </b-navbar-item>
            <!-- <b-navbar-item v-show="userType==3" tag="router-link" :to="{ path: '/cursosEstudiante' }">
                Cursos
            </b-navbar-item> -->
            <!-- <b-navbar-item v-show="userType==2 || userType==3" tag="router-link" :to="{ path: '/lecciones' }">
                Lecciones
            </b-navbar-item>
            <b-navbar-item v-show="userType==2 || userType==3" tag="router-link" :to="{ path: '/actividades' }">
                Actividades
            </b-navbar-item> -->

            <!-- <b-navbar-item v-show="userType==2 || userType==3" tag="router-link" :to="{ path: '/areatrabajo' }">
                Área de Trabajo
            </b-navbar-item> -->

            <!-- <router-link to="/">
            <b-navbar-item>
                Home    
            </b-navbar-item>
            </router-link>
            <router-link to="/usuarios">
            <b-navbar-item v-show="userType==1">
                Usuarios
            </b-navbar-item>
            </router-link> -->

            <!-- <b-navbar-item>
                <router-link to="/">About</router-link>
            </b-navbar-item> -->
            
        </template>

        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    
                    <router-link class="button is-primary" v-show="!authenticated" to="/login">Iniciar Sesión</router-link>
                    
                    <a class="button is-primary" v-show="authenticated" @click="logout">
                        Cerrar Sesión
                    </a>
                    <!-- <a class="button is-primary">
                        <router-link to="/register">Register</router-link>
                    </a> -->
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    computed:{
        authenticated() {
      return this.$store.state.authenticated;
    },
    userType() {
      return this.$store.state.userType;
    },
    selectedCourse() {
      return this.$store.state.selectedCourse;
    },
    currentUser(){
        return this.$store.state.currentUser;
    }
    },
    methods:{
        logout(){
            console.log("logout")
            fetch("http://localhost:5000/api/users/logout", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                credentials: "include"
            }).then(response=>response.json())
            .then(data=>{
                var resp=data.message;
                console.log(resp);
                if(resp=="success"){
                    this.$store.dispatch('setAuth',false);
                    this.$store.dispatch('setUserType',false);
                    this.$router.push("/login")
                }
                else
                {
                    this.$store.dispatch('setAuth',true);
                    
                }
                    
            })
        }
    }
};
</script>

<style>
h1{
    color: gray;
}
.nav{
  margin-bottom: 60px;
}
</style>