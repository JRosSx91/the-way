<template>
  <div class="logo">
    <img :src="logo" alt="logo" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "header-logo",
  setup() {
    return {
      logo: require("@/assets/img/prueba-logo-camino.png"),
    };
  },
});
</script>
<style lang="scss" scoped>
.logo {
  display: block;
  width: 76px;
  height: 90px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  text-align: center;

  img {
    width: 150px;
    margin-top: 1.5rem;
  }
}
</style>
