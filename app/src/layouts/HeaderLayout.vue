<template>
  <header>
    <div class="inner">
      <headerLogo />
      <div class="burger"></div>
      <navMenu />
      <!-- DonateComp -->
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import navMenu from "@/components/modules/header/navMenu.vue";
import headerLogo from "@/components/modules/header/headerLogo.vue";
import useStore from "@/store";

export default defineComponent({
  name: "header-layout",
  components: { navMenu, headerLogo },
  setup() {
    const store = useStore();

    return {
      store,
      navMenu,
      headerLogo,
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
}
</style>
