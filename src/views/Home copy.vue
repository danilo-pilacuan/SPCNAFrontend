<template>
  <div id="home" tabindex="-1" @keydown.alt="handleKeydownAlt">
    <div class="container"> <!-- v-show="userType == 1"> -->
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary">
              <div class="hero-body">
                <p class="title">Usuarios</p>
                <p class="subtitle">Administración de Usuarios</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div class="container" > <!--v-show="userType == 2">-->
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary">
              <div class="hero-body">
                <p class="title">Cursos</p>
                <p class="subtitle">Administración de Cursos</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div class="container"> <!-- v-show="userType == 3">-->
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary">
              <div class="hero-body">
                <p class="title">Cursos</p>
                <p class="subtitle">Ingresar curso</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div class="container"> <!--v-show="userType == 2 || userType == 3">-->
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary">
              <div class="hero-body">
                <p class="title">Lecciones</p>
                <p class="subtitle" v-show="userType == 2">
                  Administración lecciones
                </p>
                <p class="subtitle" v-show="userType == 3">Tomar lecciones</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div class="container"> <!-- v-show="userType == 2 || userType == 3">-->
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary">
              <div class="hero-body">
                <p class="title">Actividades</p>
                <p class="subtitle" v-show="userType == 2">
                  Administración actividades
                </p>
                <p class="subtitle" v-show="userType == 3">
                  Realizar actividades
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="container">
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary">
            <div class="hero-body">
                <p class="title">Primary hero</p>
                <p class="subtitle">Primary subtitle</p>
            </div>
            </section>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <h1>authenticated</h1>
    <h2 v-if="authenticated">Si</h2>
    <h2 v-else>No</h2>
    <h1>userType</h1>
    <h2>{{ userType }}</h2> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: false,
      hello: "hello world",
      textarea:
        "solve(x^2+4*x+4)\nexpand((x+y+z)^3)\node2('diff(y,x)+3*x*y = sin(x)/x,y,x)\nsum(f(i),i,0,m) * sum(g(j),j,0,n)",
      value: 0,
      valueSelVoices: [],
      valuePitch: 0.5,
      valueRate: 0,
      synth: [],
      formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$",
      resultadoMaxima: "",
      valueVolume: 50,
      voicesSpeech: [],
    };
  },
  mounted() {

    this.voicesSpeech = window.speechSynthesis.getVoices();
    this.synth = window.speechSynthesis;
    if (this.voicesSpeech[0]) {
      console.log("esp");

      this.valueSelVoices = this.voicesSpeech[24];
      console.log(this.valueSelVoices);
    } else {
      console.log("no esp");
      this.valueSelVoices = "";
    }
    console.log(this.authenticated);
    console.log(this.userType);
    if (this.authenticated == true && this.userType == 3) {
      this.speak(
        "Bienvenido, presione alt mas w para ir al area de trabajo o alt mas ye para recibir ayuda"
      );
    } else {
      console.log(this.authenticated);
      console.log(this.userType);
      console.log("unauthenticated");
    }
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
    speak(texttospeak) {
      if (texttospeak !== "") {
        var utterThis = new SpeechSynthesisUtterance(texttospeak);
        console.log(this.valueSelVoices);
        var selectedOption = this.valueSelVoices;
        utterThis.voice = selectedOption;
        utterThis.rate = Math.pow(
          Math.abs(this.valueRate) + 1,
          this.valueRate < 0 ? -1 : 1
        );
        utterThis.pitch = this.valuePitch;
        this.synth.speak(utterThis);
        console.log(selectedOption);
      }
    },
    handleKeydownAlt(e){
      console.log(e.key);
      //this.speak(e.key);
      if(e.key=="w")
      {
        this.$router.push("/areatrabajo");
      }
    },

  },
};
</script>

<style>
</style>