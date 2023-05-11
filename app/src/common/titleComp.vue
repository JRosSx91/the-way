<template>
  <div class="mx-auto">
    <h1>W<span>AI</span></h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "title-comp",
});
</script>
<style lang="scss" scoped>
h1 {
  color: white;
  font-size: larger;

  span {
    color: red;
  }
}
</style>
