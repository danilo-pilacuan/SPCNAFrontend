<template>
  <div class="home" tabindex="0" @keydown.alt="procesarTecladoAlt" @keydown.exact="capturarTeclado" v-if="fileInput">
    <section class="section p-0">
      <div class="container">
        <!-- <div class="block">
          <p class="title">Actividades</p>

          <div class="block">
            <div class="grid-content bg-purple">
              <label for="pitch">Pitch</label>
              <input id="pitch" name="pitch" type="range" min="0" max="1" step="0.05" v-model="valuePitch" />
              <label for="rate">Rate</label>
              <input id="rate" name="rate" type="range" min="-3" max="3" step="0.25" v-model="valueRate" />
              <label v-show="false">Idioma</label>
              <div class="grid-content bg-purple">
                <select v-model="valueSelVoices" placeholder="Select" v-show="true" :selected="valueSelVoices.name" >
                  <option v-for="voice in voicesSpeech" :key="voice.voiceURI" :value="voice" > {{ voice.name }} </option>
                </select>
              </div>
            </div>
          </div>
        </div> -->
        <div class="block m-0 has-text-left">
          <div class="columns is-vcentered mb-0 p-0">
            <!-- <div class="column is-1">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Maxima-new.svg/1200px-Maxima-new.svg.png"
                alt=""
              />
            </div> -->
            <div class="column is-3">
              <p class="title is-4">Área de Trabajo</p>
            </div>
            <div class="column">
              <p class="title is-6">({{fileInput.name}}.json)</p>
            </div>
          </div>

          <hr class="mt-1 mb-3" />
        </div>

        <div class="stickyDiv">
          <div
            class="block m-0 has-text-left"
            style="background-color: #343434"
          >
            <b-dropdown class="m-0">
              <template #trigger="{ active }">
                <b-button
                  label="Archivo"
                  type="is-dark"
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                />
              </template>
              <b-dropdown-item class="has-text-left">
                Nuevo script
              </b-dropdown-item>
              <b-dropdown-item class="has-text-left" @click="abrirScript">
                Abrir
              </b-dropdown-item>
              <hr class="mt-1 mb-1" />
              <b-dropdown-item class="has-text-left">
                Realizar una copia
              </b-dropdown-item>
              <b-dropdown-item class="has-text-left">
                Guardar como...
              </b-dropdown-item>
              <b-dropdown-item class="has-text-left">
                Renombrar
              </b-dropdown-item>
              <hr class="mt-1 mb-1" />
              <b-dropdown-item class="has-text-left">
                Imprimir
              </b-dropdown-item>
              <b-dropdown-item class="has-text-left" @click="descargarScript">
                Descargar
              </b-dropdown-item>
              <hr class="mt-1 mb-1" />
              <b-dropdown-item class="has-text-left"> Salir </b-dropdown-item>
            </b-dropdown>
            <b-dropdown class="m-0">
              <template #trigger="{ active }">
                <b-button
                  label="Editar"
                  type="is-dark"
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                />
              </template>
              <b-dropdown-item> Cortar Celdas </b-dropdown-item>
              <b-dropdown-item> Copiar Celdas </b-dropdown-item>
              <b-dropdown-item> Pegar Celdas Arriba </b-dropdown-item>
              <b-dropdown-item> Pegar Celdas Abajo </b-dropdown-item>
              <b-dropdown-item> Pegar Celdas y Reemplazar </b-dropdown-item>
              <b-dropdown-item> Eliminar Celdas </b-dropdown-item>
              <b-dropdown-item> Deshacer Eliminar Celdas </b-dropdown-item>
              <hr class="mt-1 mb-1" />
              <b-dropdown-item> Separar Celda </b-dropdown-item>
              <b-dropdown-item> Unir hacia arriba </b-dropdown-item>
              <b-dropdown-item> Unir hacia abajo </b-dropdown-item>
              <hr class="mt-1 mb-1" />
              <b-dropdown-item> Mover Celda Arriba </b-dropdown-item>
              <b-dropdown-item> Mover Celda Abajo </b-dropdown-item>
              <hr class="mt-1 mb-1" />
              <b-dropdown-item> Editar Metadata </b-dropdown-item>
              <hr class="mt-1 mb-1" />
              <b-dropdown-item> Buscar y Reemplazar </b-dropdown-item>
              <hr class="mt-1 mb-1" />
            </b-dropdown>
            <b-dropdown class="m-0">
              <template #trigger="{ active }">
                <b-button
                  label="Ver"
                  type="is-dark"
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                />
              </template>
              <b-dropdown-item> Mostrar número de línea </b-dropdown-item>
            </b-dropdown>
            <b-dropdown class="m-0">
              <template #trigger="{ active }">
                <b-button
                  label="Insertar"
                  type="is-dark"
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                />
              </template>
              <b-dropdown-item> Insertar celda arriba </b-dropdown-item>
              <b-dropdown-item> Insertar celda abajo </b-dropdown-item>
            </b-dropdown>
            <b-dropdown class="m-0">
              <template #trigger="{ active }">
                <b-button
                  label="Celda"
                  type="is-dark"
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                />
              </template>
              <b-dropdown-item> Ejecutar Celda </b-dropdown-item>
              <b-dropdown-item>
                Ejecutar Celda y Seleccionar Siguiente
              </b-dropdown-item>
              <b-dropdown-item>
                Ejecutar Celda e Insertar Debajo
              </b-dropdown-item>
              <b-dropdown-item @click="ejecutarTodas"> Ejecutar Todas </b-dropdown-item>
              <b-dropdown-item> Ejecutar Todas Debajo </b-dropdown-item>
              <b-dropdown-item> Ejecutar Todas Encima </b-dropdown-item>
            </b-dropdown>
            <b-dropdown class="m-0">
              <template #trigger="{ active }">
                <b-button
                  label="Maxima"
                  type="is-dark"
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                />
              </template>
              <b-dropdown-item> Reiniciar Maxima </b-dropdown-item>
              <!-- <b-dropdown-item> Contact </b-dropdown-item> -->
            </b-dropdown>
            <b-dropdown class="m-0">
              <template #trigger="{ active }">
                <b-button
                  label="Ayuda"
                  type="is-dark"
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                />
              </template>
              <b-dropdown-item> Atajos de Teclado </b-dropdown-item>
            </b-dropdown>
          </div>

          <div
            class="block has-text-left mt-0"
            style="background-color: #343434"
          >
            <b-button type="is-dark" @click="saveFile"
              ><b-icon icon="content-save"></b-icon
            ></b-button>
            <b-button type="is-dark" @click="handleAddCelda"
              ><b-icon icon="plus"></b-icon
            >
            <b-icon icon="code-tags"></b-icon
            ></b-button>
            <b-button type="is-dark" @click="handleAddCeldaText"
              ><b-icon icon="plus"></b-icon
            >
            <b-icon icon="format-text"></b-icon
            ></b-button>
            <b-button type="is-dark" @click="handleSwapTextCode"
              ><b-icon icon="swap-horizontal"></b-icon
            ></b-button>
            <b-button type="is-dark" @click="procesarScc = true"
              ><b-icon icon="content-cut"></b-icon
            ></b-button>
            <!-- <div class="is-divider-vertical"></div> -->
            <b-button type="is-dark"
              ><b-icon icon="content-copy"></b-icon
            ></b-button>
            <b-button type="is-dark"
              ><b-icon icon="content-paste"></b-icon
            ></b-button>
            <b-button type="is-dark" @click="upActiveCell"
              ><b-icon icon="arrow-up"></b-icon
            ></b-button>
            <b-button type="is-dark" @click="downActiveCell"
              ><b-icon icon="arrow-down"></b-icon
            ></b-button>
            <b-button type="is-dark" @click="ejecutarCelda"
              ><b-icon icon="play"></b-icon>
              &nbsp;&nbsp;&nbsp;Ejecutar</b-button
            >
            <b-button type="is-dark"><b-icon icon="stop"></b-icon></b-button>
            <b-button type="is-dark"><b-icon icon="restart"></b-icon></b-button>
            <b-button type="is-dark" @click="escucharCelda"
              ><b-icon icon="fast-forward"></b-icon
            ></b-button>
            <!-- <input type="text" v-model="text">
            <input type="text" v-model="currentCell"> -->
          </div>
        </div>

        <!-- <vue-mathjax :formula="formula"></vue-mathjax> -->
        <!-- <notebook-cell
          v-for="(nbCell, index) in arrayNoteBookCell"
          :key="index"
        /> -->

        <div
          class="cellContainer"
          v-bind:class="nbCell.activeCell ? 'cellActive' : 'cellContainer'"
          v-for="(nbCell, index) in arrayNoteBookCell"
          :key="index"
        >
          <div v-bind:class="nbCell.isTextCell ? 'cellText' : 'cellCode'">
            <notebook-cell
              v-model="nbCell.entrada"
              :indice="index"
              :ejecutar="nbCell.ejecutar"
              :activeCell="nbCell.activeCell"
              @emitirKey="procesarEmit"
              @finishScript="procesarFinish"
              @emitirSalida="emitirSalida"
              ref="cells"
            />
            <div class="m-2">
              <div class="columns">
                <div class="column is-1"></div>
                <div class="column">
                  <div v-for="(resultado, index3) in nbCell.salida" :key="index3">
                    <div class="columns m-0 p-0">
                      <div class="column inputCol1 is-1">(%i{{ index3 + 1 }})</div>
                      <div class="column inputCol2">
                        {{ resultado.entradaScript }}
                      </div>
                    </div>
                    <div class="columns m-0 p-0">
                      <div class="column outputCol1 is-1">
                        (%o{{ index3 + 1 }})
                      </div>
                      <div class="column outputCol2">
                        <vue-mathjax :formula="resultado.salida"></vue-mathjax>
                                    <!-- <b-button type="is-primary" @click="reproducirSalida(resultado.entradaScript,resultado.salidaScript,index,index3)">Reproducir</b-button> -->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { VueMathjax } from "vue-mathjax";
