<template>
  <header-layout />
  <citiesComp v-if="!store.dark" />
  <nightCities v-else />
  <footer-layout />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import FooterLayout from "@/layouts/FooterLayout.vue";
import HeaderLayout from "@/layouts/HeaderLayout.vue";
import citiesComp from "@/components/modules/slider/citiesComp.vue";
import nightCities from "@/components/modules/slider/nightCities.vue";
import useStore from "@/store";

export default defineComponent({
  name: "IndexView",
  components: { HeaderLayout, FooterLayout, citiesComp, nightCities },
  setup() {
    const store = useStore();
    return {
      HeaderLayout,
      FooterLayout,
      citiesComp,
      nightCities,
      store,
    };
  },
});
</script>
