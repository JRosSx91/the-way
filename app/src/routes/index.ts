import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import WayView from "@/views/WayView.vue";
import FrenchWay from "@/views/FrenchWay.vue";
import HistoricView from "@/views/HistoricView.vue";
import SocialView from "@/views/SocialView.vue";
import Web3View from "@/views/Web3View.vue";
import AboutMe from "@/views/AboutMe.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: IndexView,
  },
  {
    path: "/ways",
    name: "ways",
    component: WayView,
  },
  {
    path: "/ways/french",
    name: "french",
    component: FrenchWay,
  },
  {
    path: "/past",
    name: "past",
    component: HistoricView,
  },
  {
    path: "/social",
    name: "social",
    component: SocialView,
  },
  {
    path: "/web3",
    name: "web3",
    component: Web3View,
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
