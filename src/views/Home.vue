<template>
  <div id="home" tabindex="-1" @keydown.alt="handleKeydownAlt">
    

    <VoiceComponent ref="componenteSpeak" :texto="texto" :reproducir="reproducir"
    
    @onTexto="emitTexto"
    @onReproducir="emitReproducir"
    ></VoiceComponent>




    <div class="container" v-show="userType == 1">
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary">
              <div class="hero-body">
                <p class="title">Usuarios</p>
                <p class="subtitle">Administración de Usuarios</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div class="container"  v-show="userType == 2"> <!--v-show="userType == 2">-->
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary">
              <div class="hero-body">
                <p class="title">Administración de Cursos</p>
                <p class="subtitle">Administración de Cursos</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div class="container"> <!-- v-show="userType == 3">-->
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary" @click="$router.push('/cursosEstudiante')">
              <div class="hero-body">
                <p class="title">Cursos</p>
                <p class="subtitle">Ingresar curso</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-show="userType == 2">
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary">
              <div class="hero-body">
                <p class="title">Lecciones</p>
                <p class="subtitle" v-show="userType == 2">
                  Administración lecciones
                </p>
                <p class="subtitle" v-show="userType == 3">Tomar lecciones</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
<!-- <b-button class="m-3" type="is-primary" @click="$refs.componenteSpeak.startSpeak()"
          >Guardar</b-button
        >
        <b-button class="m-3" type="is-primary" @click="$refs.componenteSpeak.pauseSpeak()"
          >Pausar</b-button
        >
        <b-button class="m-3" type="is-primary" @click="$refs.componenteSpeak.resumeSpeak()"
          >resume</b-button
        > -->
  

    <div class="container" v-show="userType == 2">
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary">
              <div class="hero-body">
                <p class="title">Actividades</p>
                <p class="subtitle" v-show="userType == 2">
                  Administración actividades
                </p>
                <p class="subtitle" v-show="userType == 3">
                  Realizar actividades
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="container">
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary">
            <div class="hero-body">
                <p class="title">Primary hero</p>
                <p class="subtitle">Primary subtitle</p>
            </div>
            </section>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <h1>authenticated</h1>
    <h2 v-if="authenticated">Si</h2>
    <h2 v-else>No</h2>
    <h1>userType</h1>
    <h2>{{ userType }}</h2> -->
  </div>
</template>

<script>
import VoiceComponent from '/src/components/VoiceComponent'


export default {
  components: {
    VoiceComponent: VoiceComponent,
    
  },
  data() {
    return {
      
      texto:this.$t('ayudaHome'), //"Bienvenido, presione alt mas w para ir al area de trabajo o alt mas ye para recibir ayuda",
      reproducir:false,
      
    };
  },
  mounted() {

    
    console.log(this.authenticated);
    console.log(this.userType);
    
    
    
    
    this.activateVoiceComponent()
  },
  computed: {
    
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
  methods: {
    
    activateVoiceComponent() {
      setTimeout(() => this.reproducir=true, 2000);
    },
    speakF()
    {
      console.log("Texto....")
      this.reproducir=!this.reproducir
      console.log(this.texto)
    },
    emitTexto(valor, valor2) {
      console.log("Procesar Texto")
      this.texto=valor
      console.log(valor)
      
    },
    emitReproducir(valor, valor2) {
      this.reproducir=valor
      console.log("Procesar CT")
      console.log(valor)
      
    },
    handleKeydownAlt(e){
      console.log(e.key);
      //this.speak(e.key);
      if(e.key=="c")
      {
        this.$router.push("/cursosEstudiante");
      }
    },

  },
};
</script>

<style>
</style>