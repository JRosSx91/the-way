<template>
  <PastLayout> </PastLayout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PastLayout from "@/layouts/PastLayout.vue";
import useStore from "@/store";

export default defineComponent({
  name: "IndexView",
  components: { PastLayout },
  setup() {
    const store = useStore();
    return {
      PastLayout,
      store,
    };
  },
});
</script>
