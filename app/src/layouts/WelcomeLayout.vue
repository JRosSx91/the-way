<template>
  <welcomeBack />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import welcomeBack from "@/components/welcomeBack.vue";

export default defineComponent({
  name: "welcome-layout",
  components: { welcomeBack },
  setup() {
    return {
      welcomeBack,
    };
  },
});
</script>
