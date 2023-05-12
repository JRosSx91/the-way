import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import WayView from "@/views/WayView.vue";
import HistoricView from "@/views/HistoricView.vue";
import AboutMe from "@/views/AboutMe.vue";

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
  {
    path: "/past",
    name: "past",
    component: HistoricView,
  },
  {
    path: "/me",
    name: "me",
    component: AboutMe,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
