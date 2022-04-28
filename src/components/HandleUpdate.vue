<template>
    
</template>
<script>
export default {
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
   data(){
        return{
            courseId: null
        }
    },
    beforeMount(){
        if(!this.selectedCourse)
        {
            console.log("not sc")
            if(this.$cookies.get("courseId"))
            {
                this.courseId=this.$cookies.get("courseId")
                this.fetchCourse();
            }
            else
            {
                this.$router.push("/cursos");
            }
        }
    },
    methods: {
        fetchCourse() {
        try {
            fetch("http://localhost:5000/api/courses/"+this.courseId, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            })
            .then((response) => response.json())
            .then((data) => {
                var resp = data;

                if (data) {
                
                console.log("Curso current")
                this.$store.dispatch("setSelectedCourse", data);
                this.$cookies.set('courseId', data._id)
                console.log(resp);
                } else {
                //this.$router.push("/login")
                this.tableData = [];
                }
            });
        } catch (e) {
            this.$store.dispatch("setSelectedCourse", null);
        }
        },
    },
}
</script>