<template>
    <div>
    </div>
</template>
<script>
export default {
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
    data(){
        return {
            HW: "sadsda"
        }
    },
    methods:{
        authLogin() {
            console.log("UserHandle")
            try {
                fetch("http://localhost:5000/api/users/get", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                })
                .then((response) => response.json())
                .then((data) => {
                    var resp = data;
                    if (data._id) {
                    if (data.userType) {
                        this.$store.dispatch("setUserType", data.userType);
                        this.$store.dispatch("setCurrentUser",data)
                        this.$cookies.set('userId', data._id)
                    }
                    this.$store.dispatch("setAuth", true);
                    } else {
                    this.$router.push("/login");
                    }
                });
            } catch (e) {
                this.$store.dispatch("setAuth", false);
            }
        },
    },
    mounted(){
        console.log("mounted UH")
        this.authLogin();
    }
}
</script>