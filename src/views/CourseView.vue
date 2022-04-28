<template>
    <div id="coursesView">
        <HandleUpdate/>
        <div class="columns m-0" style="margin-top: -1em;">
          <div class="column is-one-fifth" style="background-color: #f8f4f4; box-shadow: rgba(0, 0, 0, 0.15) 10px 0px 15px;">
              <div class="columns">
                  <div class="column">
                      <div class="card">
                        <!-- <div class="card-image ml-2">
                            <figure class="image is-4by3">
                            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                            </figure>
                        </div> -->
                        <div class="card-content">
                            <div class="media">
                            <div class="media-content" v-if="selectedCourse">
                                <p class="title is-4">{{selectedCourse.name}}</p>
                                <p class="subtitle is-6">{{selectedCourse.description}}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
              <div class="columns">
                  <div class="column">
                    <router-link to="/curso/">
                        <div class="title is-5 has-text-left">
                            <b-icon
                                icon="book-information-variant">
                            </b-icon>
                            Resumen
                        </div>
                    </router-link>
                  </div>
              </div>
              
              <div class="columns">
                  <div class="column">
                     <router-link to="/curso/alumnos">
                        <div class="title is-5 has-text-left">
                            <b-icon
                                icon="account">
                            </b-icon>
                            Alumnos
                        </div>
                     </router-link>
                  </div>
              </div>

              <div class="columns">
                  <div class="column">
                    <router-link to="/curso/lecciones">
                        <div class="title is-5 has-text-left">
                            <b-icon
                                icon="human-male-board">
                            </b-icon>
                            Lecciones
                        </div>
                    </router-link>
                  </div>
              </div>
              <div class="columns">
                  <div class="column">
                      <router-link to="/curso/actividades">
                          <div class="title is-5 has-text-left">
                            <b-icon
                                icon="school">
                            </b-icon>
                            Actividades
                          </div>
                      </router-link>
                  </div>
              </div>
              <div class="columns">
                  <div class="column">
                      <router-link to="/curso/calificaciones">
                      <div class="title is-5 has-text-left">
                        <b-icon
                            icon="file-table">
                        </b-icon>
                        Calificaciones
                      </div>
                      </router-link>
                  </div>
              </div>
              <div class="columns">
                  <div class="column">
                      <router-link to="/curso/fileexplorer">
                    <div class="title is-5 has-text-left">
                        <b-icon
                            icon="pencil-box-multiple">
                        </b-icon>
                        Área de Trabajo
                    </div>
                    </router-link>
                  </div>
              </div>
              
              <div class="columns">
                  <div class="column">
                      <br><br><br><br><br><br><br>
                  </div>
              </div>
              
          </div>
          <div class="column">

            <div class="card ml-2">
                <!-- <header class="card-header">
                    <p class="card-header-title" v-if="selectedCourse">
                        {{selectedCourse.name}}                                
                    </p>
                </header> -->
                <div class="card-content">
                    <router-view/>       
                </div>
                </div>

             

            <!-- ---------- -->
          </div>
        </div>

    </div>
</template>
<script>
import WorkingArea from '../views/WorkingArea'
import HandleUpdate from '../components/HandleUpdate'
export default {
  components: {
    "WorkingArea": WorkingArea,
    "HandleUpdate": HandleUpdate
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
    data(){
        return{
        }
    },
    methods: {
        fetchCourse() {
        try {
            fetch("http://localhost:5000/api/courses/"+this.courseId, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            })
            .then((response) => response.json())
            .then((data) => {
                var resp = data;

                if (data) {
                
                console.log("Curso current")
                this.$store.dispatch("setSelectedCourse", data);
                console.log(resp);
                } else {
                //this.$router.push("/login")
                this.tableData = [];
                }
            });
        } catch (e) {
            this.$store.dispatch("setSelectedCourse", null);
        }
        },
    },
}
</script>