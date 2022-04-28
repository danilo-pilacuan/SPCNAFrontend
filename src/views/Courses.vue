<template>
  <div id="home">
    <!-- <div class="container">
      <div class="block">
        <div class="columns">
          <div class="column">
            <b-button type="is-primary" @click="isSelectCourse = true"
              >Seleccionar Curso</b-button
            >
          </div>
        </div>
      </div>
    </div> -->

    
    

    <div class="container" v-for="curso,index in tableData" :key="index" v-show="userType == 2">
      <div class="block" v-if="curso.isActive" @click="selectCourse(curso)">
        <div class="columns">
          <div class="column">
              <section class="hero is-primary" style="cursor: pointer;">
              <div class="hero-body">
                <p class="title">{{curso.name}}</p>
                <p class="subtitle">{{curso.description}}</p>
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
    }
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
  methods: {
    selectCourse(curso)
    {
      this.$store.dispatch("setSelectedCourse", curso);
      console.log("CourseId: "+curso._id)
      this.$cookies.set('courseId', curso._id)
      this.$router.push("/curso");
    },
    fetchCourses() {
      try {
        fetch("http://localhost:5000/api/courses/owner/"+this.currentUser._id, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tableData = data;
              console.log("Cursos user")
              console.log(resp);
            } else {
              //this.$router.push("/login")
              this.tableData = [];
            }
          });
      } catch (e) {
        this.$store.dispatch("setAuth", false);
      }
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