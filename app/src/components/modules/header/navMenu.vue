<template>
  <nav>
    <a class="active" href="#">Species</a>
    <a href="#">About Us</a>
    <a href="#">Our Work</a>
    <a href="#">Get Involved</a>
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
    color: #8c8c8e;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-decoration: none;
    margin: 0 18px;

    &.active,
    &:hover {
      color: white;
    }
  }

  @media screen and (min-width: 800px) {
    display: block;
  }
}
</style>
