<template>
  <div id="home">
    <div class="container">
      <div class="block">
        <div class="columns">
          <div class="column">
            <b-button type="is-primary" @click="handleSelect">Seleccionar Curso</b-button>
          </div>
          
        </div>
      </div>
    </div>
    <div class="container" v-show="isSelectCourse">
      <div class="block">
        <div class="columns">
          <div class="column">
            <b-table
              :data="tableData"
              :columns="columns"
              :selected.sync="selected"
              focusable
            ></b-table>
          <b-button class="m-2" type="is-primary" @click="handleSelect">Seleccionar</b-button>
          <b-button class="m-2" type="is-danger" @click="isSelectCourse=false">Cancelar</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-show="userType==2">
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary">
              <div class="hero-body">
                <p class="title">Lecciones</p>
                <p class="subtitle">Administración de Lecciones</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-show="userType==2">
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary">
            <div class="hero-body">
                <p class="title">Actividades</p>
                <p class="subtitle">Administración de Actividades</p>
            </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    
    <div class="container" v-show="userType==3">
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary">
              <div class="hero-body">
                <p class="title">Lecciones</p>
                <p class="subtitle">Tomar Lecciones</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-show="userType==3">
      <div class="block">
        <div class="columns">
          <div class="column">
            <section class="hero is-primary">
            <div class="hero-body">
                <p class="title">Actividades</p>
                <p class="subtitle">Realizar de Actividades</p>
            </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    
 
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: false,
      tableData:[],
      selected: null,
      isSelectCourse:false,
      columns: [
        // {
        //     field: '_id',
        //     label: 'ID',
        //     //width: '40,
        //     //numeric: true
        // },
        {
          field: "name",
          label: "Nombre",
        },
        {
          field: "description",
          label: "Descripcion",
        },
        // {
        //   field: "typeDescription",
        //   label: "Tipo de usuario",
        // },
      ],
    };
  },
  methods:{
    fetchCourses() {
      try {
        fetch(process.env.VUE_APP_BACKEND+":5000/api/courses", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tableData = data;
              
              console.log(resp);
            } else {
              //this.$router.push("/login")
              this.tableData = [];
            }
          });
      } catch (e) {
        this.$store.dispatch("setAuth", false);
      }
    },
    handleSelect()
    {
        console.log("das")
        console.log(this.selectedCourse)
    },
    handleSeleccionar()
    {
    //   console.log("selected")
    //   if(this.selected)
    //   {
    //     this.$store.dispatch("setSelectedCourse", this.selected);
    //   }
    }
  },
  mounted() {
    
    this.fetchCourses()
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

};
</script>

<style>
</style>