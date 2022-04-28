<template>
  <div id="users" class="home">
    <div class="container">
      <div class="block">
        <div class="columns">
          <div class="column is-narrow">
            <h1>Usuarios</h1>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <b-button type="is-primary" @click="addUser">Crear</b-button>
          </div>
 
        </div>
       
        <div class="columns">
          <div class="column is-1"></div>
          <div class="column">

            <b-table
              :data="tableData"
              :bordered="true"
              :striped="true"
              :narrowed="false"
              :hoverable="false"
              :loading="false"
              :focusable="true"
              :mobile-cards="false"
              :searchable="true"
            >
              <b-table-column
                field="name"
                label="Nombre"
                v-slot="props"
                searchable
              >
                {{ props.row.name }}
              </b-table-column>

              <b-table-column
                field="email"
                label="Correo"
                v-slot="props"
                searchable
              >
                {{ props.row.email }}
              </b-table-column>

              <b-table-column
                field="typeDescription"
                label="Tipo de usuario"
                v-slot="props"
                searchable
              >
 
                {{ props.row.typeDescription }}
              </b-table-column>

              <b-table-column field="actions" label="Acciones" v-slot="props">
                <div class="buttons">
                  <b-button
                    rounded
                    type="is-warning"
                    icon-left="pencil"
                    @click="editUser(props.row)"
                  >
                  </b-button>
                  <b-button
                    rounded
                    type="is-danger"
                    icon-left="delete"
                    @click="deleteUser(props.row)"
                  >
                  </b-button>
                </div>
              </b-table-column>
            </b-table>
          </div>
          <div class="column is-1"></div>
        </div>

      </div>
    </div>

    <b-modal v-model="showModalCreateEdit">
      <form @submit.prevent="submit">
        <!-- <b-checkbox v-model="hasError">Show errors</b-checkbox> -->
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p v-show="isAddUser" class="modal-card-title">Crear Usuario</p>
            <p v-show="isEditUser" class="modal-card-title">Editar Usuario</p>
            <button type="button" class="delete" @click="showModalCreateEdit=false" />
          </header>
          <section class="modal-card-body">
            <div class="columns">
              <div class="column">
                <b-field
                  label="Nombre de Usuario"
                  :type="{ 'is-danger': validateUsername }"
                  :message="{ 'Username is not available': validateUsername }"
                >
                  <b-input v-model="username" maxlength="30"></b-input>
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field
                  label="Correo Electrónico"
                  :type="{ 'is-danger': validateUsername }"
                  :message="{ 'Username is not available': validateUsername }"
                >
                  <b-input v-model="email" maxlength="30"></b-input>
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field
                  v-show="!isEditUser"
                  label="Contraseña"
                  :type="{ 'is-danger': validatePassword }"
                  :message="[
                    { 'Password is too short': validatePassword },
                    {
                      'Password must have at least 8 characters':
                        validatePassword,
                    },
                  ]"
                >
                  <b-input
                    v-show="!isEditUser"
                    v-model="password"
                    type="password"
                    maxlength="30"
                  ></b-input>
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <b-field
                  v-show="!isEditUser"
                  :message="[
                    { 'Password is too short': validatePassword },
                    {
                      'Password must have at least 8 characters':
                        validatePassword,
                    },
                  ]"
                >
                  <b-input
                    v-show="!isEditUser"
                    v-model="password2"
                    type="password"
                    maxlength="30"
                  ></b-input>
                </b-field>
              </div>
            </div>

            <div class="columns" v-show="!isEditUser">
              <div class="column">
                <b-field label="Seleccionar tipo de usuario">
                  <b-select
                    placeholder="Seleccionar tipo de usuario"
                    v-model="typeSelected"
                  >
                    <option
                      v-for="option in userTypes"
                      :value="option.id"
                      :key="option.id"
                    >
                      {{ option.description }}
                    </option>
                  </b-select>
                </b-field>
                
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <div class="columns">
              <div class="column">
                <b-button type="is-primary" @click="submit" label="Crear" />
              </div>
              <div class="column">
                <b-button type="is-danger" @click="cancel" label="Cancelar" />
              </div>
            </div>
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password2: "",
      updateFailed: false,
      validatePassword: false,
      validateUsername: false,
      tableData: [],
      selected: null,
      isAddUser: false,
      isEditUser: false,
      showModalCreateEdit: false,
      showModalDelete: false,
      userTypes: [
        { id: 2, description: "Profesor" },
        { id: 3, description: "Estudiante" },
      ],
      typeSelected: 2,
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
          field: "email",
          label: "Correo",
        },
        {
          field: "typeDescription",
          label: "Tipo de usuario",
        },
      ],
    };
  },
  mounted() {
    this.fetchUsers();
    this.authLogin();
  },
  methods: {
    
    fetchUsers() {
      try {
        fetch("http://localhost:5000/api/users/getAll", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data;

            if (data) {
              this.tableData = data;
              for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].userType == 1) {
                  this.tableData[i].typeDescription = "Administrador";
                } else if (this.tableData[i].userType == 2) {
                  this.tableData[i].typeDescription = "Profesor";
                } else if (this.tableData[i].userType == 3) {
                  this.tableData[i].typeDescription = "Estudiante";
                }
              }
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
    addUser() {
      this.showModalCreateEdit = true;
      this.isAddUser = true;
      this.isEditUser=false;
    },
    editUser(row) {
      // if (this.selected) {
      //   this.isEditUser = true;
      //   this.username = this.selected.name;
      //   this.email = this.selected.email;
      // }
      // console.log(row)
      // this.$buefy.dialog.alert(JSON.stringify(row))
      
      this.isAddUser = false;
      this.isEditUser = true;
      this.username = row.name;
      this.email = row.email;
      // this.password = row.name;
      // this.password2 = row.name;
      this.showModalCreateEdit = true;
    },
    deleteUser(row) {
      console.log(row);
      this.$buefy.dialog.alert(JSON.stringify(row));
    },

    submit() {
      if (this.isAddUser) {
        fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: this.username,
            email: this.email,
            password: this.password,
            userType: this.typeSelected,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            var resp = data.message;
            console.log(resp);
            this.selected = null;
            this.isAddUser = false;
            this.isEditUser = false;
            this.username = "";
            this.email = "";
            this.password = "";
            this.password2 = "";
            //this.fetchUsers();
            this.showModalCreateEdit=false;
            this.$buefy.dialog.alert("Usuario agregado correctamente");
          });

        this.fetchUsers();
      } else if (this.isEditUser) 
      {

      }
    },

    cancel() {
      this.selected = null;
      this.isAddUser = false;
      this.isEditUser = false;
      this.username = "";
      this.email = "";
      this.password = "";
      this.password2 = "";
      //this.showModalCreateEdit=false;
    },
    alert() {
      this.$buefy.dialog.alert("Everything looks fine!");
    },
  },
};
</script>

<style>
</style>