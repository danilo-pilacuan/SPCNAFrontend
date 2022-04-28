<template>
  <div id="home" v-if="selectedCourse">   

    <div class="container" v-for="userTask,index in tableData" :key="index">
      <div v-if="userTask.task">
          <div class="block" v-if="userTask.task.isActive" @click="selectTask(userTask)">
            <div class="columns">
              <div class="column">
                  <section class="hero is-primary" style="cursor: pointer;">
                  <div class="hero-body">
                    <p class="title">{{userTask.task.name}}</p>
                    <p class="subtitle">{{userTask.task.description}}</p>
                  </div>
                </section>
              </div>
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
    selectedUserTask(){
        return this.$store.state.selectedUserTask;
    }
  },
  watch: {
    'selectedCourse': function (val, oldVal) {
      //Scroll to bottom
      this.fetchTasks();
    },
  },
  mounted() {
    console.log("Current course")
    console.log(this.selectedCourse)
    if(this.selectedCourse)
    {
        console.log("Sel cc")
        this.fetchTasks();
    }
  },
  methods: {
    fetchTasks()
    {
        try {
            console.log("http://localhost:5000/api/usertasks/usertask/"+this.selectedCourse._id+"/"+this.currentUser._id)
            fetch("http://localhost:5000/api/usertasks/usertask/"+this.selectedCourse._id+"/"+this.currentUser._id, {
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
    selectTask(userTask)
    {
        this.$store.dispatch("setSelectedUserTask", userTask);
        this.$router.push("/veractividad");
    
    //   this.$router.push({name: 'veractividad', params: { fileInput: this.fileInput}});
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