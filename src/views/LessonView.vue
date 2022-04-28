<template>
  <div id="home" v-if="selectedLesson">   

    <div class="container" v-for="instruccion,index in selectedLesson.content" :key="index">
      <div class="block" @click="selectCourse()">
        <div class="columns">
          <div class="column">
              <section class="hero is-primary" style="cursor: pointer;">
              <div class="hero-body">
                <p class="title">{{instruccion.data}}</p>
                <!-- <p class="subtitle">{{curso.description}}</p> -->
              </div>
            </section>
          </div>
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
  },
  watch: {
    'currentUser': function (val, oldVal) {
      //Scroll to bottom
      
    },
  },
  mounted() {
    console.log("Current user11")
    console.log(this.currentUser)
  },
  methods: {
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