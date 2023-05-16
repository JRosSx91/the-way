<template>
  <PastLayout>
    <PastWays />
  </PastLayout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PastLayout from "@/layouts/PastLayout.vue";
import useStore from "@/store";
import PastWays from "@/components/pastWays.vue";

export default defineComponent({
  name: "IndexView",
  components: { PastLayout, PastWays },
  setup() {
    const store = useStore();
    return {
      PastLayout,
      PastWays,
      store,
    };
  },
});
</script>
