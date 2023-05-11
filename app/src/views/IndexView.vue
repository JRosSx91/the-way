<template>
  <MainLayout></MainLayout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import citiesComp from "@/components/modules/slider/citiesComp.vue";
import nightCities from "@/components/modules/slider/nightCities.vue";
import useStore from "@/store";

export default defineComponent({
  name: "IndexView",
  components: { MainLayout, citiesComp, nightCities },
  setup() {
    const store = useStore();
    return {
      MainLayout,
      citiesComp,
      nightCities,
      store,
    };
  },
});
</script>
