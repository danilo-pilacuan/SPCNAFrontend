<template>
  <div id="adminCourses" class="home">
    <UserHandle/>
    <div class="container" v-if="currentUser">
      <div class="block">
        <div class="columns">
          <div class="column is-narrow">
            <h1>Administración Cursos</h1>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <b-button type="is-primary" @click="addCourse">Crear</b-button>
          </div>

        </div>
        <div class="columns" v-show="isAddCourse || isEditCourse">
          <div class="column is-2"></div>
          <div class="column">
            
            
          </div>
          <div class="column is-2"></div>
        </div>
        <div class="columns">
          <div class="column is-1"></div>
          <div class="column">
            <!-- ----------- -->
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
              <b-table-column
                field="name"
                label="Nombre"
                v-slot="props"
                searchable
              >
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
                {{ props.row.isActive?"Activo":"Inactivo" }}
              </b-table-column>
 

              <b-table-column field="actions" label="Acciones" v-slot="props">
                <div class="buttons">
                  <b-button
                    rounded
                    type="is-warning"
                    icon-left="pencil"
                    @click="editCourse(props.row)"
                  >
                  </b-button>
                  <b-button
                    rounded
                    type="is-danger"
                    icon-left="delete"
                    @click="deleteCourse(props.row)"
                  >
                  </b-button>
                </div>
              </b-table-column>
            </b-table>

            <!-- ---------- -->
          </div>
          <div class="column is-1"></div>
        </div>
        
      <b-modal v-model="showModalCreateEdit">
        
      <form @submit.prevent="submit">
        
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p v-show="isAddCourse" class="modal-card-title">Crear Curso</p>
            <p v-show="isEditCourse" class="modal-card-title">Editar Curso</p>
            <button type="button" class="delete" @click="cancel" />
          </header>
          <section class="modal-card-body">
            <div class="columns">
              <div class="column">
                <b-field
                  label="Nombre Curso"
                  :type="{ 'is-danger': validateCourseName }"
                  :message="{ 'Username is not available': validateCourseName }"
                >
                  <b-input v-model="courseName" maxlength="50"></b-input>
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field
                  label="Descripción curso"
                  :type="{ 'is-danger': validateCourseDescription }"
                  :message="{ 'Username is not available': validateCourseDescription }"
                >
                  <b-input v-model="courseDescription" maxlength="300"></b-input>
                </b-field>
              </div>
            </div>    
            <div class="columns">
              <div class="column">
                <b-field
                  label="Estado"
                  :type="{ 'is-danger': validateCourseDescription }"
                  :message="{ 'Username is not available': validateCourseDescription }"
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
                <b-button type="is-primary" v-show="isEditCourse" @click="submit" label="Actualizar" />
                <b-button type="is-primary" v-show="isAddCourse" @click="submit" label="Crear" />
              </div>
              <div class="column">
                <b-button type="is-danger" @click="cancel" label="Cancelar" />
              </div>
            </div>
          </footer>
        </div>
      </form>
    </b-modal>

    <b-modal v-model="showModalDelete">
        
      <form @submit.prevent="confirmDelete">
        
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Eliminar Curso</p>
            <button type="button" class="delete" @click="showModalDelete=false" />
          </header>
          <section class="modal-card-body">
            <div class="columns">
              <div class="column">
                <b-field
                  label="¿Está seguro de eliminar el Curso?:"
                >
                <b>{{deleteSelectedCourse.name}}</b>
                </b-field>
                <b-field
                >
                <p>{{deleteSelectedCourse.description}}</p>
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
    </div>
  </div>
</template>

