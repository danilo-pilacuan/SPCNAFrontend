<template>
  <div id="home" v-if="currentUser">  
    <UserHandle/> 
    <Keypress key-event="keyup" :multiple-keys="multiple" @success="procesarTecladoAlt" @wrong="logwrong"/>

    <VoiceComponent ref="componenteSpeak" :texto="texto" :reproducir="reproducir"
    @onTexto="emitTexto"
    @onReproducir="emitReproducir"
    ></VoiceComponent>

    <div class="container" v-for="curso,index in currentUser.courses" :key="index">
      <div class="block" v-if="curso.isActive" @click="selectCourse(curso)">
        <div class="columns">
          <div class="column">
              <section class="hero is-primary" style="cursor: pointer;">
              <div class="hero-body">
                <p class="title">{{curso.name}}</p>
                <p class="subtitle">{{curso.description}}</p>
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
      

      //component data
      test: false,
      tableData: [],
      selected: null,
      isSelectCourse: false,
      availableCourses: [],
      currentSelectedCourse:null,
      posCurrentCourse:0,
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
    'currentUser': function (val, oldVal) {
      //Scroll to bottom
      
    },
  },
  mounted() {
    console.log("Current user11")
    console.log(this.currentUser)
    this.fillCursos()
    this.activateVoiceComponent()
    
  },
  methods: {
    selectCourse(curso)
    {
      this.$store.dispatch("setSelectedCourse", curso);
      console.log("CourseId: "+curso._id)
      this.$cookies.set('courseId', curso._id)
      this.$router.push("/cursoEstudiante");
    },
    handleSeleccionar() {
      console.log("selected");
      if (this.selected) {
        this.$store.dispatch("setSelectedCourse", this.selected);
      }
      this.tableUsersData = this.selectedCourse.users;
      this.isSelectCourse = false;
    },
    listarCursos()
    {

        let contCursos=1;
      for(let i=0;i<this.currentUser.courses.length;i++)
      {
        let curso=this.currentUser.courses[i]
        if(curso.isActive)
        {
          this.$refs.componenteSpeak.quickSpeak("Curso "+contCursos.toString()+" "+curso.name)
          contCursos=contCursos+1
        }
      }
      
    },
    fillCursos()
    {
      let nonCurrentSelected=true;
      for(let i=0;i<this.currentUser.courses.length;i++)
      {
        let curso=this.currentUser.courses[i]
        if(curso.isActive)
        {
          if(nonCurrentSelected)
          {
            this.currentSelectedCourse=curso;
            nonCurrentSelected=false
          }
          this.availableCourses.push(curso)
        }
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
        this.listarCursos()
      }

      if (response.event.keyCode == "C".charCodeAt(0)) {
        this.selectCourse(this.currentSelectedCourse)
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
        this.$refs.componenteSpeak.quickSpeak("Curso seleccionado actualmente: "+this.currentSelectedCourse.name)
      } 
      
      if (response.event.keyCode == 38) { //arrowup
        let lenCursos=this.availableCourses.length
        this.posCurrentCourse=this.posCurrentCourse-1
        if(this.posCurrentCourse<0)
        {
          this.posCurrentCourse=lenCursos-1;
        }
        this.currentSelectedCourse=this.availableCourses[this.posCurrentCourse]
          this.$refs.componenteSpeak.quickSpeak("Curso seleccionado actualmente: "+this.currentSelectedCourse.name)
        
      } 

      if (response.event.keyCode == 40) { //arrowdown
        let lenCursos=this.availableCourses.length
        this.posCurrentCourse=this.posCurrentCourse+1
        console.log("pos")
        console.log(this.posCurrentCourse)
        if(this.posCurrentCourse==lenCursos)
        {
          this.posCurrentCourse=0;
        }
        this.currentSelectedCourse=this.availableCourses[this.posCurrentCourse]
          this.$refs.componenteSpeak.quickSpeak("Curso seleccionado actualmente: "+this.currentSelectedCourse.name)
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
      this.$t("CoursesStudent").forEach(element => {
            this.$refs.componenteSpeak.quickSpeak(element)
            console.log(element)
          });
    }

  },
  
};
</script>

<style>
</style>