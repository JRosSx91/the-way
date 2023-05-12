import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import WayView from "@/views/WayView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: IndexView,
  },
  {
    path: "/way",
    name: "ways",
    component: WayView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
