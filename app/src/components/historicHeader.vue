<template>
  <header>
    <div class="inner flex justify-between">
      <historicalNav />
      <donateComp />
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import historicalNav from "@/modules/header/historicalNav.vue";
import donateComp from "@/common/donateComp.vue";
import useStore from "@/store";

export default defineComponent({
  name: "header-comp",
  components: { historicalNav, donateComp },
  setup() {
    const store = useStore();

    return {
      store,
      historicalNav,
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
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/menutexture.png");

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
