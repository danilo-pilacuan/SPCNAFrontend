<template>
  <div>
    <div class="block">

        <div class="columns is-vcentered">
          <div class="column  is-1">
            In [{{indice+1}}]:
          </div>
          <div class="column">
            <div class="block">
              <section class="section">
                <!-- <textarea
                  name="index"
                  v-model="valorTextArea"
                  class="textarea"
                  @keydown.alt="procesarBotones"
                  @focus="emitirKey"
                  ref="myTextArea"
                >
                </textarea> -->
                <prism-editor class="my-editor p-1" v-model="valorTextArea" ref="myTextArea" :highlight="highlighter" line-numbers @blur="handleBlur" @focus="emitirKey" :readonly="isTextEnabled"></prism-editor>
              </section>
            </div>
          </div>
        
        </div>
    </div>
    <div class="block mb-2">
      <div class="columns is-vcentered">
          <div class="column  is-1">
            
          </div>
          <div class="column">
            <div class="block">
              <!-- <div
      class="block"
      v-for="(resultado, index) in resultadoMaxima"
      :key="index"
    >
      <div class="columns m-0 p-0">
        <div class="column inputCol1 is-1">(%i{{ index + 1 }})</div>
        <div class="column inputCol2">
          {{ resultado.entrada }}
        </div>
      </div>
      <div class="columns  m-0 p-0">
        <div class="column outputCol1 is-1">(%o{{ index + 1 }})</div>
        <div class="column outputCol2">
          <vue-mathjax :formula="resultado.salida"></vue-mathjax>
        </div>
      </div>
    </div> -->
            </div>
          </div>
        <div class="column  is-1">
            
          </div>
        </div>
    </div>
    
    
  </div>
</template>

<script>
import { VueMathjax } from "vue-mathjax";
import { PrismEditor } from 'vue-prism-editor';
  import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

  // import highlighting library (you can use any library you want just return html string)
  import { highlight, languages } from 'prismjs/components/prism-core';
  import 'prismjs/components/prism-clike';
  import 'prismjs/components/prism-javascript';
  import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles


export default {
  components: {
    "vue-mathjax": VueMathjax,
    "prism-editor": PrismEditor,
  },
  props:
  {
    value:{
      required: true
    },
    indice:{
      required: true
    },
    ejecutar:{
      required: true
    },
    activeCell:
    {
      required: true
    },
    ownerid:
    {
      required: true
    }
  },
  data() {
    return {
      formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$",
      msg: "Welcome to Your Vue.js App",
      //valorTextArea: "solve(x^2+4*x+4)\nexpand((x+y+z)^3)\node2('diff(y,x)+3*x*y = sin(x)/x,y,x)\nsum(f(i),i,0,m) * sum(g(j),j,0,n)",
      valorTextArea: this.value,
      salidaTextArea: "",
      resultadoMaxima: "",
      isTextEnabled:true
    };
  },
  watch:
  {
    valorTextArea (newValue) {
       this.$emit('input', newValue)
     },
     value (newValue) {
       this.valorTextArea = this.value
     },
     ejecutar()
     {
       if(this.ejecutar==true)
       {
         this.procesarEntrada()
       }
     },
     activeCell()
     {
       console.log("runActiveCell")
       if(this.activeCell==true)
       {
          //this.$refs.myTextArea.focus();
          document.getElementsByClassName("prism-editor__textarea")[this.indice].focus();
       }
       else
       {
         console.log("Cell: "+this.indice+" inactive")
       }
     },
     ownerid()
     {
      if(this.ownerid!=this.currentUser._id)
    {
      this.isTextEnabled=true
      console.log("Ownerid diferente")
    }
    else{
      this.isTextEnabled=false
      console.log("Ownerid igual")
    }
     }
  },
  mounted() {
    //console.log(this.arrayComponentes);
    //this.$refs.myTextArea.focus();
    document.getElementsByClassName("prism-editor__textarea")[this.indice].focus();
    if(this.ownerid!=this.currentUser._id)
    {
      this.isTextEnabled=true
      console.log("Ownerid diferente")
    }
    else{
      this.isTextEnabled=false
      console.log("Ownerid igual")
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
    },
    enableAudio(){
        return this.$store.state.enableAudio;
    },
    selectedLesson(){
        return this.$store.state.selectedLesson;
    },
    synthVoice() {
      return this.$store.state.synthVoice;
    },
  },
  methods: {
    handleBlur(){

    },
    highlighter(code) {
        
        return code
      },
    procesarBotones(e) {
      console.log("con alt");
      console.log(e.key);
      if (e.key == "r") {
        this.procesarEntrada();
      } else {
        if (e.key == "c") {
          this.valorTextArea = "";
        }
      }
    },
    setFocus()
    {
      this.$refs.myTextArea.focus();
    },
    emitirSalida()
    {
      this.$emit('emitirSalida',this.resultadoMaxima)
    },
    emitirKey()
    {
      this.$emit('emitirKey',this.indice,"cambio a "+this.indice)
    },
    finishScript()
    {
      this.$emit('finishScript',this.indice)

    },
    procesarEntrada() {
      var formData = new FormData();
      var scriptAreaTxt = this.valorTextArea;
      formData.append("scriptTxt", scriptAreaTxt);
      fetch(process.env.VUE_APP_BACKEND+":8000/procesarScript", {
        method: "POST", // or 'PUT'
        body: formData, // data can be `string` or {object}!
      })
        .then((response) => {
          console.log("fetch exitoso");
          console.log(response);

          return response.json();
        })
        .then((myJson) => {
          try {
            console.log("ResJson")
            console.log(myJson);

            this.resultadoMaxima = myJson;
            this.emitirSalida()
            this.finishScript()
          } catch (e) {
            this.resultadoMaxima = "Error";
            console.log(e);
          }
        });
    },
    
  },

};
</script>

<style>


.my-editor {
  border: 1px solid;
  background: #fffafa;
  color: rgb(14, 14, 14);
caret-color: rgb(0, 0, 0);
  
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}


.prism-editor__textarea:focus {
  outline: none;
}


.height-300 {
  height: 300px;
}
</style>