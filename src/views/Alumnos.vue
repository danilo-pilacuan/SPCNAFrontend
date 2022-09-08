<template>
  <div class="home">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Alumnos</p>
        <b-button class="m-3" type="is-primary" @click="guardarAlumnos"
          >Guardar</b-button
        >
      </header>
      <div class="card-content">
        <div class="content">
          <div class="columns" v-if="tablaInscritos && tablaNoInscritos">
            <div class="column is-half">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">No Inscritos</p>
                </header>
                <div class="card-content">
                  <div class="content">
                    <b-table
                      :data="tablaNoInscritos"
                      :bordered="true"
                      :striped="true"
                      :narrowed="false"
                      :hoverable="false"
                      :loading="false"
                      :focusable="true"
                      :mobile-cards="false"
                      :searchable="true"
                      :paginated="true"
                      :per-page="5"
                    >
                      <template v-for="column in columns">
                        <b-table-column :key="column.id" v-bind="column">
                          <template
                            v-if="column.searchable && !column.numeric"
                            #searchable="props"
                          >
                            <b-input
                              v-model="props.filters[props.column.field]"
                              placeholder="Buscar..."
                              icon="magnify"
                              size="is-small"
                            />
                          </template>
                          <template v-slot="props">
                            <div
                              v-if="typeof props.row[column.field] === 'object'"
                            >
                              {{ props.row[column.field][column.subField] }}
                            </div>
                            <div v-else>
                              {{ props.row[column.field] }}
                            </div>
                          </template>
                        </b-table-column>
                      </template>
                      <b-table-column
                        field="actions"
                        label="Acciones"
                        v-slot="props"
                      >
                        <b-button
                          rounded
                          type="is-primary"
                          icon-left="plus"
                          @click="agregarInscrito(props.row)"
                        >
                        </b-button>
                      </b-table-column>
                    </b-table>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-half">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">Inscritos</p>
                </header>
                <div class="card-content">
                  <div class="content">
                    <b-table
                      :data="tablaInscritos"
                      :bordered="true"
                      :striped="true"
                      :narrowed="false"
                      :hoverable="false"
                      :loading="false"
                      :focusable="true"
                      :mobile-cards="false"
                      :searchable="true"
                      :paginated="true"
                      :per-page="5"
                    >
                      <template v-for="column in columns">
                        <b-table-column :key="column.id" v-bind="column">
                          <template
                            v-if="column.searchable && !column.numeric"
                            #searchable="props"
                          >
                            <b-input
                              v-model="props.filters[props.column.field]"
                              placeholder="Buscar..."
                              icon="magnify"
                              size="is-small"
                            />
                          </template>
                          <template v-slot="props">
                            <div
                              v-if="typeof props.row[column.field] === 'object'"
                            >
                              {{ props.row[column.field][column.subField] }}
                            </div>
                            <div v-else>
                              {{ props.row[column.field] }}
                            </div>
                          </template>
                        </b-table-column>
                      </template>
                      <b-table-column
                        field="actions"
                        label="Acciones"
                        v-slot="props"
                      >
                        <div class="buttons">
                          <b-button
                            rounded
                            type="is-danger"
                            icon-left="delete"
                            @click="removerInscrito(props.row)"
                          >
                          </b-button>
                        </div>
                      </b-table-column>
                    </b-table>
                  </div>
                </div>
              </div>
            </div>
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
      inputBuscarAlumno: "",
      tablaAlumnos: null,
      tablaInscritos: null,
      tablaNoInscritos: null,
      tablaSendAlumnos:null,
      columns: [
        {
          field: "name",
          label: "Nombres",
          searchable: true,
        },
      ],
    };
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
    currentUser() {
      return this.$store.state.currentUser;
    },
    filterAlumnos() {
      return this.tablaAlumnos.filter((option) => {
        return (
          option.nombre
            .toString()
            .toLowerCase()
            .indexOf(this.inputBuscarActivo.toLowerCase()) >= 0
        );
      });
    },
  },
  methods: {
    agregarInscrito(selectedAlumno) {
      this.tablaInscritos.unshift(selectedAlumno);
      console.log("Selected alumno");
      console.log(selectedAlumno);
      this.tablaNoInscritos = this.tablaNoInscritos.filter(
        (alumno) => alumno != selectedAlumno
      );
      this.tablaSendAlumnos.unshift(selectedAlumno._id);
    },
    removerInscrito(selectedAlumno) {
      this.tablaNoInscritos.unshift(selectedAlumno);
      this.tablaInscritos = this.tablaInscritos.filter(
        (alumno) => alumno != selectedAlumno
      );
      this.tablaSendAlumnos = this.tablaSendAlumnos.filter(
        (idAlumno) => idAlumno != selectedAlumno._id
      );

    },
    guardarAlumnos() {
      fetch(process.env.VUE_APP_BACKEND+":5000/api/courses/adduserstocourse/"+this.selectedCourse._id, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ alumnos: this.tablaSendAlumnos}),
      })
        .then((response) => response.json())
        .then((data) => {
          var resp = data.message;
          console.log(resp);
          if (resp == "success") {
            this.$buefy.dialog.alert("Alumnos agregados correctamente");
            //this.$router.push("/");
          } else 
          {
              console.log("Error")
          }
        });
    },
    fetchAlumnos() {
      try {
        fetch(process.env.VUE_APP_BACKEND+":5000/api/users/getAlumnos", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tablaAlumnos = data;
              this.tablaInscritos = this.tablaAlumnos.filter((alumno) =>
                alumno.courses.find(
                  (element) => element._id == this.selectedCourse._id
                )
              );
              this.tablaNoInscritos = this.tablaAlumnos.filter(
                (alumno) =>
                  !alumno.courses.find(
                    (element) => element._id == this.selectedCourse._id
                  )
              );
              this.tablaSendAlumnos = this.tablaInscritos.map(elemento=>elemento._id)

              console.log("alumnos");
              console.log(resp);
              console.log("inscritos");
              console.log(this.tablaInscritos);
              console.log("No inscritos");
              console.log(this.tablaNoInscritos);
              console.log("TablaSend")
              console.log(this.tablaSendAlumnos)
            } else {
              //this.$router.push("/login")
              this.tablaAlumnos = [];
            }
          });
      } catch (e) {
        this.$store.dispatch("setAuth", false);
      }
    },
  },
  mounted() {
    this.fetchAlumnos();
  },
};
</script>