<template>
  <div class="flex align-middle justify-center">
    <nav class="mt-3" :class="store.dark ? 'text-white' : 'text-black'">
      <router-link to="/past"><a class="active">Present</a></router-link>
      <router-link to="/ways"><a>Ways</a></router-link>
    </nav>
    <titleComp class="mx-7" />
    <nav class="mt-3" :class="store.dark ? 'text-white' : 'text-black'">
      <router-link to="/social"><a>Social</a></router-link>
      <router-link to="/web3"><a>Web3</a></router-link>
    </nav>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useStore from "@/store";
import titleComp from "@/common/titleComp.vue";

export default defineComponent({
  name: "past-nav",
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
@font-face {
  font-family: "Enchanted Land";
  src: url("@/assets/fonts/Enchanted\ Land.otf");
}
nav {
  display: none;

  a {
    font-family: "Enchanted Land", serif;
    font-size: 2rem;
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
