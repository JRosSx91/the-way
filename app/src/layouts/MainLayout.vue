<template>
  <headerComp />
  <main>
    <slot></slot>
  </main>
  <footerComp />
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "main-layout",
});
</script>
