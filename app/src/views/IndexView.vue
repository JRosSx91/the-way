<template>
  <header-layout />
  <citiesComp />
  <footer-layout />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import FooterLayout from "@/layouts/FooterLayout.vue";
import HeaderLayout from "@/layouts/HeaderLayout.vue";
import citiesComp from "@/components/modules/citiesComp.vue";

export default defineComponent({
  name: "IndexView",
  components: { HeaderLayout, FooterLayout, citiesComp },
  setup() {
    return {
      HeaderLayout,
      FooterLayout,
      citiesComp,
    };
  },
});
</script>
