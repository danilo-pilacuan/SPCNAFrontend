<template>
  <div id="login" class="home" >
    <UserHandle />
    <Keypress
      key-event="keyup"
      :multiple-keys="multiple"
      @success="procesarTecladoAlt"
      @wrong="procesarNoAlt"
    />

    <VoiceComponent
      ref="componenteSpeak"
      :texto="texto"
      :reproducir="reproducir"
      @onTexto="emitTexto"
      @onReproducir="emitReproducir"
      v-if="enableVoice"
    ></VoiceComponent>

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
                  <b-input v-model="username" maxlength="30" ref="inputName"></b-input>
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
                  ref="inputPass"
                    v-model="password"
                    type="password"
                    maxlength="30"
                  ></b-input>
                </b-field>

                <b-field
                  label="Desactivar voz"
                >
                  <b-switch v-model="enableVoice"
                  
                  >
                  </b-switch>
                </b-field>

                <b-field
                  label=""
                  :type="{ 'is-danger': loginFailed }"
                  :message="{ 'Login fallido': loginFailed }"
                >
                </b-field>
                <b-button
                  type="is-primary"
                  @click="submit"
                  label="Iniciar Sesión"
                />
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
import VoiceComponent from "/src/components/VoiceComponent";
import UserHandle from "../components/UserHandle.vue";

export default {
  components: {
    VoiceComponent: VoiceComponent,
    UserHandle: UserHandle,
    Keypress: () => import("vue-keypress"),
  },
  data() {
    return {
      texto: "Prueba texto", //"Bienvenido, presione alt mas w para ir al area de trabajo o alt mas ye para recibir ayuda",
      reproducir: false,
      enableVoice:true,

      //Necesarios para keypress
      pressedKeyCode: null,
      multiple: [
        {
          keyCode: "B".charCodeAt(0), //
          modifiers: ["altKey"],
          preventDefault: true,
        },
        {
          keyCode: "M".charCodeAt(0), //
          modifiers: ["altKey"],
          preventDefault: true,
        },
        {
          keyCode: "C".charCodeAt(0), //
          modifiers: ["altKey"],
          preventDefault: true,
        },
        {
          keyCode: "A".charCodeAt(0), //
          modifiers: ["altKey"],
          preventDefault: true,
        },
        {
          keyCode: "H".charCodeAt(0), // H
          modifiers: ["altKey"],
          preventDefault: true,
        },
        {
          keyCode: "X".charCodeAt(0), // H
          modifiers: ["altKey"],
          preventDefault: true,
        },
        {
          keyCode: "Y".charCodeAt(0), // H
          modifiers: ["altKey"],
          preventDefault: true,
        },
        {
          keyCode: "Z".charCodeAt(0), // H
          modifiers: ["altKey"],
          preventDefault: true,
        },
        {
          keyCode: 38,
          modifiers: ["altKey"],
          preventDefault: true,
        },
        {
          keyCode: 40,
          modifiers: ["altKey"],
          preventDefault: true,
        },
      ],

      //data
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
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  mounted() {
    if(this.authenticated)
    {
      this.$router.push("/")
    }
    this.activateVoiceComponent();
  },
  methods: {
    submit() {
      fetch(process.env.VUE_APP_BACKEND + ":5000/api/users/login", {
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
          } 
          else 
          {
            this.loginFailed = true;
            this.$refs.componenteSpeak.quickSpeak("Inicio de sesión fallido");  
          }
        });
    },
    authLogin() {
      console.log("UserHandle");
      try {
        fetch(process.env.VUE_APP_BACKEND + ":5000/api/users/get", {
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
                this.$store.dispatch("setCurrentUser", data);
                this.$store.dispatch("setAuth", true);
              }
              
            } else {
              this.$router.push("/login");
            }
          });
      } catch (e) {
        this.$store.dispatch("setAuth", false);
      }
    },
    activateVoiceComponent() {
      setTimeout(() => {
        this.playMenu();

        //this.reproducir=true
      }, 2000);
    },
    playMenu() {
      this.$t("MenuLogin").forEach((element) => {
        this.$refs.componenteSpeak.quickSpeak(element);
        console.log(element);
      });
    },
    procesarTecladoAlt(response) {      
      if (response.event.keyCode == "B".charCodeAt(0)) {
        this.$refs.componenteSpeak.quickSpeak("Ingrese su contraseña");     
        this.$refs.inputPass.focus();
      }

      if (response.event.keyCode == "C".charCodeAt(0)) {
        this.submit()
      }

      if (response.event.keyCode == "M".charCodeAt(0)) {
        this.playMenu()
      }


      if (response.event.keyCode == "H".charCodeAt(0)) {
        this.$t("homeHelp").forEach(element => {
          this.$refs.componenteSpeak.quickSpeak(element)
        }); 
      }      
      if (response.event.keyCode == "X".charCodeAt(0)) {
          this.$refs.componenteSpeak.pauseSpeak()
      }      

      if (response.event.keyCode == "Y".charCodeAt(0)) {
        
          this.$refs.componenteSpeak.resumeSpeak()        
      }      

      if (response.event.keyCode == "Z".charCodeAt(0)) {
        this.$refs.componenteSpeak.restartSpeak()
      } 

      if (response.event.keyCode == "A".charCodeAt(0)) {
        this.$refs.componenteSpeak.quickSpeak("Ingrese su nombre de usuario");     
        this.$refs.inputName.focus();
        
      } 
      
      
      
    },
    procesarNoAlt(response)
    {
      let charEvent=response.event.key;
      if(charEvent!=="Alt" && charEvent!=="Shift" && charEvent!=="Control")
      {
        this.$refs.componenteSpeak.quickSpeak(charEvent);     
      }
      

    },
    playChar(event)
    {
      console.log(event)
    },
    
    emitTexto(valor, valor2) {
      console.log("Procesar Texto")
      this.texto=valor
      console.log(valor)
      
    },
    emitReproducir(valor, valor2) {
      this.reproducir=valor
      console.log("Procesar CT")
      console.log(valor)
      
    },
  },
};
</script>