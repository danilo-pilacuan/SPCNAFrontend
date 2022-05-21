<template>
    <div>
        
       <vue-web-speech-synth 
      v-model="dataReproducir"
      :voice="synthVoice"
      :text="dataTexto"
      :rate="0.7"
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
      quickSpeak(texttospeak) {
        //console.log("start spk")
        if (texttospeak !== "") {
          var utterThis = new SpeechSynthesisUtterance(texttospeak);
          
          
          utterThis.voice = this.synthVoice;
          utterThis.rate = 0.75;
          utterThis.pitch = 1;
          var synth = window.speechSynthesis
          synth.speak(utterThis);
          //console.log(selectedOption);
        }
      },
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
      restartSpeak()
      {
        var synth = window.speechSynthesis;

        synth.cancel()

        
        
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
        if(this.voiceList)
        {
          if(this.voiceList.length<1)
          {
              this.$store.dispatch("setVoiceList", list)
              //this.$store.dispatch("setVoiceList", window.SpeechSynthesis)
          }
        }
        else
        {

          this.$store.dispatch("setVoiceList", list)
        }
        if(this.synthVoice!=null)
        {
            if(this.voiceList.length>1)
            {
                if(this.$browserDetect.isEdge)
                {
                  this.$store.dispatch("setSynthVoice", this.voiceList.find(element=>element.lang.includes("es-MX")==true))
                }

                if(this.$browserDetect.isChrome)
                {
                  this.$store.dispatch("setSynthVoice", this.voiceList.find(element=>element.lang.includes("es-ES")==true))
                }

                if(this.$browserDetect.isFirefox)
                {
                  this.$store.dispatch("setSynthVoice", this.voiceList.find(element=>element.lang.includes("Spanish (Latin America)")==true))
                }

                // console.log("Chrome")
                // console.log(this.$browserDetect.isChrome)
                // console.log("Edge")
                // console.log(this.$browserDetect.isEdge)
                // console.log("Firefox")
                // console.log(this.$browserDetect.isFirefox)
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
        // if(!this.voiceList)
        // {
        //   while(!this.voiceList)
        //   {
        //     this.voiceList=window.speechSynthesis.getVoices();
        //   }
        //   console.log("listtt")
        //   console.log(this.voiceList)
        // }
        console.log("Synth Voice")
        console.log(this.synthVoice)
        
    }
}
</script>