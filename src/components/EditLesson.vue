<template>
  <div v-if="selectedCourse">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Lección</p>
        <b-button class="m-3" type="is-primary" @click="submitLesson"
          >Guardar</b-button
        >
      </header>
      <div class="card-content">
        <div class="content">
            <b-field
                class="has-text-left"
                label="Nombre Lección"
                :type="{ 'is-danger': validateCourseName }"
                :message="{ 'Username is not available': validateCourseName }"
            >
                <b-input v-model="inputLessonName" maxlength="50"></b-input>
            </b-field>
            <b-field
                class="has-text-left"
                label="Descripción"
            >
                <b-input v-model="inputLessonDescription" maxlength="150"></b-input>
            </b-field>
            <b-field
                class="has-text-left"
                label="Estado"
            >
                <b-select v-model="estadoSeleccionado" placeholder="Seleccionar Estado">
                <option
                    v-for="option in valoresEstado"
                    :value="option.valor"
                    :key="option.id">
                    {{ option.descripcion }}
                </option>
            </b-select>
            </b-field>
            
            <!-- <b-field
                class="has-text-left"
                label="Contenido"
                :type="{ 'is-danger': validateCourseName }"
                :message="{ 'Username is not available': validateCourseName }"
            >
                <b-input v-model="inputLessonContent" maxlength="50"></b-input>
            </b-field> -->
            <div class="has-text-left">
                <b><p>Contenido</p></b>
            </div>
            <WorkingArea :fileInput="fileInput"/>
        </div>
      </div>
      <footer class="card-footer">
        <b-button class="m-3" type="is-primary" @click="submitLesson"
          >Guardar</b-button
        >
      </footer>
    </div>
   
  </div>
</template>

<script>
import WorkingArea from "../views/WorkingArea";

export default {
  components: {
    WorkingArea: WorkingArea,
  },
  data() {
    return {
        inputLessonName:null,
        inputLessonDescription: null,
        inputLessonContent:null,
        validateCourseName: false,
        inputAddInstruction:null,
        showModalEdit:false,
        inputEditInstruction: null,
        selectedInstruction:null,
        numberOfInstructions: 0,
        isEditLesson: false,
        fileInput:null,
        contentData:[
        ],
        estadoSeleccionado:true,
        valoresEstado: [{id:1,valor:true,descripcion:"Activa"},{id:2,valor:false,descripcion:"Inactiva"}],
    };
  },
  watch: {
    selectedLesson (newValue) {
      if(this.selectedLesson)
      {
        this.isEditLesson=true;
        this.inputLessonName=this.selectedLesson.name;
        this.inputLessonDescription=this.selectedLesson.descripcion;
        this.estadoSeleccionado=this.selectedLesson.isActive;
      }
    },
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
    currentUser() {
      return this.$store.state.currentUser;
    },
    selectedLesson() {
      return this.$store.state.selectedLesson;
    },
  },
  methods: {
     
      submitLesson()
      {
        console.log("Sumbit Lesson 1")
        if(!this.isEditLesson)
        {
          fetch("http://localhost:5000/api/lessons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: this.inputLessonName,
            description: this.inputLessonDescription,
            course: this.selectedCourse._id,
            isActive: this.estadoSeleccionado,
            owner: this.currentUser._id
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            console.log("resp lesson:")
            console.log(resp)
            this.$router.push("/curso/lecciones");
          })
          .catch((error)=>{
            this.$buefy.dialog.alert("Error al crear la lección");
          });
        }
        else
        {
          console.log("Sumbit Lesson 2")
          fetch("http://localhost:5000/api/lessons/"+this.selectedLesson._id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              name: this.inputLessonName,
              description: this.inputLessonDescription,
              course: this.selectedCourse._id,
              isActive: this.estadoSeleccionado,
              owner: this.currentUser._id
            }),
          })
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            console.log("resp lesson:")
            console.log(resp)
            console.log("Sumbit Lesson 3")
            this.$router.push("/curso/lecciones");
          })
          .catch((error)=>{
            this.$buefy.dialog.alert("Error al crear la lección");
          });
        }
      }
  },
  mounted() {
    if(this.selectedLesson)
      {
        console.log("Sel less")
        console.log(this.selectedLesson)
        this.isEditLesson=true;
        this.inputLessonName=this.selectedLesson.name;
        this.inputLessonDescription=this.selectedLesson.description;
        this.estadoSeleccionado=this.selectedLesson.isActive;
        this.fileInput=this.selectedLesson.associatedFile;
      }
  },
};
</script>