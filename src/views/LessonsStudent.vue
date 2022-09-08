<template>
  <div id="home" v-if="selectedCourse">   
    <UserHandle/> 
    <Keypress key-event="keyup" :multiple-keys="multiple" @success="procesarTecladoAlt" @wrong="logwrong"/>

    <VoiceComponent ref="componenteSpeak" :texto="texto" :reproducir="reproducir"
    @onTexto="emitTexto"
    @onReproducir="emitReproducir"
    ></VoiceComponent>

    <div class="container" v-for="lesson,index in tableData" :key="index">
      <div class="block" v-if="lesson.isActive" @click="selectLesson(lesson)">
        <div class="columns">
          <div class="column">
              <section class="hero is-primary" style="cursor: pointer;">
              <div class="hero-body">
                <p class="title">{{lesson.name}}</p>
                <p class="subtitle">{{lesson.description}}</p>
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

      //Data
      test: false,
      tableData: [],
      selected: null,
      isSelectCourse: false,
      currentSelectedLesson:null,
      posCurrentLesson:0,
    };
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
  watch: {
    'selectedCourse': function (val, oldVal) {
      //Scroll to bottom
      this.fetchLessons();
    },
  },
  mounted() {
    console.log("Current course")
    console.log(this.selectedCourse)
    if(this.selectedCourse)
    {
        console.log("Sel cc")
        this.fetchLessons();
        this.activateVoiceComponent()
    }
  },
  methods: {
    fetchLessons()
    {
        try {
            fetch("http://localhost:5000/api/lessons/course/"+this.selectedCourse._id, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            })
            .then((response) => response.json())
            .then((data) => {
                var resp = data;

                if (data) {
                this.tableData = data;
                this.currentSelectedLesson=this.tableData[0]
                console.log("Cursos user")
                console.log(resp);
                } else {
                //this.$router.push("/login")
                this.tableData = [];
                }
            });
        } catch (e) {
            this.$store.dispatch("setAuth", false);
        }
    },
    selectLesson(lesson)
    {
      console.log("Will set selected Lesson")
      this.$store.dispatch("setSelectedLesson", lesson);

      this.fileInput=lesson.associatedFile
      console.log("fileInput")
      console.log(this.fileInput)
      this.$router.push({name: 'verleccion', params: { fileInput: this.fileInput}});
    },

    listarLecciones()
    {

        let contLecciones=1;
      for(let i=0;i<this.tableData.length;i++)
      {
        let leccion=this.tableData[i]
        this.$refs.componenteSpeak.quickSpeak("Lección "+contLecciones.toString()+" "+leccion.name)
        contLecciones=contLecciones+1
      }
      
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
        this.listarLecciones()
      }

      if (response.event.keyCode == "C".charCodeAt(0)) {
        this.selectLesson(this.currentSelectedLesson)
      }

      if (response.event.keyCode == "M".charCodeAt(0)) {
        this.playMenu()
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

      if (response.event.keyCode == "A".charCodeAt(0)) {
        this.$refs.componenteSpeak.quickSpeak("Lección seleccionada actualmente: "+this.currentSelectedLesson.name)
      } 
      
      if (response.event.keyCode == 38) { //arrowup
        let lenLessons=this.tableData.length
        this.posCurrentLesson=this.posCurrentLesson-1
        if(this.posCurrentLesson<0)
        {
          this.posCurrentLesson=lenLessons-1;
        }
        this.currentSelectedLesson=this.tableData[this.posCurrentLesson]
          this.$refs.componenteSpeak.quickSpeak("Lección seleccionada actualmente: "+this.currentSelectedLesson.name)
        
      } 

      if (response.event.keyCode == 40) { //arrowdown
        let lenLessons=this.tableData.length
        this.posCurrentLesson=this.posCurrentLesson+1
        console.log("pos")
        console.log(this.posCurrentLesson)
        if(this.posCurrentLesson==lenLessons)
        {
          this.posCurrentLesson=0;
        }
        this.currentSelectedLesson=this.tableData[this.posCurrentLesson]
          this.$refs.componenteSpeak.quickSpeak("Lección seleccionada actualmente: "+this.currentSelectedLesson.name)
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
      this.$t("LessonsStudent").forEach(element => {
            this.$refs.componenteSpeak.quickSpeak(element)
            console.log(element)
          });
    }
  },
  
};
</script>

<style>
</style>