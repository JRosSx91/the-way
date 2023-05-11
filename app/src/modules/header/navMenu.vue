<template>
  <div class="flex">
    <nav class="flex" :class="store.dark ? 'text-white' : 'text-black'">
      <a class="active" href="#">History</a>
      <a href="#">Legends</a>
    </nav>
    <titleComp class="mx-5" />
    <nav class="flex" :class="store.dark ? 'text-white' : 'text-black'">
      <a href="#">Need help?</a>
      <a href="#">AI Assistant (soon)</a>
    </nav>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useStore from "@/store";
import titleComp from "@/common/titleComp.vue";

export default defineComponent({
  name: "nav-menu",
  components: { titleComp },
  setup() {
    const store = useStore();
    return {
      store,
      titleComp,
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
