<template>
  <div id="login" class="home">
    <div class="container">
      <div class="block">
        <div class="columns">
          <div class="column is-4"></div>
          <div class="column">
            <section class="section">
              <form @submit.prevent="submit">
                <!-- <b-checkbox v-model="hasError">Show errors</b-checkbox> -->
                <b-field
                  label="Usuario"
                  :type="{ 'is-danger': validateUsername }"
                  :message="{ 'Username is not available': validateUsername }"
                >
                  <b-input v-model="username" maxlength="30"></b-input>
                </b-field>

                <b-field
                  label="Contraseña"
                  :type="{ 'is-danger': validatePassword }"
                  :message="[
                    { 'Password is too short': validatePassword },
                    {
                      'Password must have at least 8 characters':
                        validatePassword,
                    },
                  ]"
                >
                  <b-input
                    v-model="password"
                    type="password"
                    maxlength="30"
                  ></b-input>
                </b-field>
                <b-field
                  label=""
                  :type="{ 'is-danger': loginFailed }"
                  :message="{ 'Login fallido': loginFailed }"
                >
                </b-field>
                <b-button type="is-primary" @click="submit" label="Iniciar Sesión" />    
              </form>
            </section>
          </div>
          <div class="column is-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      loginFailed: false,
      validatePassword: false,
      validateUsername: false,
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
  methods: {
    submit() {
      fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: this.username, password: this.password }),
      })
        .then((response) => response.json())
        .then((data) => {
          var resp = data.message;
          console.log(resp);
          if (resp == "success") {
            this.authLogin();
            this.$router.push("/");
          } else this.loginFailed = true;
        });
    },
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
};
</script>