<template>
  <socialLayout></socialLayout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SocialLayout from "@/layouts/SocialLayout.vue";

export default defineComponent({
  name: "social-view",
  components: { SocialLayout },
  setup() {
    return {
      SocialLayout,
    };
  },
});
</script>
