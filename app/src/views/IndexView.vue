<template>
  <appHeader />
  <citiesComp :images="[img1, img2, img3, img4]" />
  <appFooter />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import appHeader from "@/components/modules/appHeader.vue";
import appFooter from "@/components/modules/appFooter.vue";
import citiesComp from "../modules/citiesComp.vue";

export default defineComponent({
  name: "IndexView",
  components: { appHeader, appFooter, citiesComp },
  setup() {
    return {
      img1: require("@/assets/img/leopard2.jpg"),
      img2: require("@/assets/img/lion2.jpg"),
      img3: require("@/assets/img/tiger2.jpg"),
      img4: require("@/assets/img/bear2.jpg"),
      appHeader,
      appFooter,
      citiesComp,
    };
  },
});
</script>
