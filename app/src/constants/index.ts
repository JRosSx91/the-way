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
    img: require("@/assets/img/welcome2.jpg"),
  },
  {
    title:
      "Por esta senda que pisas ya lo hicieron miles de personas... durante miles de años",
    subtitle:
      "¿Crees que es por casualidad? Acompáñanos al pasado de esta gran historia",
    img: require("@/assets/img/welcome1.jpg"),
  },
];
export const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
export const fragShader = `
    
varying vec2 vUv;

uniform sampler2D currentImage;
uniform sampler2D nextImage;

uniform float dispFactor;

void main() {

vec2 uv = vUv;
vec4 _currentImage;
vec4 _nextImage;
float intensity = 0.3;

vec4 orig1 = texture2D(currentImage, uv);
vec4 orig2 = texture2D(nextImage, uv);

_currentImage = texture2D(currentImage, vec2(uv.x, uv.y + dispFactor * (orig2.r * intensity)));
_nextImage = texture2D(nextImage, vec2(uv.x, uv.y - (1.0 - dispFactor) * (orig1.g * intensity)));

vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);

gl_FragColor = finalTexture;

}

`;