import NotebookCell from "../components/NotebookCell";

export default {
  props:
  {
    fileInput:{
      required: false
    },
  },
  components: {
    NotebookCell: NotebookCell,
  },
  watch: {
    fileInput (newValue) {
      if(this.fileInput)
      {
        if(this.fileInput.content)
        {
          this.arrayNoteBookCell=this.fileInput.content;
        }
      }

    },
  },

  data() {
    return {
      hello: "hello world",
      textarea:
        "solve(x^2+4*x+4)\nexpand((x+y+z)^3)\node2('diff(y,x)+3*x*y = sin(x)/x,y,x)\nsum(f(i),i,0,m) * sum(g(j),j,0,n)",
      value: 0,
      procesarScc: false,
      valueSelVoices: [],
      valuePitch: 0.5,
      currentCell: 0,
      text: "Hola",
      valueRate: 0,
      synth: [],
      formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$",
      resultadoMaxima: "",
      valueVolume: 50,
      voicesSpeech: [],
      arrayNoteBookCell: [
        { entrada: "", salida:"", ejecutar: false, activeCell: true,isTextCell:false },
      ],
      menuOpciones : [
        "Presiona alt más w para escribir en celda actual",
        "Presione alt más R para ejecutar celda actual",
        "Presione alt más Pe para escuchar celda actual",
        "Presione alt más C para crear nueva celda",
        "Presione alt más Q para subir celda",
        "Presione alt más Ye para bajar celda",
        "Presione alt más flecha arriba para seleccionar opcion siguiente",
        "Presione alt más flecha abajo para seleccionar opcion anterior",
        "Presione alt más M para escuchar menú nuevamente",
        "Presione alt mas H para ayuda"
      ]
    };
  },
  methods: {
    procesarTecladoAlt(e) {
      console.log("con alt");
      console.log(e.key);
      if (e.key == "m") {
        for (var i = 0; i < this.menuOpciones.length; i++) {
          //console.log(this.menuOpciones[i])
          this.speak(this.menuOpciones[i])
        }
      }
      else if(e.key == "w")
      {
        document.getElementsByClassName("prism-editor__textarea")[this.currentCell].focus();
        this.speak("escribir")
      }
      else if(e.key == "r")
      {
        this.ejecutarTodas()
      }
      else if(e.key == "p")
      {
        this.escucharCelda()
      }
      else if(e.key == "c")
      {
        this.handleAddCelda()
      }
      else if(e.key == "q")
      {
        this.upActiveCell()
      }
      else if(e.key == "y")
      {
        this.downActiveCell()
      }
      
    },
    reproducirMenu(){

    },
    escucharCelda()
    {
      if(this.arrayNoteBookCell[this.currentCell].isTextCell)
      {
        this.speak("Celda "+(this.currentCell+1)+" "+this.arrayNoteBookCell[this.currentCell].entrada)
      }
      else
      {
        var salidaCurrentCell=this.arrayNoteBookCell[this.currentCell];
        var indexCell=this.currentCell;
        for (var i = 0; i < salidaCurrentCell['salida'].length; i++) {
          console.log(salidaCurrentCell['salida'][i].entradaScript)

          const auxEntradaScript=salidaCurrentCell['salida'][i].entradaSpeech
          const auxSalidaScript=salidaCurrentCell['salida'][i].salidaSpeech
          //console.log("Celda "+(this.currentCell+1)+" Entrada "+(i+1))
          this.speak("Celda "+(this.currentCell+1)+" Entrada "+(i+1))
          this.speak(auxEntradaScript);
          this.speak("Celda "+(this.currentCell+1)+" Salida "+(i+1))
          this.speak(auxSalidaScript);  
          //////////
        }
      }
      

    },
    capturarTeclado(e) {
      console.log(e.key);
      this.speak(e.key);
    },
    handleClick(e) {
      console.log("boton press");
      console.log(this.voicesSpeech);
    },
    procesarEmit(valor, valor2) {
      this.currentCell = valor;
      this.arrayNoteBookCell.forEach((element) => {
        element.activeCell = false;
      });
      this.arrayNoteBookCell[this.currentCell].activeCell = true;
      console.log(valor2);
    },
    saveFile()
    {
      if(this.fileInput)
      {
        fetch("http://localhost:5000/api/scripts/"+this.fileInput._id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: this.inputFileName,
          course: this.selectedCourse._id,
          owner: this.currentUser._id,
          content: this.arrayNoteBookCell
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        var resp = data;
        console.log("resp filescript:")
        console.log(resp)
        this.$buefy.dialog.alert("Archivo guardado satisfactoriamente");
        //this.$router.push("/curso/lecciones");
      })
      .catch((error)=>{
        this.$buefy.dialog.alert("Error al guardar el archivo");
      });
      }
    },
    handleCelda() {
      console.log("hc");
      this.arrayNoteBookCell.forEach((element) => {
        console.log(element);
      });
    },
    emitirSalida(resultado) {
      console.log(resultado);

      this.arrayNoteBookCell[this.currentCell].salida = [];
      for (var i = 0; i < resultado.salida.length; i++) {
        
        this.arrayNoteBookCell[this.currentCell].salida[i] = { entradaScript: resultado.entradaScript[i], salida:resultado.salida[i],entradaSpeech:resultado.entradaSpeech[i],salidaSpeech:resultado.salidaSpeech[i]};
      }
      // this.arrayNoteBookCell[this.currentCell].entradaScript = resultado.entradaScript;
      // this.arrayNoteBookCell[this.currentCell].entradaSpeech = resultado.entradaSpeech;
      // this.arrayNoteBookCell[this.currentCell].salidaSpeech = resultado.salidaSpeech;

    },
    procesarFinish(indice) {
      console.log("finish script");
      this.arrayNoteBookCell[indice].ejecutar = false;
    },
    upActiveCell() {
      if (this.currentCell > 0) {
        this.currentCell = this.currentCell - 1;
      } else {
        document.getElementsByClassName("prism-editor__textarea")[this.currentCell].focus();
      }
      this.arrayNoteBookCell.forEach((element) => {
        element.activeCell = false;
      });
      this.arrayNoteBookCell[this.currentCell].activeCell = true;
    },
    downActiveCell() {
      if (this.currentCell < this.arrayNoteBookCell.length - 1) {
        this.currentCell = this.currentCell + 1;
      } else {
        document.getElementsByClassName("prism-editor__textarea")[this.currentCell].focus();
      }
      this.arrayNoteBookCell.forEach((element) => {
        element.activeCell = false;
      });
      this.arrayNoteBookCell[this.currentCell].activeCell = true;
      console.log(this.arrayNoteBookCell);
    },
    handleSwapTextCode()
    {
      this.arrayNoteBookCell[this.currentCell].isTextCell=!this.arrayNoteBookCell[this.currentCell].isTextCell
      this.arrayNoteBookCell[this.currentCell].salida=[]
    },
    ejecutarCeldaById(idCelda)
    {
      if(!this.arrayNoteBookCell[idCelda].isTextCell)
      {
        var formData = new FormData();
      var scriptAreaTxt = this.arrayNoteBookCell[idCelda].entrada;
      formData.append("scriptTxt", scriptAreaTxt);
      fetch("http://localhost:8000/procesarScript", {
        method: "POST", 
        body: formData, 
      })
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          try {
            console.log("ResJson")
            console.log(myJson);

            var resultado = myJson;
            
            this.arrayNoteBookCell[idCelda].salida = [];
            for (var i = 0; i < resultado.salida.length; i++) {  
              console.log("i: "+i)
              this.arrayNoteBookCell[idCelda].salida[i] = { entradaScript: resultado.entradaScript[i], salida:resultado.salida[i],entradaSpeech:resultado.entradaSpeech[i],salidaSpeech:resultado.salidaSpeech[i]};
            }
          } catch (e) {
            this.resultadoMaxima = "Error";
            console.log(e);
          }
        });
      }

    },
    ejecutarHaciaAbajoRecursive(inicio) {
      console.log("Entrada: "+inicio)
      if(this.arrayNoteBookCell[inicio].isTextCell)
      {
        if(inicio<this.arrayNoteBookCell.length-1)
            {
              this.ejecutarHaciaAbajoRecursive(inicio+1)
            }
      }
      else
      {
        var formData = new FormData();
      var scriptAreaTxt = this.arrayNoteBookCell[inicio].entrada;
      formData.append("scriptTxt", scriptAreaTxt);
      fetch("http://localhost:8000/procesarScript", {
        method: "POST", 
        body: formData, 
      })
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          try {
            console.log("ResJson")
            console.log(myJson);

            var resultado = myJson;
            
            this.arrayNoteBookCell[inicio].salida = [];
            for (var i = 0; i < resultado.salida.length; i++) {  
              console.log("i: "+i)
              this.arrayNoteBookCell[inicio].salida[i] = { entradaScript: resultado.entradaScript[i], salida:resultado.salida[i],entradaSpeech:resultado.entradaSpeech[i],salidaSpeech:resultado.salidaSpeech[i]};
            }
            if(inicio<this.arrayNoteBookCell.length-1)
            {
              this.ejecutarHaciaAbajoRecursive(inicio+1)
            }
          } catch (e) {
            this.resultadoMaxima = "Error";
            console.log(e);
          }
        });
      }
      
    },
    ejecutarHaciaArribaRecursive(inicio) {
      var formData = new FormData();
      var scriptAreaTxt = this.arrayNoteBookCell[inicio].entrada;
      formData.append("scriptTxt", scriptAreaTxt);
      fetch("http://localhost:8000/procesarScript", {
        method: "POST", 
        body: formData, 
      })
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          try {
            console.log("ResJson")
            console.log(myJson);

            var resultado = myJson;
            
            this.arrayNoteBookCell[inicio].salida = [];
            for (var i = 0; i < resultado.salida.length; i++) {  
              
              this.arrayNoteBookCell[inicio].salida[i] = { entradaScript: resultado.entradaScript[i], salida:resultado.salida[i],entradaSpeech:resultado.entradaSpeech[i],salidaSpeech:resultado.salidaSpeech[i]};
            }
            if(inicio>0)
            {
              this.ejecutarHaciaArribaRecursive(inicio-1)
            }
          } catch (e) {
            this.resultadoMaxima = "Error";
            console.log(e);
          }
        });
    },
    ejecutarCelda(){
      this.ejecutarCeldaById(this.currentCell)
    },
    ejecutarTodas() {
      // this.arrayNoteBookCell.forEach(element=>{
      //   element.ejecutar=true
      // })

      // for(var j=0;j<this.arrayNoteBookCell.length;j++)
      // {
      //   this.ejecutarCeldaById(j)
      // }
      this.ejecutarHaciaAbajoRecursive(0)
      
    },
    handleAddCelda() {
      this.arrayNoteBookCell.push({
        entrada: "",
        salida: "",
        ejecutar: false,
        activeCell: false,
        isTextCell:false
      });
    },
    handleAddCeldaText() {
      this.arrayNoteBookCell.push({
        entrada: "",
        salida: "",
        ejecutar: false,
        activeCell: false,
        isTextCell:true
      });
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
    handleHelp() {
      var currentNotebookCell = this.arrayNoteBookCell[0];
      console.log(currentNotebookCell);
      Object.keys(currentNotebookCell).forEach((prop) => console.log(prop));
    },
    abrirScript() {
      let input = document.createElement("input");
      input.type = "file";
      input.onchange = (_) => {
        var file = input.files[0];
        if (!file) {
          return;
        }
        var reader = new FileReader();
        reader.onload = (e) => {
          var contents = e.target.result;
          console.log(contents);
          console.log(this.arrayNoteBookCell);
          this.arrayNoteBookCell = null;
          this.arrayNoteBookCell = JSON.parse(contents);
          console.log(this.arrayNoteBookCell);
        };
        reader.readAsText(file);
        // you can use this method to get file and perform respective operations
        console.log(input.files);
        // let files =   Array.from(input.files);
        // console.log(files[0]);
        // let jsonData = JSON.stringify(files[0])
        // console.log(jsonData)
      };
      input.click();
    },

    


    descargarScript() {
      var json = JSON.stringify(this.arrayNoteBookCell);
      json = [json];
      var blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });

      //Check the Browser.
      var isIE = false || !!document.documentMode;
      if (isIE) {
        window.navigator.msSaveBlob(blob1, "Customers.txt");
      } else {
        var url = window.URL || window.webkitURL;
        var link = url.createObjectURL(blob1);
        var a = document.createElement("a");
        a.download = "script.json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    },
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
  created() {
    console.log("component created");
    //this.$refs.editor.focus();
    var voicesSpeech = window.speechSynthesis.getVoices();
    var synth = window.speechSynthesis;
  },
  beforeMount(){
        console.log("Params sscs")
        console.log(this.$route.params)
        if(this.fileInput)
        {
          if(this.fileInput.content)
          {
            this.arrayNoteBookCell=this.fileInput.content;
          }
        }
  },
  
  mounted() {

//     let promesaVoces = new Promise((resolve, reject)=>{
//       setTimeout(function(){
//     resolve("¡Éxito! " + this.formula); // ¡Todo salió bien!
//   }, 500);
//     });

//     promesaVoces.then((successMessage) => {
//   // succesMessage es lo que sea que pasamos en la función resolve(...) de arriba.
//   // No tiene por qué ser un string, pero si solo es un mensaje de éxito, probablemente lo sea.
//   console.log("¡Sí! " + successMessage);
// });

    

    //this.$refs.editor.focus();
    this.voicesSpeech = window.speechSynthesis.getVoices();
    console.log("Voces: ")
    var formData = new FormData();
      
      formData.append("tiempoMS", (1000*4).toString());
      fetch("http://localhost:8000/demorarEjecucion", {
        method: "POST", // or 'PUT'
        body: formData, // data can be `string` or {object}!
      })
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          
          this.voicesSpeech.forEach(element=>{
      //console.log(element)
      if(element.name.toLowerCase().search("spanish")>=0 || element.name.toLowerCase().search("español")>=0)
      {
        console.log(element.name);
        this.valueSelVoices = element;
      }
    });
    
    // if (this.voicesSpeech[0]) {
    //   console.log("esp");

    //   this.valueSelVoices = this.voicesSpeech[57];
    //   console.log(this.valueSelVoices);
    // } else {
    //   console.log("no esp");
    //   this.valueSelVoices = "";
    // }
    if (true) {
      this.speak(
        "Presione alt más M para escuchar Menú"
      );
    } else {
      console.log("unauthenticated");
    }


        });

    this.synth = window.speechSynthesis;
    console.log("Voces: ")
    //console.log(window.speechSynthesis.getVoices())

    
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
  font-size: 16pt;
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
.bg-yellow1 {
  background: #ffe091;
  border-style: solid;
  border-width: 2px;
  border-color: #7e7e7e;
}
.bg-blue {
  background: #268fcd;
}
.bg-green1 {
  background: #00d1b2;
  border-style: solid;
  border-width: 2px;
  border-color: #7e7e7e;
}
.bg-yellow2 {
  background: #ceb577;
}

.bg-green2 {
  background: #00ad93;
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
.stickyDiv {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 1000;
}

.cellContainer {
  border: 1px solid;
  border-top: 0px;
}
.cellActive {
  border: 1px solid;
  border-left: 10px solid;
  border-left-color: #2596be;
  border-top: 0
}
.cellText {
  border: 1px solid;
  border-right: 10px solid;
  border-right-color: #be2525;
  
  background-color: #aaaaaa;
}
.cellCode {
  background-color: #FFFFFF;
  border-top: 0
}
.inputCol1 {
  border-top: 1px solid;
  border-left: 1px solid;
  border-right: 0px solid;
  border-bottom: 0px solid;
}
.inputCol2 {
  border-top: 1px solid;
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 0px solid;
}
.outputCol1 {
  border-top: 1px solid;
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
}
.outputCol2 {
  border-top: 1px solid;
  border-left: 0px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
}
</style>