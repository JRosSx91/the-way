<template>
  <div>
    <a
      :class="store.dark ? 'text-white' : 'text-black'"
      href="#"
      class="donate-link"
      >Donate</a
    >
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useStore from "@/store";

export default defineComponent({
  name: "donate-link",
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
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
  text-transform: uppercase;
  letter-spacing: 3px;
  text-decoration: none;
  padding-bottom: 6px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.8);

  &:hover {
    font-weight: bold;
  }
}
</style>
