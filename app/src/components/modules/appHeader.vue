<template>
  <header id="header" class="flex flex-row justify-start m-0 p-1 bg-[#607d8b]">
    <section
      class="dark-light-btn bg-[#455a64] border-0 text-white cursor-pointer no-underline"
    >
      <button>Test 1</button>
      <button>Test 2</button>
    </section>
    <h1 class="title align-middle text-white mr-1 text-xl font-bold">Lorem</h1>
    <nav
      class="navigation dark-light-btn bg-[#455a64] border-0 text-white cursor-pointer no-underline"
    >
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </nav>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "app-header",
});
</script>
<style lang="scss" scoped>
#header {
  font-family: "Roboto", sans-serif;

  & .navigation {
    box-shadow: 0 0 0 0.5px rgba(49, 49, 93, 0.03),
      0 2px 5px 0 rgba(49, 49, 93, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.08);
  }
}
</style>
