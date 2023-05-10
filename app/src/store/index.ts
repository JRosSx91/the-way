import { defineStore } from "pinia";
import { State } from "@/interfaces/index";

const useStore = defineStore("store", {
  state: (): State => {
    return {
      dark: false,
      phone: false,
      primaryColor: "purple-500",
      secondaryColor: "yellow-500",
    };
  },
  actions: {
    switchDark(): void {
      this.dark = !this.dark;
    },
    setPrimaryColor(color: string): void {
      this.primaryColor = color;
    },
    setSecondaryColor(color: string): void {
      this.secondaryColor = color;
    },
  },
});

export default useStore;
