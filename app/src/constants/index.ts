import { SlideCities, WelcomeSlide } from "@/interfaces";

export const slidesData: SlideCities[] = [
  {
    title: "Pamplona",
    status: "Lorem Ipsum",
    img: require("@/assets/img/pamplona-dia.jpg"),
    imgNight: require("@/assets/img/pamplona-noche.jpeg"),
  },
  {
    title: "Logroño",
    status: "Lorem Ipsum",
    img: require("@/assets/img/logroño-dia.jpg"),
    imgNight: require("@/assets/img/logroño-noche.jpg"),
  },
  {
    title: "Burgos",
    status: "Lorem Ipsum",
    img: require("@/assets/img/burgos-dia.jpg"),
    imgNight: require("@/assets/img/burgos-noche.webp"),
  },
  {
    title: "León",
    status: "Lorem Ipsum",
    img: require("@/assets/img/leon-dia.jpg"),
    imgNight: require("@/assets/img/leon-noche.jpg"),
  },
  {
    title: "Astorga",
    status: "Lorem Ipsum",
    img: require("@/assets/img/astorga-dia.jpg"),
    imgNight: require("@/assets/img/astorga-noche.jpg"),
  },
  {
    title: "Ponferrada",
    status: "Lorem Ipsum",
    img: require("@/assets/img/ponferrada-dia.jpg"),
    imgNight: require("@/assets/img/ponferrada-noche.jpg"),
  },
  {
    title: "Santiago de Compostela",
    status: "Lorem Ipsum",
    img: require("@/assets/img/santiago.jpg"),
    imgNight: require("@/assets/img/santiago-noche.jpg"),
  },
];
export const welcomeSlide: WelcomeSlide[] = [
  {
    title: "Todo presente tuvo un pasado",
    subtitle: "¿Te gustaría conocer el del Camino?",
    img: require("@/assets/img/welcome1.jpg"),
  },
  {
    title:
      "Por esta senda que pisas ya lo hicieron miles de personas... durante miles de años",
    subtitle:
      "¿Crees que es por casualidad? Acompáñanos al pasado de esta gran historia",
    img: require("@/assets/img/welcome2.jpg"),
  },
];
