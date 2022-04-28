<template>
  <div v-if="selectedCourse">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Actividad</p>
        <b-button class="m-3" type="is-primary" @click="submitTask"
          >Guardar</b-button
        >
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
                <b-input v-model="inputTaskContent" maxlength="50"></b-input>
            </b-field> -->
            <div class="has-text-left">
                <b><p>Contenido</p></b>
            </div>
            <b-table
          :data="contentData"
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

         

          <b-table-column field="actions" label="Acciones" v-slot="props" width="15%">
            <div class="buttons">
              <b-button
                rounded
                type="is-warning"
                icon-left="pencil"
                @click="editInstruction(props.row)"
              >
              </b-button>
              <b-button
                rounded
                type="is-danger"
                icon-left="delete"
                @click="deleteInstruction(props.row)"
              >
              </b-button>
            </div>
          </b-table-column>
        </b-table>
        <b-field
                class="has-text-left mt-3"
                label="Añadir Instrucción"
            >
                <div class="card p-3 mb-1" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
                    <div class="columns">
                    <div class="column is-11">
                        <b-input v-model="inputAddInstruction" maxlength="250" type="textarea"></b-input>
                    </div>
                    <div class="column is-1">
                        <b-button
                        class="mt-3"
                rounded
                type="is-link"
                icon-left="plus"
                @click="addInstruction()"
              >
              </b-button>
              <b-button
              class="mt-3"
                rounded
                type="is-danger"
                icon-left="delete"
                @click="cleanInstruction()"
              >
              </b-button>
                    </div>
                </div>
                </div>
            </b-field>
        </div>
      </div>
      <footer class="card-footer">
        <b-button class="m-3" type="is-primary" @click="submitTask"
          >Guardar</b-button
        >
      </footer>
    </div>
    <b-modal v-model="showModalEdit">
        
      <form @submit.prevent="confirmEdit">
        
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
                label="Editar Instrucción"
            >
                <div class="card p-3 mb-1" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
                    <div class="columns">
                    <div class="column is-11">
                        <b-input v-model="inputEditInstruction" maxlength="250" type="textarea"></b-input>
                    </div>
                    <div class="column is-1">
              <b-button
              class="mt-3"
                rounded
                type="is-danger"
                icon-left="delete"
                @click="cleanInstructionEdit()"
              >
              </b-button>
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
                <b-button type="is-warning" @click="confirmEdit" label="Actualizar" />
              </div>
              <div class="column">
                <b-button type="is-primary" @click="showModalEdit=false" label="Cancelar" />
              </div>
            </div>
          </footer>
        </div>
      </form>
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
    };
  },
  watch: {
    selectedTask (newValue) {
      if(this.selectedTask)
      {
        this.isEditTask=true;
        this.inputTaskName=this.selectedTask.name;
        this.inputTaskDescription=this.selectedTask.descripcion;
        this.estadoSeleccionado=this.selectedTask.isActive;
        this.contentData=this.selectedTask.content;
        if(this.selectedTask.content[this.selectedTask.content.length-1])
        {
          this.numberOfInstructions=this.selectedTask.content[this.selectedTask.content.length-1].id+1;
        }
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
      editInstruction(row)
      {
        this.inputEditInstruction=row.data;
        this.selectedInstruction=row;
        this.showModalEdit=true
      },
      deleteInstruction(row)
      {
        console.log("Del row")
        console.log(row.id)
        this.contentData=this.contentData.filter(element=>element.id!=row.id)


      },
      cleanInstruction()
      {
          this.inputAddInstruction=null
      },
      confirmEdit()
      {
        if(this.inputEditInstruction)
        {
          var indexEdit = this.contentData.findIndex((obj => obj.id == this.selectedInstruction.id));
          console.log("Index Edit")
          console.log(indexEdit)
          this.contentData[indexEdit].data=this.inputEditInstruction;
          this.inputEditInstruction=null,
          this.showModalEdit=false;
        }
      },
      cleanInstructionEdit()
      {
          this.inputEditInstruction=null
      },
      submitTask()
      {
        if(!this.isEditTask)
        {
          fetch("http://localhost:5000/api/Tasks", {
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
          fetch("http://localhost:5000/api/Tasks/"+this.selectedTask._id, {
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
        if(this.selectedTask.content[this.selectedTask.content.length-1])
        {
          this.numberOfInstructions=this.selectedTask.content[this.selectedTask.content.length-1].id+1;
        }
      }
  },
};
</script>