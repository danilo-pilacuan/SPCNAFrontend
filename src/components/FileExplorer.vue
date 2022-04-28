<template>
  <div class="home" v-if="selectedCourse">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Archivos</p>
        <b-button class="m-3" type="is-primary" @click="createFile"
          >Crear</b-button
        >
      </header>
      <div class="card-content">
        <b-table
          :data="tableData"
          :bordered="true"
          :striped="true"
          :narrowed="false"
          :hoverable="false"
          :loading="false"
          :focusable="false"
          :mobile-cards="false"
          :searchable="true"
        >
          <b-table-column field="name" label="Nombre" v-slot="props" searchable>
            {{ props.row.name }}
          </b-table-column>

          <b-table-column
            field="description"
            label="Fecha Creación"
            v-slot="props"
            searchable
          >
            {{ props.row.created }}
          </b-table-column>


          <b-table-column field="actions" label="Acciones" v-slot="props">
            <div class="buttons">
              <!-- <b-button
                rounded
                type="is-link"
                icon-left="eye"
                @click="viewLesson(props.row)"
              >
              </b-button> -->
              <b-button
                rounded
                type="is-warning"
                icon-left="pencil"
                @click="editScriptFile(props.row)"
              >
              </b-button>
              <b-button
                rounded
                type="is-danger"
                icon-left="delete"
                @click="deleteScriptFile(props.row)"
              >
              </b-button>
            </div>
          </b-table-column>
        </b-table>
      </div>
    </div>

    <b-modal v-model="showModalDelete">
        
      <form @submit.prevent="confirmDelete">
        
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Eliminar Lección</p>
            <button type="button" class="delete" @click="showModalDelete=false" />
          </header>
          <section class="modal-card-body">
            <div class="columns">
              <div class="column">
                <b-field
                  label="¿Está seguro de eliminar el archivo?:"
                >
                <b>{{deleteSelectedFile.name}}</b>
                </b-field>
              </div>
            </div>

          </section>
          <footer class="modal-card-foot">
            <div class="columns">
              <div class="column">
                <b-button type="is-danger" @click="submitDelete" label="Eliminar" />
              </div>
              <div class="column">
                <b-button type="is-primary" @click="showModalDelete=false" label="Cancelar" />
              </div>
            </div>
          </footer>
        </div>
      </form>
    </b-modal>

    <b-modal v-model="showModalCreate">
        
      <form @submit.prevent="submitCreate">
        
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Crear Archivo Script</p>
            <button type="button" class="delete" @click="showModalCreate=false" />
          </header>
          <section class="modal-card-body">
            <div class="columns">
              <div class="column">
                <b-field
                  label="Nombre:"
                  :type="{ 'is-danger': validateFileName }"
                  :message="{ 'Username is not available': validateFileName }"
                >
                  <b-input v-model="inputFileName" maxlength="50"></b-input>
                </b-field>
              </div>
            </div>

          </section>
          <footer class="modal-card-foot">
            <div class="columns">
              <div class="column">
                <b-button type="is-primary" @click="submitCreate" label="Crear" />
              </div>
              <!-- <div class="column">
                <b-button type="is-info" @click="submitAndEdit" label="Crear y Editar" />
              </div> -->
              <div class="column">
                <b-button type="is-danger" @click="submitDelete=false" label="Cancelar" />
              </div>
            </div>
          </footer>
        </div>
      </form>
    </b-modal>


  </div>
</template>

<script>
import TableLessons from "../components/TableLessons";

export default {
  components: {
    TableLessons: TableLessons
  },
  data() {
    return {
      tableData:[],
      showModalDelete: false,
      showModalCreate: false,
      deleteSelectedFile: [],
      inputFileName:null,
      validateFileName:false,
      fileInput: null
    };
  },
  watch:
  {
    selectedCourse (newValue) {
       if(this.selectedCourse)
       {
         this.fetchData();
       }
     },
     value (newValue) {
       this.valorTextArea = this.value
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
  },
  methods: {
    createFile(){
      this.showModalCreate=true
    },
    viewLesson(){

    },
    editLesson(row){
      this.$store.dispatch("setSelectedLesson", row);
      this.$router.push("/curso/createlesson");
    },
    deleteScriptFile(row){
      this.deleteSelectedFile=row
      this.showModalDelete=true
    },
    submitCreate(){
      fetch("http://localhost:5000/api/scripts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: this.inputFileName,
          course: this.selectedCourse._id,
          owner: this.currentUser._id,
          content: null
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        var resp = data;
        console.log("resp filescript:")
        console.log(resp)
        this.$buefy.dialog.alert("Archivo creado satisfactoriamente");
        this.showModalCreate=false
        this.inputFileName=""
        this.fetchData()
        //this.$router.push("/curso/lecciones");
      })
      .catch((error)=>{
        this.$buefy.dialog.alert("Error al crear el archivo");
      });
    },
    submitAndEdit(){

    },
    editScriptFile(row)
    {
      this.fileInput=row
      console.log("fileInput")
      console.log(this.fileInput)
      this.$router.push({name: 'areatrabajo', params: { fileInput: this.fileInput}});
    },
    submitDelete(){
      fetch("http://localhost:5000/api/scripts/"+this.deleteSelectedFile._id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          var resp = data.message;
          console.log(resp);
          
            this.showModalDelete=false;
            this.$buefy.dialog.alert("Archivo eliminado correctamente");
            this.fetchData();
        });
        
    },
    fetchData() {
      try {
        fetch("http://localhost:5000/api/scripts/course/"+this.selectedCourse._id, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {

              this.tableData = data;
              
              console.log(this.tableData);
            } else {
              //this.$router.push("/login")
              this.tableData = [];
            }
          });
      } catch (e) {
        this.$store.dispatch("setAuth", false);
      }
    },

  },
  mounted() {
    if(this.selectedCourse)
    {
      this.fetchData();
      this.$store.dispatch("setSelectedLesson", null);
    }
  },
};
</script>