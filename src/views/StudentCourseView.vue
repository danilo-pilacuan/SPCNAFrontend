<template>
  <div id="home" tabindex="-1" @keydown.alt="handleKeydownAlt">
    <UserHandle/> 
    <Keypress key-event="keyup" :multiple-keys="multiple" @success="procesarTecladoAlt" @wrong="logwrong"/>

    <VoiceComponent ref="componenteSpeak" :texto="texto" :reproducir="reproducir"
    @onTexto="emitTexto"
    @onReproducir="emitReproducir"
    ></VoiceComponent>

    <div class="container"> <!-- v-show="userType == 2 || userType == 3">-->
      <div class="block" @click="selectLessons()">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary" style="cursor: pointer;">
              <div class="hero-body">
                <p class="title">Lecciones</p>
                <p class="subtitle">
                  Tomar Lecciones
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div class="container"> <!-- v-show="userType == 2 || userType == 3">-->
      <div class="block" @click="selectTasks()">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary" style="cursor: pointer;">
              <div class="hero-body">
                <p class="title">Actividades</p>
                <p class="subtitle">
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
import UserHandle from '../components/UserHandle.vue'

export default {
  components: {
    VoiceComponent: VoiceComponent,
    "UserHandle": UserHandle,
    Keypress: () => import('vue-keypress')
  },
  data() {
    return {
      //necesarios para voiceComponent
      texto:"Prueba texto", //"Bienvenido, presione alt mas w para ir al area de trabajo o alt mas ye para recibir ayuda",
      reproducir:false,

      //Necesarios para keypress
      pressedKeyCode: null,
      multiple: [
        {
          keyCode: "B".charCodeAt(0), // 
          modifiers: ['altKey'],
          preventDefault: true,
        },
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
          keyCode: "A".charCodeAt(0), // 
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
        {
          keyCode: 38,
          modifiers: ['altKey'],
          preventDefault: true,
        },
        {
          keyCode: 40,
          modifiers: ['altKey'],
          preventDefault: true,
        },
      ],


      // Component Data
      test: false,
      hello: "hello world",      
      value: 0,
      valueSelVoices: [],
      valuePitch: 0.5,
      valueRate: 0,
      synth: [],
      valueVolume: 50,
      voicesSpeech: [],
    };
  },
  mounted() {

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
    selectLessons(){
      //this.$store.dispatch("setSelectedCourse", curso);
      //console.log("CourseId: "+curso._id)
      //this.$cookies.set('courseId', curso._id)
      this.$router.push("/leccionesEstudiante");
    },
    selectTasks(){
      this.$router.push("/actividadesEstudiante");
    },
    
    ///methods teclado y voz
    logwrong(response){
      console.log(response.event)
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
   
    //Methods captura y voz

    procesarTecladoAlt(response) {      
      if (response.event.keyCode == "B".charCodeAt(0)) {
        this.selectLessons()
      }

      if (response.event.keyCode == "A".charCodeAt(0)) {
        this.selectTasks()
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
          this.playMenu()

        //this.reproducir=true
        }, 2000);
    },
    playMenu()
    {
      this.$t("CourseMenu").forEach(element => {
            this.$refs.componenteSpeak.quickSpeak(element)
            console.log(element)
          });
    }


  },
};
</script>

<style>
</style>