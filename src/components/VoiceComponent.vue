<template>
    <div>
        
       <vue-web-speech-synth 
      v-model="dataReproducir"
      :voice="synthVoice"
      :text="dataTexto"
      @list-voices="listVoices"
    /> 
    </div>
</template>
<script>
export default {
    props:
  {
    texto:{
      required: true
    },
    reproducir:{
      required: true
    }
  },
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
        currentUser() {
        return this.$store.state.currentUser;
        },
        voiceList() {
        return this.$store.state.voiceList;
        },
        synthVoice() {
        return this.$store.state.synthVoice;
        },
        
        
    },
    data(){
        return {
            voicesSpeech: [],
            //voiceList: [],
            play: false,
            //synthVoice: null,
            synthText: 'Hola soy tu asistente personal',
            dataTexto:this.texto,
            dataReproducir:this.reproducir,
            
        }
    },
    watch:
  {
    dataTexto () {
       this.$emit('onTexto', this.dataTexto)
     },
     dataReproducir (newValue) {
       this.$emit('onReproducir', this.dataReproducir)
     },
     texto() {
        this.dataTexto=this.texto
        },
        reproducir() {
        this.dataReproducir=this.reproducir
        },
        
  },
    methods:{
      startSpeak()
      {
        this.dataReproducir=true
      },
      stopSpeak()
      {
        this.dataReproducir=false
      },
      toggleSpeak()
      {
        this.dataReproducir=!this.dataReproducir
      },
      pauseSpeak()
    {
      var synth = window.speechSynthesis;
      synth.pause();
    },
    resumeSpeak()
    {
      var synth = window.speechSynthesis;
      synth.resume();
    },
        listVoices (list) {
          console.log(list)
      if(this.voiceList.length<1)
      {
          this.$store.dispatch("setVoiceList", list)
      }
      if(this.synthVoice!=null)
      {
          if(this.voiceList.length>1)
          {
              this.$store.dispatch("setSynthVoice", this.voiceList.find(element=>element.lang.includes("es-MX")==true))
          }
          
      }
    //   this.voiceList = 
      
    //   this.synthVoice=

      console.log("Voicelist......")
      console.log(this.voiceList)

      console.log("SynthVoice......")
      console.log(this.synthVoice)
    },
    
    },
    mounted(){
        console.log("Voice")
        console.log(this.voiceList)
        console.log("Synth Voice")
        console.log(this.synthVoice)
        
    }
}
</script>