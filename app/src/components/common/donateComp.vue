<template>
  <a href="#" class="donate-link">Donate</a>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "donate-link",
});
</script>
<style lang="scss" scoped>
.donate-link {
  width: 72px;
  text-align: center;
  position: absolute;
  right: 10px;
  top: 27px;
  font-family: "Arial", sans-serif;
  font-size: 12px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-decoration: none;
  padding-bottom: 6px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
}
</style>
