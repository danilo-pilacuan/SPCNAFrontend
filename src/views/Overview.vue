<template>
    <div v-if="selectedCourse">
        <div class="columns">
        <div class="column">
            <div class="card" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
            <section class="hero">
                <div class="hero-body">
                <div class="columns">
                    <div class="column is-four-fifths">
                    <p class="title">Alumnos</p>
                    <p class="subtitle">{{ selectedCourse.users.length }}</p>
                    </div>
                    <div class="column is-one-fifths">
                    <b-icon icon="account" size="is-large"> </b-icon>
                    </div>
                </div>
                </div>
            </section>
            </div>
        </div>
        <div class="column">
            <div class="card" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
            <section class="hero">
                <div class="hero-body">
                <div class="columns">
                    <div class="column is-four-fifths">
                    <p class="title">Lecciones</p>
                    <p class="subtitle">{{ selectedCourse.users.length }}</p>
                    </div>
                    <div class="column is-one-fifths">
                    <b-icon icon="human-male-board" size="is-large"> </b-icon>
                    </div>
                </div>
                </div>
            </section>
            </div>
        </div>
        <div class="column">
            <div class="card" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
            <section class="hero">
                <div class="hero-body">
                <div class="columns">
                    <div class="column is-four-fifths">
                    <p class="title">Actividades</p>
                    <p class="subtitle">{{ selectedCourse.users.length }}</p>
                    </div>
                    <div class="column is-one-fifths">
                    <b-icon icon="school" size="is-large"> </b-icon>
                    </div>
                </div>
                </div>
            </section>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
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
  },
  methods: {},
  mounted() {},
};
</script>