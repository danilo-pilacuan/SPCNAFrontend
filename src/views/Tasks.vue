<template>
  <div class="home" v-if="selectedCourse">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Actividades</p>
        <b-button class="m-3" type="is-primary" @click="createTask"
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
                @click="viewTask(props.row)"
              >
              </b-button> -->
              <b-button
                rounded
                type="is-warning"
                icon-left="pencil"
                @click="editTask(props.row)"
              >
              </b-button>
              <b-button
                rounded
                type="is-danger"
                icon-left="delete"
                @click="deleteTask(props.row)"
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
                <b>{{deleteSelectedTask.name}}</b>
                </b-field>
                <b-field
                >
                <p>{{deleteSelectedTask.description}}</p>
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


  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
      showModalDelete: false,
      deleteSelectedTask: []
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
    createTask(){
      this.$router.push("/curso/createTask");
    },
    viewTask(){

    },
    editTask(row){
      this.$store.dispatch("setSelectedTask", row);
      this.$router.push("/curso/createTask");
    },
    deleteTask(row){
      this.deleteSelectedTask=row
      this.showModalDelete=true
    },
    submitDelete(){
      fetch(process.env.VUE_APP_BACKEND+":5000/api/tasks/"+this.deleteSelectedTask._id, {
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
            this.$buefy.dialog.alert("Actividad eliminada correctamente");

        });
        
    },
    fetchData() {
      console.log(process.env.VUE_APP_BACKEND+":5000/api/Tasks/course/"+this.selectedCourse._id)
      try {
        fetch(process.env.VUE_APP_BACKEND+":5000/api/Tasks/course/"+this.selectedCourse._id, {
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
      this.$store.dispatch("setSelectedTask", null);
    }
  },
};
</script>