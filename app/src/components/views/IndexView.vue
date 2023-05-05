<template>
  <appHeader />
  <citiesComp />
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
      appHeader,
      appFooter,
      citiesComp,
    };
  },
});
</script>
