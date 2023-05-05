<template>
  <header id="header" class="flex flex-row justify-start m-0 p-1 bg-[#607d8b]">
    <section
      class="dark-light-btn bg-[#455a64] border-0 text-white cursor-pointer no-underline"
    >
      <button>Test 1</button>
      <button>Test 2</button>
    </section>
    <h1 class="title align-middle justify-center text-white text-xl font-bold">
      Lorem
    </h1>
    <nav
      class="navigation dark-light-btn bg-[#455a64] border-0 text-white cursor-pointer no-underline"
    >
      <button v-if="store.phone"></button>
      <ul v-else class="flex">
        <li>
          <a><p>Test 1</p></a>
        </li>
        <li>
          <a><p>Test 2</p></a>
        </li>
        <li>
          <a><p>Test 3</p></a>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useStore from "@/services/store";

export default defineComponent({
  name: "app-header",
  setup() {
    const store = useStore();
  },
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
