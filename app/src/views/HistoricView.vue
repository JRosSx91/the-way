<template>
  <MainLayout> </MainLayout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import useStore from "@/store";

export default defineComponent({
  name: "IndexView",
  components: { MainLayout },
  setup() {
    const store = useStore();
    return {
      MainLayout,
      store,
    };
  },
});
</script>
