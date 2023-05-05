import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import WelcomeView from "@/components/views/WelcomeView.vue";
import IndexView from "@/components/views/IndexView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "welcome",
    component: WelcomeView,
  },
  {
    path: "/index",
    name: "index",
    component: IndexView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
