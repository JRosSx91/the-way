<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {},
});
</script>

<style lang="scss">
html {
  overflow-x: hidden; 
}
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  background-color: transparent !important;
}

::-webkit-scrollbar-track {
  background-color: rgba(26, 26, 26, 0.692) !important;
  border-radius: 1rem;
  margin: 0.4rem;
  margin-top: 0.4rem;
  border-left: 1px solid rgba(211, 211, 211, 0) !important;
}

::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: linear-gradient(
    140deg,
    rgba(0, 0, 0, 0.384),
    #00000031
  ) !important;
  box-shadow: inset 0 0 6px rgb(0, 0, 0) !important;
}
#app {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 auto;
  padding: 0;
}
</style>
