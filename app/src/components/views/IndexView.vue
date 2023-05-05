<template>
  <header>
    <appHeader />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <appFooter />
  </footer>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import appHeader from "@/components/modules/appHeader.vue";
import appFooter from "@/components/modules/appFooter.vue";

export default defineComponent({
  name: "IndexView",
  components: { appHeader, appFooter, RouterView },
  setup() {
    return {
      appHeader,
      appFooter,
      RouterView,
    };
  },
});
</script>
