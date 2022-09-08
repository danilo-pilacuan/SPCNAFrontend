<template>
  <div class="home" tabindex="0">
    <el-container>
      <el-header>Procesar Script</el-header>
      <el-main>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-button type="primary" @click="speak()">Introducir texto</el-button>
              <el-button type="primary">Ayuda</el-button>
              <el-button type="primary">Borrar</el-button>
              <el-button type="primary" @click="handleEjecutar">Ejecutar</el-button>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <label for="pitch">Pitch</label>
              <input id="pitch" name="pitch" type="range" min="0" max="1" step="0.05" v-model="valuePitch">
              <label for="rate">Rate</label>
              <input id="rate" name="rate" type="range" min="-3" max="3" step="0.25" v-model="valueRate">
              <label>Idioma</label>
              <div class="grid-content bg-purple">
                <select v-model="valueSelVoices" placeholder="Select">
                  <option v-for="voice in voicesSpeech" :key="voice.voiceURI" :value="voice" >
                    {{ voice.name }}
                  </option>
                </select>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple">
              <textarea
                type="textarea"
                class="textinput"
                :rows="5"
                placeholder="Please input"
                v-model="textarea"
                @keydown="capturarTeclado"
                ref="editor"
              >
              </textarea></div
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple">
              <ul>
                <li v-for="resultado in resultadoMaxima" :key="resultado">
                  {{resultado}}
                </li>
              </ul>
              </div>
              </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hello: "hello world",
      textarea: "solve(x^2+4*x+4)\nmatrix([integrate(1/(1+x^2),x, 0, inf), diff(x^2,x)],[%PI,%E])\node2('diff(y,x)+3*x*y = sin(x)/x,y,x)\nsum(f(i),i,0,m) * sum(g(j),j,0,n)",
      value: 0,
      valueSelVoices: "",
      valuePitch: 0.5,
      valueRate: 0,
      synth:[],
      resultadoMaxima:"",
      valueVolume: 50,
      voicesSpeech: [],
      
    };
  },
  methods: {
    capturarTeclado(e) {
      console.log(e.key);
      this.speak(e.key)
    },
    handleClick(e) {
      console.log("boton press");
      console.log(this.voicesSpeech);
    },
    speak(texttospeak){
      if(texttospeak!== ''){
        var utterThis = new SpeechSynthesisUtterance(texttospeak);
        var selectedOption = this.valueSelVoices;
        utterThis.voice=selectedOption
        utterThis.rate = Math.pow(Math.abs(this.valueRate) + 1, this.valueRate < 0 ? -1 : 1);
        utterThis.pitch = this.valuePitch
        this.synth.speak(utterThis);
        console.log(selectedOption)
      }
    },
    handleEjecutar(){
      var formData = new FormData();
      var scriptAreaTxt = this.textarea;
      formData.append('scriptTxt', scriptAreaTxt);
      fetch(process.env.VUE_APP_BACKEND+":8000/procesarScript", {
      method: 'POST', // or 'PUT'
      body: formData, // data can be `string` or {object}!
      }).then(response => {
            console.log("fetch exitoso")
            console.log(response);
            
              return response.json();
            })
            .then(myJson => {

              try{
                console.log(myJson.message);
                var strRes=myJson.message
                strRes=strRes.replace(/pid=\d+\n.*\n.*\n.*\n.*\n.*\n/g,'')
                //  ^\(%[io]\d+\).+?(?=\([%])
                strRes=[...strRes.matchAll(/^\(%[io]\d+\).+?(?=\([%])/gmus)]
                for(var strI in strRes)
                  strI=strI.replace("\n","")
                
                this.resultadoMaxima=strRes;
                console.log(this.resultadoMaxima)
              }
              catch(e)
              {
                this.resultadoMaxima = "Error";
                console.log(e);
              }
              
            })
    }
  },
  created() {
    console.log("component created");
    //this.$refs.editor.focus();
    var voicesSpeech = window.speechSynthesis.getVoices();
    var synth = window.speechSynthesis;
    
  },
  mounted() {
    console.log("Inicia proceso");
    this.$refs.editor.focus();
    this.voicesSpeech = window.speechSynthesis.getVoices();
    this.synth = window.speechSynthesis;
    if (this.voicesSpeech[0]) {
      this.valueSelVoices = this.voicesSpeech[24];
    } else {
      this.valueSelVoices = "";
    }
  },
};
</script>

<style>
.textinput {
  float: left;
  width: 100%;
  min-height: 75px;
  outline: none;
  resize: none;
  border: 1px solid grey;
  font-size: 18pt;
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>