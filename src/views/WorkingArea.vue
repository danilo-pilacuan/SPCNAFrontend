<template>
  <div class="home" tabindex="0" @keydown.alt="procesarTecladoAlt" @keydown.exact="capturarTeclado" v-if="fileInputData">
<!--
  TODO: hacer menu mas interactivo con flechas y out por out
     -->
    <VoiceComponent ref="componenteSpeak" :texto="texto" :reproducir="reproducir"
    @onTexto="emitTexto"
    @onReproducir="emitReproducir"
    ></VoiceComponent>

    <section class="section p-0">
      <div class="container">
        
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
              <p class="title is-6">({{fileInputData.name}}.json)</p>
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
            <b-button type="is-dark"
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
import VoiceComponent from '/src/components/VoiceComponent'

export default {
  props:
  {
    fileInput:{
      required: false
    },
  },
  components: {
    NotebookCell: NotebookCell,
    VoiceComponent: VoiceComponent,
  },
  watch: {
    fileInputData (newValue) {
      if(this.fileInputData)
      {
        if(this.fileInputData.content)
        {
          this.arrayNoteBookCell=this.fileInputData.content;
        }
      }

    },
  },

  data() {
    return {      
      currentCell: 0,
      arrayNoteBookCell: [
        { entrada: "", salida:"", ejecutar: false, activeCell: true,isTextCell:false },
      ],
      menuOpciones : this.$t('workingAreaMenu'),
      currentOut:0,

      // vars for voiceComponent
      texto: this.$t('workingAreaMenu'), 
      reproducir:false,
      fileInputData:null
    };
  },
  methods: {
    procesarTecladoAlt(e) {
      console.log("con alt");
      console.log(e.key);
      if (e.key == "m") {
        
        this.$t("workingAreaMenu").forEach(element => {
          this.$refs.componenteSpeak.quickSpeak(element)
        });
        
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
      else if(e.key == "l")
      {
        console.log("EscucharCelda")
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
      this.texto=""
      if(this.arrayNoteBookCell[this.currentCell].isTextCell)
      {
        //this.speak("Celda "+(this.currentCell+1)+" "+this.arrayNoteBookCell[this.currentCell].entrada)
        this.texto="Celda "+(this.currentCell+1)+" "+this.arrayNoteBookCell[this.currentCell].entrada
        console.log("Execute Text")
      }
      else
      {
        console.log("Execute Code")
        var salidaCurrentCell=this.arrayNoteBookCell[this.currentCell];
        var indexCell=this.currentCell;
        for (var i = 0; i < salidaCurrentCell['salida'].length; i++) {
          console.log("Execute For")
          //console.log(salidaCurrentCell['salida'][i].entradaScript)

          const auxEntradaScript=salidaCurrentCell['salida'][i].entradaSpeech
          const auxSalidaScript=salidaCurrentCell['salida'][i].salidaSpeech
          
          //this.speak()
          //this.speak();
          this.$refs.componenteSpeak.quickSpeak("Celda "+(this.currentCell+1)+" Entrada "+(i+1))
          this.$refs.componenteSpeak.quickSpeak(auxEntradaScript)
          // this.texto=this.texto+". "+"Celda "+(this.currentCell+1)+" Entrada "+(i+1)
          // this.texto=this.texto+". "+auxEntradaScript

          //this.speak()
          //this.speak();  
          this.$refs.componenteSpeak.quickSpeak("Celda "+(this.currentCell+1)+" Salida "+(i+1))
          this.$refs.componenteSpeak.quickSpeak(auxSalidaScript)
          // this.texto=this.texto+". "+"Celda "+(this.currentCell+1)+" Salida "+(i+1)
          // this.texto=this.texto+". "+auxSalidaScript
          
        }
        
        
      }
      if(this.texto!="")
      {
        console.log(this.texto)
        this.reproducir=true
      }
      
      

    },
    capturarTeclado(e) {
      
      this.$refs.componenteSpeak.quickSpeak(e.key)
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
      if(this.fileInputData)
      {
        fetch(process.env.VUE_APP_BACKEND+":5000/api/scripts/"+this.fileInputData._id, {
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
    emitirSalida(resultado) {
      //console.log(resultado);

      this.arrayNoteBookCell[this.currentCell].salida = [];
      for (var i = 0; i < resultado.salida.length; i++) {
        
        this.arrayNoteBookCell[this.currentCell].salida[i] = { entradaScript: resultado.entradaScript[i], salida:resultado.salida[i],entradaSpeech:resultado.entradaSpeech[i],salidaSpeech:resultado.salidaSpeech[i]};
      }

    },
    procesarFinish(indice) {
      //console.log("finish script");
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
      fetch(process.env.VUE_APP_BACKEND+":8000/procesarScript", {
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
      fetch(process.env.VUE_APP_BACKEND+":8000/procesarScript", {
        method: "POST", 
        body: formData, 
      })
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          try {
            //console.log("ResJson")
            //console.log(myJson);

            var resultado = myJson;
            
            this.arrayNoteBookCell[inicio].salida = [];
            for (var i = 0; i < resultado.salida.length; i++) {  
              //console.log("i: "+i)
              this.arrayNoteBookCell[inicio].salida[i] = { entradaScript: resultado.entradaScript[i], salida:resultado.salida[i],entradaSpeech:resultado.entradaSpeech[i],salidaSpeech:resultado.salidaSpeech[i]};
            }
            if(inicio<this.arrayNoteBookCell.length-1)
            {
              this.ejecutarHaciaAbajoRecursive(inicio+1)
            }
          } catch (e) {
            
            console.log(e);
          }
        });
      }
      
    },
    ejecutarHaciaArribaRecursive(inicio) {
      var formData = new FormData();
      var scriptAreaTxt = this.arrayNoteBookCell[inicio].entrada;
      formData.append("scriptTxt", scriptAreaTxt);
      fetch(process.env.VUE_APP_BACKEND+":8000/procesarScript", {
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
            
            console.log(e);
          }
        });
    },
    ejecutarCelda(){
      this.ejecutarCeldaById(this.currentCell)
    },
    ejecutarTodas() {
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
          //console.log(contents);
          //console.log(this.arrayNoteBookCell);
          this.arrayNoteBookCell = null;
          this.arrayNoteBookCell = JSON.parse(contents);
          //console.log(this.arrayNoteBookCell);
        };
        reader.readAsText(file);
        // you can use this method to get file and perform respective operations
        //console.log(input.files);
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


    ////Methods for voice

    activateVoiceComponent() {
      setTimeout(() => {
          this.texto.forEach(element => {
            this.$refs.componenteSpeak.quickSpeak(element)
            console.log(element)
          });

        //this.reproducir=true
        }, 2000);
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
  created() {
    
    //this.$refs.editor.focus();
    
    
  },
  beforeMount(){
        console.log(this.$route.params)
        if(this.fileInput)
        {
          if(this.fileInput.content)
          {
            this.fileInputData=this.fileInput
            this.arrayNoteBookCell=this.fileInput.content;
          }
        }
        // else
        // {
        //   console.log("No file input")
        //   if(this.selectedLesson)
        //   {
        //     this.fileInputData=this.selectedLesson.associatedFile
        //     this.arrayNoteBookCell=this.selectedLesson.associatedFile.content;
        //   }
        // }
        
  },
  
  mounted() {
    console.log("MenuWorkingArea------------------------")
    console.log(this.$t('workingAreaMenu'))

        
    if(this.enableAudio==true)
    {
      //this.texto=this.texto.join()
      //this.texto="Inicio Area de trabajo"

      //this.activateVoiceComponent()
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