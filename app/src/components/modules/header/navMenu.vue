<template>
  <nav :class="store.dark ? 'text-white' : 'text-black'">
    <a class="active" href="#">History</a>
    <a href="#">Legends</a>
    <a href="#">RRSS</a>
    <a href="#">Need help?</a>
    <a href="#">AI Assistant (soon)</a>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useStore from "@/store";

export default defineComponent({
  name: "nav-menu",
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
});
</script>
<style lang="scss" scoped>
nav {
  display: none;

  a {
    font-family: "Arial", serif;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-decoration: none;
    margin: 0 18px;

    &.active,
    &:hover {
      font-weight: bold;
    }
  }

  @media screen and (min-width: 900px) {
    display: block;
  }
}
</style>
