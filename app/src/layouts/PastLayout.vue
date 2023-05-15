<template>
  <historicHeader />
  <slot></slot>
  <pastFooter />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import historicHeader from "@/components/historicHeader.vue";
import pastFooter from "@/components/pastFooter.vue";

export default defineComponent({
  name: "past-layout",
  components: { historicHeader, pastFooter },
  setup() {
    return {
      historicHeader,
      pastFooter,
    };
  },
});
</script>
