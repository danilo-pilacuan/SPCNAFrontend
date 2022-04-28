<template>
  <div id="home" v-if="selectedCourse">   

    <div class="container" v-for="lesson,index in tableData" :key="index">
      <div class="block" v-if="lesson.isActive" @click="selectLesson(lesson)">
        <div class="columns">
          <div class="column">
              <section class="hero is-primary" style="cursor: pointer;">
              <div class="hero-body">
                <p class="title">{{lesson.name}}</p>
                <p class="subtitle">{{lesson.description}}</p>
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
    'selectedCourse': function (val, oldVal) {
      //Scroll to bottom
      this.fetchLessons();
    },
  },
  mounted() {
    console.log("Current course")
    console.log(this.selectedCourse)
    if(this.selectedCourse)
    {
        console.log("Sel cc")
        this.fetchLessons();
    }
  },
  methods: {
    fetchLessons()
    {
        try {
            fetch("http://localhost:5000/api/lessons/course/"+this.selectedCourse._id, {
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
    selectLesson(lesson)
    {
      this.fileInput=lesson.associatedFile
      console.log("fileInput")
      console.log(this.fileInput)
      this.$router.push({name: 'verleccion', params: { fileInput: this.fileInput}});
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