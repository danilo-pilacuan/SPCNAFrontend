<template>
  <div v-if="selectedCourse">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Calificar Actividad</p>
      </header>
      <div class="card-content">
        <div class="content">
            <b-field
                class="has-text-left"
                label="Nombre Actividad"
                :type="{ 'is-danger': validateCourseName }"
                :message="{ 'Username is not available': validateCourseName }"
            >
                <b-input v-model="inputTaskName" maxlength="50"></b-input>
            </b-field>
            <b-field
                class="has-text-left"
                label="Descripción"
            >
                <b-input v-model="inputTaskDescription" maxlength="150"></b-input>
            </b-field>

            
            <!-- <b-field
                class="has-text-left"
                label="Contenido"
                :type="{ 'is-danger': validateCourseName }"
                :message="{ 'Username is not available': validateCourseName }"
            >
                <b-input v-model="inputTaskContent" maxlength="50"></b-input>
            </b-field> -->
            <div class="has-text-left">
                <b><p>Contenido</p></b>
            </div>
            <b-table
            v-if="userTasksTable"
          :data="userTasksTable"
          :bordered="true"
          :striped="true"
          :narrowed="false"
          :hoverable="false"
          :loading="false"
          :focusable="false"
          :mobile-cards="false"
          :searchable="false"
        >
          <b-table-column field="completename" label="Nombre Alumno" v-slot="props">
            {{ props.row.student.completename }}
          </b-table-column>

          <b-table-column field="score" label="Calificación" v-slot="props">
            {{ props.row.score }}
          </b-table-column>

        <b-table-column field="actions" label="Acciones" v-slot="props">
            <div class="buttons">
                <b-button
                rounded
                type="is-success"
                icon-left="pencil"
                @click="viewandscoreTask(props.row)"
                >
                </b-button>
            </div>
            </b-table-column>
         

          
        </b-table>

        </div>
      </div>
      <footer class="card-footer">
        <b-button class="m-3" type="is-primary" @click="submitTask"
          >Guardar</b-button
        >
      </footer>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
        inputTaskName:null,
        inputTaskDescription: null,
        inputTaskContent:null,
        validateCourseName: false,
        inputAddInstruction:null,
        showModalEdit:false,
        inputEditInstruction: null,
        selectedInstruction:null,
        numberOfInstructions: 0,
        isEditTask: false,
        contentData:[
        ],
        estadoSeleccionado:true,
        valoresEstado: [{id:1,valor:true,descripcion:"Activa"},{id:2,valor:false,descripcion:"Inactiva"}],
        userTasksTable:null
    };
  },
  watch: {

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
    selectedTask() {
      return this.$store.state.selectedTask;
    },
  },
  methods: {
      addInstruction()
      {
          if(this.inputAddInstruction)
          {
            this.contentData.push({id:this.numberOfInstructions,data:this.inputAddInstruction})
            this.numberOfInstructions=this.numberOfInstructions+1
            this.cleanInstruction()
          }
      },
      viewandscoreTask(row)
      {
        console.log("Will set selected Lesson")
        this.$store.dispatch("setSelectedLesson", lesson);

        this.fileInput=lesson.associatedFile
        console.log("fileInput")
        console.log(this.fileInput)
        this.$router.push({name: 'revisaractividad', params: { fileInput: this.fileInput}});
      },
      cleanInstructionEdit()
      {
          this.inputEditInstruction=null
      },

      fetchUsertaks() {
      try {
        console.log(process.env.VUE_APP_BACKEND+":5000/api/usertasks/task/"+this.selectedTask._id)
        fetch(process.env.VUE_APP_BACKEND+":5000/api/usertasks/task/"+this.selectedTask._id, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {

              this.userTasksTable = data.data;
              console.log("this.userTasksTable")
              console.log(this.userTasksTable);
            } else {
              //this.$router.push("/login")
              this.tableData = [];
            }
          });
      } catch (e) {
        this.$store.dispatch("setAuth", false);
      }
    },
      submitTask()
      {
        if(!this.isEditTask)
        {
          fetch(process.env.VUE_APP_BACKEND+":5000/api/Tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: this.inputTaskName,
            description: this.inputTaskDescription,
            course: this.selectedCourse._id,
            isActive: this.estadoSeleccionado,
            content: this.contentData
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            console.log("resp Task:")
            console.log(resp)
            this.$router.push("/curso/actividades");
          })
          .catch((error)=>{
            this.$buefy.dialog.alert("Error al crear la Actividad");
          });
        }
        else
        {
          fetch(process.env.VUE_APP_BACKEND+":5000/api/Tasks/"+this.selectedTask._id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              name: this.inputTaskName,
              description: this.inputTaskDescription,
              course: this.selectedCourse._id,
              isActive: this.estadoSeleccionado,
              content: this.contentData
            }),
          })
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            console.log("resp Task:")
            console.log(resp)
            this.$router.push("/curso/actividades");
          })
          .catch((error)=>{
            this.$buefy.dialog.alert("Error al crear la Actividad");
          });
        }
      }
  },
  mounted() {
    if(this.selectedTask)
      {
        console.log("Sel less")
        console.log(this.selectedTask)
        this.isEditTask=true;
        this.inputTaskName=this.selectedTask.name;
        this.inputTaskDescription=this.selectedTask.description;
        this.estadoSeleccionado=this.selectedTask.isActive;
        this.contentData=this.selectedTask.content;

        this.fetchUsertaks()
      }
  },
};
</script>