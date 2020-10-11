<template>
  <div id="app">
    <router-view></router-view>
    <!-- <router-link to="/Navbar">Navbar</router-link> -->
  </div>
</template>

<script>
// import Students from './components/Students'
// import AddStudent from './components/AddStudent'
  export default {
    name: 'App',
    components: { 

    },
  }
</script>

<style>
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>
