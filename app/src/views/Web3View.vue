<template>
  <MainLayout></MainLayout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MainLayout from "@/layouts/MainLayout.vue";

export default defineComponent({
  name: "web3-view",
  components: { MainLayout },
  setup() {
    return {
      MainLayout,
    };
  },
});
</script>
