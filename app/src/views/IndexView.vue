<template>
  <header-layout />
  <citiesComp :images="[img1, img2, img3, img4]" />
  <footer-layout />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import FooterLayout from "@/layouts/FooterLayout.vue";
import HeaderLayout from "@/layouts/HeaderLayout.vue";
import citiesComp from "../modules/citiesComp.vue";

export default defineComponent({
  name: "IndexView",
  components: { HeaderLayout, FooterLayout, citiesComp },
  setup() {
    return {
      img1: require("@/assets/img/leopard2.jpg"),
      img2: require("@/assets/img/lion2.jpg"),
      img3: require("@/assets/img/tiger2.jpg"),
      img4: require("@/assets/img/bear2.jpg"),
      HeaderLayout,
      FooterLayout,
      citiesComp,
    };
  },
});
</script>
