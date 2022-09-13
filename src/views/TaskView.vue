<template>
  <div id="home" v-if="selectedUserTask">   
    <UserHandle/> 
    <Keypress key-event="keyup" :multiple-keys="multiple" @success="procesarTecladoAlt" @wrong="logwrong"/>

    <VoiceComponent ref="componenteSpeak" :texto="texto" :reproducir="reproducir"
    @onTexto="emitTexto"
    @onReproducir="emitReproducir"
    ></VoiceComponent>

    <div class="card" v-if="selectedUserTask">
      <header class="card-header">
        <p class="card-header-title">Actividad</p>
        <b-button class="m-3" type="is-primary" @click="solveTask"
          >Resolver</b-button
        >
      </header>
      <div class="card-content">
        <div class="content">
            <b-field
                class="has-text-left"
                label="Nombre Actividad"
            >
                <b-input :value="selectedUserTask.task.name" disabled></b-input>
            </b-field>
            <b-field
                class="has-text-left"
                label="Descripción"
            >
                <b-input :value="selectedUserTask.task.description" disabled></b-input>
            </b-field>
            
            <div class="has-text-left">
                <b><p>Contenido</p></b>
            </div>
            <b-table
          :data="selectedUserTask.task.content"
          :bordered="true"
          :striped="true"
          :narrowed="false"
          :hoverable="false"
          :loading="false"
          :focusable="false"
          :mobile-cards="false"
          :searchable="false"
        >
          <b-table-column field="name" label="Instrucción" v-slot="props">
            {{ props.row.data }}
          </b-table-column>


        </b-table>
        <b-field
        v-if="selectedUserTask.hasScore"
                class="has-text-left"
                label="Calificación"
            >
                <b-input :value="selectedUserTask.score" disabled></b-input>
            </b-field>
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


      test: false,
      tableData: [],
      selected: null,
      isSelectCourse: false,
      fileInput:null
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
    },
    selectedLesson() {
      return this.$store.state.selectedLesson;
    },
    selectedUserTask(){
        return this.$store.state.selectedUserTask;
    }
  },
  watch: {
    'selectedUserTask': function (val, oldVal) {
      //Scroll to bottom
      
    },
  },
  mounted() {
    this.activateVoiceComponent()
  },
  methods: {
    solveTask()
    {
      this.fileInput=this.selectedUserTask.scriptFile
      console.log("fileInput")
      console.log(this.fileInput)
      this.$router.push({name: 'resolveractividad', params: { fileInput: this.fileInput}});
    },
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
      if (response.event.keyCode == "A".charCodeAt(0)) {
        this.$refs.componenteSpeak.quickSpeak("Nombre de la actividad: "+this.selectedUserTask.task.name)
        this.$refs.componenteSpeak.quickSpeak("Descripción: "+this.selectedUserTask.task.description)
        if(this.selectedUserTask.hasScore)
        {
          this.$refs.componenteSpeak.quickSpeak("Su calificación: "+this.selectedUserTask.score)
        }
        else
        {
          this.$refs.componenteSpeak.quickSpeak("Aún no calificada.")
        }


      } 

      if (response.event.keyCode == "B".charCodeAt(0)) {
        let contInstr=1
        this.selectedUserTask.task.content.forEach(element => {
          this.$refs.componenteSpeak.quickSpeak("Instrucción: "+contInstr+". "+element.data)
          contInstr=contInstr+1
        });
      }

      if (response.event.keyCode == "C".charCodeAt(0)) {
        this.solveTask()
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
      
    },

    activateVoiceComponent() {
      setTimeout(() => {
          this.playMenu()

        //this.reproducir=true
        }, 2000);
    },
    playMenu()
    {
      this.$t("SolveTaskMenu").forEach(element => {
            this.$refs.componenteSpeak.quickSpeak(element)
            console.log(element)
          });
    }

  },
  
};
</script>

<style>
</style>