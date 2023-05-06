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
      img1: require("https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/leopard2.jpg"),
      img2: require("https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/lion2.jpg"),
      img3: require("https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg"),
      img4: require("https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/bear2.jpg"),
      appHeader,
      appFooter,
      citiesComp,
    };
  },
});
</script>
