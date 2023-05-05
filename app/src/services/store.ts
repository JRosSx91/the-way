import { defineStore } from "pinia";
import { State } from "@/interfaces/index";

const useStore = defineStore("store", {
  state: (): State => {
    return {
      dark: false,
    };
  },
});

export default useStore;
