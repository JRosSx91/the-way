<template>
  <headerComp />
  <main>
    <slot></slot>
  </main>
  <footerComp />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import footerComp from "@/components/footerComp.vue";
import headerComp from "@/components/headerComp.vue";

export default defineComponent({
  name: "main-layout",
  components: { footerComp, headerComp },
  setup() {
    return {
      footerComp,
      headerComp,
    };
  },
});
</script>
