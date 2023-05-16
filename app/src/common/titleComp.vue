<template>
  <div class="mx-auto">
    <router-link to="/"
      ><h1>W<span>AI</span></h1></router-link
    >
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
  font-size: 50px;

  span {
    color: red;
  }
}
</style>
