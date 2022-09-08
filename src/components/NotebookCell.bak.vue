<template>
  <div v-bind:class = "(activeCell)?'cellActive':'cellContainer'">
    <div class="block">

        <div class="columns is-vcentered">
          <div class="column  is-1">
            In [{{indice+1}}]:
          </div>
          <div class="column">
            <div class="block">
              <section class="section">
                <textarea
                  name="index"
                  v-model="valorTextArea"
                  class="textarea"
                  @keydown.alt="procesarBotones"
                  @focus="emitirKey"
                  ref="myTextArea"
                >
                </textarea>
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
export default {
  components: {
    "vue-mathjax": VueMathjax,
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
       if(this.activeCell==true)
       {
          this.$refs.myTextArea.focus();
       }
       else
       {
         console.log("Cell: "+this.indice+" inactive")
       }
     }
  },
  mounted() {
    //console.log(this.arrayComponentes);
    this.$refs.myTextArea.focus();
  },
  methods: {
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
            console.log(myJson.message);
            var strRes = myJson.message;
            strRes = strRes.replace(/pid=\d+\n.*\n.*\n.*\n.*\n.*\n/g, "");
            //  ^\(%[io]\d+\).+?(?=\([%])
            // strRes=[...strRes.matchAll(/^\(%[io]\d+\).+?(?=\([%])/gmus)]
            strRes = [...strRes.matchAll(/^\(%i\d+\).+?(?=\([%])/gmsu)];
            var strExp = [];

            for (var i = 0; i < strRes.length; i++) {
              strExp.push(strRes[i][0]);
            }
            for (var i = 0; i < strExp.length; i++) {
              strExp[i] = strExp[i].replace(/^\(%[io]\d+\)/g, "");
              strExp[i] = strExp[i].replace("\n", "");
            }
            var salida = [];
            var entrada = this.valorTextArea;
            entrada = entrada.replace(/^\s*\n/gms, "");
            var entradaSplit = entrada.split("\n");
            console.log(entradaSplit);
            for (var i = 0; i < strExp.length; i++) {
              salida[i] = { entrada: entradaSplit[i], salida: strExp[i] };
            }
            //console.log(this.resultadoMaxima)
            console.log(salida);
            this.resultadoMaxima = salida;
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
.cellContainer
{
  border: 1px solid;
}
.cellActive
{
  border: 1px solid;
  border-left: 10px solid;
  border-left-color: #2596be;
}
.inputCol1
{
  border-top: 1px solid;
  border-left: 1px solid;
  border-right: 0px solid;
  border-bottom: 0px solid;
}
.inputCol2
{
  border-top: 1px solid;
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 0px solid;
}
.outputCol1
{
  border-top: 1px solid;
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
}
.outputCol2
{
  border-top: 1px solid;
  border-left: 0px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
}
</style>