<script>
import UserHandle from '../components/UserHandle'
export default {
  components: {
    "UserHandle": UserHandle
  },
  data() {
    return {
      courseName:"",
      courseDescription:"",
      updateFailed: false,
      editSelectedCourse: null,
      deleteSelectedCourse: {name: "Ninguno"},
      showModalCreateEdit: false,
      validateCourseDescription: false,
      validateCourseName: false,
      tableData: [],
      isAddCourse: false,
      valoresEstado: [{id:1,valor:true,descripcion:"Activo"},{id:2,valor:false,descripcion:"Inactivo"}],
      estadoSeleccionado: true,
      isEditCourse: false,
      showModalDelete: false,
      columns: [
        // {
        //     field: '_id',
        //     label: 'ID',
        //     //width: '40,
        //     //numeric: true
        // },
        {
          field: "name",
          label: "Nombre",
        },
        {
          field: "description",
          label: "Descripcion",
        },
        // {
        //   field: "typeDescription",
        //   label: "Tipo de usuario",
        // },
      ],
    };
  },
  watch: {
    'currentUser': function (val, oldVal) {
      //Scroll to bottom
      this.fetchCourses()
    },
  },
  mounted() {
    this.fetchCourses()
  },
  computed:{
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
  methods: {
    fetchCourses() {
      try {
        fetch(process.env.VUE_APP_BACKEND+":5000/api/courses/owner/"+this.currentUser._id, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tableData = data;
              
              //console.log(resp);
            } else {
              //this.$router.push("/login")
              this.tableData = [];
            }
          });
      } catch (e) {
        this.$store.dispatch("setAuth", false);
      }
    },
    addCourse() {
      this.showModalCreateEdit= true
      this.isAddCourse = true;
      this.isEditCourse=false;
      this.courseName="";
      this.courseDescription="";
    },
    editCourse(row) {
      this.courseName=row.name;
      this.courseDescription=row.description;
      this.estadoSeleccionado=row.isActive;
      this.showModalCreateEdit= true
      this.isAddCourse = false;
      this.isEditCourse=true;
      this.editSelectedCourse=row;
    },
    deleteCourse(row) {
      this.courseName=null;
      this.courseDescription=null;
      this.showModalCreateEdit= false
      this.isAddCourse = false;
      this.isEditCourse=false;
      this.showModalDelete=true;
      this.deleteSelectedCourse=row;
    },
    submitDelete()
    {
      fetch(process.env.VUE_APP_BACKEND+":5000/api/courses/"+this.deleteSelectedCourse._id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          var resp = data.message;
          console.log(resp);
          
            this.showModalDelete=false;
            this.$buefy.dialog.alert("Curso eliminado correctamente");
        });
        
        this.fetchCourses()
    },
    submit() {
      if (this.isAddCourse) {
        fetch(process.env.VUE_APP_BACKEND+":5000/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(
          { name: this.courseName,
          description:this.courseDescription,
          teacherOwner:this.currentUser._id,
          isActive: this.estadoSeleccionado
          }),
      })
        .then((response) => response.json())
        .then((data) => {
          var resp = data.message;
          console.log(resp);
          
            this.cancel();
            this.$buefy.dialog.alert("Curso agregado correctamente");

        });
        
        this.fetchCourses()
      } else if (this.isEditCourse) {
        console.log(process.env.VUE_APP_BACKEND+":5000/api/courses/"+this.editSelectedCourse._id)
        fetch(process.env.VUE_APP_BACKEND+":5000/api/courses/"+this.editSelectedCourse._id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(
          { name: this.courseName,
          description:this.courseDescription,
          teacherOwner:this.currentUser._id,
          isActive: this.estadoSeleccionado
          }),
      })
        .then((response) => response.json())
        .then((data) => {
          var resp = data.message;
          console.log(resp);
          
            this.cancel();
            this.$buefy.dialog.alert("Curso editado correctamente");
            this.fetchCourses()
        });
        
        
        
      }
    },
    cancel() {
      this.courseName="";
      this.courseDescription="";
      this.isAddCourse = false;
      this.isEditCourse = false;
      this.showModalCreateEdit=false;
      //this.$buefy.dialog.alert("Usuario agregado correctamente");
    },
  },
};
</script>

<style>
</style>