<template>
  <div id="app">
    <UserHandle/>
    <Nav />
    
    <router-view/>
    <Footer />
  </div>
</template>
<script>

import Nav from '../src/components/Nav'
import Footer from '../src/components/Footer'
import UserHandle from '../src/components/UserHandle'
export default {
  components: {
    "Nav": Nav,
    "Footer" : Footer,
    "UserHandle": UserHandle
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
}



</style>
