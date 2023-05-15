<template>
  <MainLayout>
    <citiesComp v-if="!store.dark" />
    <nightCities v-else />
  </MainLayout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import useStore from "@/store";
import citiesComp from "@/modules/slider/citiesComp.vue";
import nightCities from "@/modules/slider/nightCities.vue";

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
