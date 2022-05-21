<template>
  
  <div class="home">
    <Keypress key-event="keyup" :multiple-keys="multiple" @success="procesarTecladoAlt" />

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

    <div class="container" v-show="userType == 3">
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
                <p class="subtitle">
                  Administración actividades
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VoiceComponent from '/src/components/VoiceComponent'


export default {
  components: {
    VoiceComponent: VoiceComponent,
    Keypress: () => import('vue-keypress')
  },
  data() {
    return {
      
      texto:this.$t('ayudaHome'), //"Bienvenido, presione alt mas w para ir al area de trabajo o alt mas ye para recibir ayuda",
      reproducir:false,

      pressedKeyCode: null,
      multiple: [
        {
          keyCode: "M".charCodeAt(0), // 
          modifiers: ['altKey'],
          preventDefault: true,
        },
        {
          keyCode: "C".charCodeAt(0), // 
          modifiers: ['altKey'],
          preventDefault: true,
        },
        {
          keyCode: "H".charCodeAt(0), // H
          modifiers: ['altKey'],
          preventDefault: true,
        },
        {
          keyCode: "X".charCodeAt(0), // H
          modifiers: ['altKey'],
          preventDefault: true,
        },
        {
          keyCode: "Y".charCodeAt(0), // H
          modifiers: ['altKey'],
          preventDefault: true,
        },
        {
          keyCode: "Z".charCodeAt(0), // H
          modifiers: ['altKey'],
          preventDefault: true,
        },
      ],
      
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
    
    someMethod(response) {
      // Do something
      console.log("assada")
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
   
    ////////// Methods captura y voz

    procesarTecladoAlt(response) {

      
      if (response.event.keyCode == "M".charCodeAt(0)) {
        
        this.$t("homeMenu").forEach(element => {
          this.$refs.componenteSpeak.quickSpeak(element)
        });  
      }

      if (response.event.keyCode == "C".charCodeAt(0)) {
        this.$router.push('/cursosEstudiante')
      }

      if (response.event.keyCode == "H".charCodeAt(0)) {
        this.$t("homeHelp").forEach(element => {
          this.$refs.componenteSpeak.quickSpeak(element)
        }); 
      }      

      if (response.event.keyCode == "X".charCodeAt(0)) {
          this.$refs.componenteSpeak.pauseSpeak()
      }      

      if (response.event.keyCode == "Y".charCodeAt(0)) {
        
          this.$refs.componenteSpeak.resumeSpeak()        
      }      

      if (response.event.keyCode == "Z".charCodeAt(0)) {
        this.$refs.componenteSpeak.restartSpeak()
      }      
      
    },
    activateVoiceComponent() {
      setTimeout(() => {
          this.$t("homeMenu").forEach(element => {
            this.$refs.componenteSpeak.quickSpeak(element)
            console.log(element)
          });

        //this.reproducir=true
        }, 2000);
    },
    
  },
};
</script>

<style>
</style>