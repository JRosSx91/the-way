<template>
  <div class="logo">
    <img :src="logo" alt="logo" />
  </div>
  <div class="burger"></div>
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
.burger {
  display: block;
  position: relative;
  top: -6px;
  padding-left: 30px;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 30px;
    height: 2px;
    background: white;
    box-shadow: 0 12px 0 0 white, 0 6px 0 0 white;
  }

  @media screen and (min-width: 800px) {
    display: none;
  }
}
</style>
