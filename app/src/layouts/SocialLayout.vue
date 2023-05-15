<template>
  <socialHeader />
  <slot></slot>
  <socialFooter />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import socialHeader from "@/components/historicHeader.vue";
import socialFooter from "@/components/pastFooter.vue";

export default defineComponent({
  name: "social-layout",
  components: { socialHeader, socialFooter },
  setup() {
    return {
      socialHeader,
      socialFooter,
    };
  },
});
</script>
