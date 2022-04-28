<template>
  <div id="home" tabindex="-1" @keydown.alt="handleKeydownAlt">
    <div class="container"> <!-- v-show="userType == 2 || userType == 3">-->
      <div class="block" @click="selectLessons()">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary" style="cursor: pointer;">
              <div class="hero-body">
                <p class="title">Lecciones</p>
                <p class="subtitle">
                  Tomar Lecciones
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div class="container"> <!-- v-show="userType == 2 || userType == 3">-->
      <div class="block" @click="selectTasks()">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary" style="cursor: pointer;">
              <div class="hero-body">
                <p class="title">Actividades</p>
                <p class="subtitle">
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
      value: 0,
      valueSelVoices: [],
      valuePitch: 0.5,
      valueRate: 0,
      synth: [],
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
    selectLessons(){
      //this.$store.dispatch("setSelectedCourse", curso);
      //console.log("CourseId: "+curso._id)
      //this.$cookies.set('courseId', curso._id)
      this.$router.push("/leccionesEstudiante");
    },
    selectTasks(){
      this.$router.push("/actividadesEstudiante");
    },
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