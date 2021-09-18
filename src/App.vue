<template>
  <div id="app">
    <Header />
    <div class="top-wrapper">
      <router-view />
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  /* width: 800px; */
  width: 100%;
  margin: auto;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
