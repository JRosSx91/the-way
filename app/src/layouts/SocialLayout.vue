<template>
  <socialHeader />
  <socialMenu />
  <slot></slot>
  <socialFooter />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import socialHeader from "@/components/historicHeader.vue";
import socialFooter from "@/components/pastFooter.vue";
import socialMenu from "@/components/socialMenu.vue";

export default defineComponent({
  name: "past-layout",
  components: { socialHeader, socialMenu, socialFooter },
  setup() {
    return {
      socialHeader,
      socialMenu,
      socialFooter,
    };
  },
});
</script>

