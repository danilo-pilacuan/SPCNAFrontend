<template>
  <div class="home" v-if="selectedCourse">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Lecciones</p>
        <b-button class="m-3" type="is-primary" @click="createLesson"
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
            label="Descripción"
            v-slot="props"
            searchable
          >
            {{ props.row.description }}
          </b-table-column>

          <b-table-column
            field="isActive"
            label="Estado"
            v-slot="props"
            searchable
          >
            {{ props.row.isActive ? "Activa" : "Inactiva" }}
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
                @click="editLesson(props.row)"
              >
              </b-button>
              <b-button
                rounded
                type="is-danger"
                icon-left="delete"
                @click="deleteLesson(props.row)"
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
                  label="¿Está seguro de eliminar la lección?:"
                >
                <b>{{deleteSelectedLesson.name}}</b>
                </b-field>
                <b-field
                >
                <p>{{deleteSelectedLesson.description}}</p>
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
            <p class="modal-card-title">Crear Lección</p>
            <button type="button" class="delete" @click="showModalCreate=false" />
          </header>
          <section class="modal-card-body">
            <div class="columns">
              <div class="column">
                <b-field
                class="has-text-left"
                  label="Nombre:"
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
                <b-button type="is-danger" @click="showModalCreate=false" label="Cancelar" />
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
    TableLessons: TableLessons,
  },
  data() {
    return {
      tableData:[],
      showModalDelete: false,
      showModalCreate:false,
      inputLessonName:null,
      inputLessonDescription:null,
      estadoSeleccionado:true,
      valoresEstado: [{id:1,valor:true,descripcion:"Activa"},{id:2,valor:false,descripcion:"Inactiva"}],
      deleteSelectedLesson: []
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
    createLesson(){
      this.showModalCreate=true
    },
    viewLesson(){

    },
    editLesson(row){
      this.$store.dispatch("setSelectedLesson", row);
      this.$router.push("/curso/editlesson");
    },
    deleteLesson(row){
      this.deleteSelectedLesson=row
      console.log(this.deleteSelectedLesson)
      this.showModalDelete=true
    },
    submitCreate(){
      fetch(process.env.VUE_APP_BACKEND+":5000/api/lessons", {
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
            this.fetchData();
            this.$buefy.dialog.alert("Lección creada correctamente");
            this.showModalCreate=false;
          })
          .catch((error)=>{
            this.$buefy.dialog.alert("Error al crear la lección");
          });
    },
    submitDelete(){
      fetch(process.env.VUE_APP_BACKEND+":5000/api/lessons/"+this.deleteSelectedLesson._id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          var resp = data.message;
          console.log(resp);
          
            this.showModalDelete=false;
            this.fetchData();
            this.$buefy.dialog.alert("Lección eliminada correctamente");
        });
        
    },
    fetchData() {
      console.log(process.env.VUE_APP_BACKEND+":5000/api/lessons/course/"+this.selectedCourse._id)
      try {
        fetch(process.env.VUE_APP_BACKEND+":5000/api/lessons/course/"+this.selectedCourse._id, {
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