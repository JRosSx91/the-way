<template>
  <header>
    <div class="inner">
      <headerLogo />
      <navMenu />
      <donateComp />
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import navMenu from "@/components/modules/header/navMenu.vue";
import headerLogo from "@/components/modules/header/headerLogo.vue";
import donateComp from "@/components/common/donateComp.vue";
import useStore from "@/store";

export default defineComponent({
  name: "header-layout",
  components: { navMenu, headerLogo, donateComp },
  setup() {
    const store = useStore();

    return {
      store,
      navMenu,
      headerLogo,
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
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/menutexture.png);
  background-position: center top;
  background-size: auto 200px;
  background-repeat: repeat-x;

  .inner {
    max-width: 1060px;
    margin: 0 auto;
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: center;
    position: relative;
  }
}
</style>
