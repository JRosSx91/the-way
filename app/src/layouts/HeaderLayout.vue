<template>
  <header>
    <div
      class="inner flex justify-between"
      :class="store.dark ? 'bg-zinc-900/50' : 'bg-zinc-100/50'"
    >
      <lightButton />
      <navMenu />
      <donateComp />
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import navMenu from "@/components/modules/header/navMenu.vue";
import donateComp from "@/components/common/donateComp.vue";
import useStore from "@/store";
import lightButton from "@/components/common/lightButton.vue";

export default defineComponent({
  name: "header-layout",
  components: { navMenu, donateComp, lightButton },
  setup() {
    const store = useStore();

    return {
      store,
      navMenu,
      lightButton,
      donateComp,
    };
  },
});
</script>
<style lang="scss" scoped>
header {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 115px;
  z-index: 10;
  background-position: center top;
  background-size: auto 200px;
  background-repeat: repeat-x;

  .inner {
    max-width: 100vw;
    margin: 0 auto;
    display: flex;
    height: 70px;
    align-items: center;
    position: relative;
  }
}
</style>
