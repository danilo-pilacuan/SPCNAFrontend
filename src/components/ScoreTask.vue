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
                <b-input v-model="inputTaskName" maxlength="50" disabled="true"></b-input>
            </b-field>
            <b-field
                class="has-text-left"
                label="Descripción"
            >
                <b-input v-model="inputTaskDescription" maxlength="150" disabled="true"></b-input>
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
                @click="editScore(props.row)"
                >
                </b-button>
                <b-button
                rounded
                type="is-link"
                icon-left="eye"
                @click="viewandscoreTask(props.row)"
                >
                </b-button>
            </div>
            </b-table-column>
         

          
        </b-table>

        </div>
      </div>
    </div>
<b-modal v-model="showModalEdit">
        

        
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Editar</p>
            <button type="button" class="delete" @click="showModalEdit=false" />
          </header>
          <section class="modal-card-body">
            <div class="columns">
              <div class="column">
                <b-field
                class="has-text-left mt-3"
                label="Calificación"
            >
                <div class="card p-3 mb-1" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
                    <div class="columns">
                    <div class="column is-11">
                        <b-input v-model="inputCalificacion" maxlength="250"></b-input>
                    </div>
                </div>
                </div>
            </b-field>
              </div>
            </div>

          </section>
          <footer class="modal-card-foot">
            <div class="columns">
              <div class="column">
                <b-button type="is-success" @click="confirmEdit" label="Guardar" />
              </div>
              <div class="column">
                <b-button type="is-primary" @click="showModalEdit=false" label="Cancelar" />
              </div>
            </div>
          </footer>
        </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
        inputTaskName:null,
        inputTaskDescription: null,
        inputTaskContent:null,
        inputCalificacion:0,
        validateCourseName: false,
        inputAddInstruction:null,
        showModalEdit:false,
        inputEditInstruction: null,
        selectedInstruction:null,
        selectedUserTask:null,
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
        //this.$store.dispatch("setSelectedLesson", row);

        this.fileInput=row.scriptFile
        console.log("fileInput")
        console.log(this.fileInput)
        this.$router.push({name: 'revisaractividad', params: { fileInput: this.fileInput}});
      },
      editScore(row)
      {
        this.selectedUserTask=row
        this.showModalEdit=true
        this.inputCalificacion=row.score
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

              this.userTasksTable= data.data;
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
    confirmEdit()
    {
      fetch(process.env.VUE_APP_BACKEND+":5000/api/usertasks/"+this.selectedUserTask._id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              score: this.inputCalificacion,
              hasScore:true
            }),
          })
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            console.log("resp Task:")
            console.log(resp)
            this.$buefy.dialog.alert("Calificación guardada con éxito");
            this.showModalEdit=false
            this.inputCalificacion=0
            this.fetchUsertaks()
          })
          .catch((error)=>{
            this.$buefy.dialog.alert("Error guardar calificación");
          });
    },
      
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