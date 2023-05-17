<template>
  <main>
    <div class="container">
      <h2>Past</h2>
      <div class="past-text">
        <img :src="manuscrito" />
        <h2></h2>
        <p></p>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "past-ways",
  setup() {
    return {
      manuscrito: require("@/assets/img/manuscrito.png"),
    };
  },
});
</script>
<style lang="scss" scoped>
main {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  background-image: url("@/assets/img/welcome1.jpg");
}
</style>
