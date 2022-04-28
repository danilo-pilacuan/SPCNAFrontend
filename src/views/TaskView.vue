<template>
  <div id="home" v-if="selectedUserTask">   

    <!-- <div class="container" v-for="instruccion,index in selectedUserTask.task.content" :key="index">
      <div class="block" @click="selectCourse()">
        <div class="columns">
          <div class="column">
              <section class="hero is-primary" style="cursor: pointer;">
              <div class="hero-body">
                <p class="title">{{instruccion.data}}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div> -->

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
        </div>
      </div>

    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
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
    console.log("Current user11")
    console.log(this.currentUser)
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
  },
  
};
</script>

<style>
</style>