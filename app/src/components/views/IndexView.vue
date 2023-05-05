<template>
  <appHeader />
  <router-view />
  <appFooter />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import appHeader from "@/components/modules/appHeader";
import appFooter from "@/components/modules/appFooter";

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
