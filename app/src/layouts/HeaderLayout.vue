<template>
  <header>
    <div class="inner">
      <!-- <HeaderLogoComp /> -->
      <div class="logo">
        <img :src="logo" alt="logo" />
      </div>
      <div class="burger"></div>
      <!-- NavMenuComp-->

      <!-- DonateComp -->
      <a href="#" class="donate-link">Donate</a>
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
  components: {}
  setup() {
    const store = useStore();

    return {
      logo: require("@/assets/img/prueba-logo-camino.png"),
      store,
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

  .donate-link {
    width: 72px;
    text-align: center;
    position: absolute;
    right: 10px;
    top: 27px;
    font-family: "Arial", sans-serif;
    font-size: 12px;
    color: white;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-decoration: none;
    padding-bottom: 6px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  }
}
</style>
