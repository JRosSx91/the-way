<template>
  <div class="content">
    <div id="slider" class="w-[100%] h-[100vh]">
      <div class="slider-inner">
        <div id="slider-content">
          <div class="meta">Ciudades</div>
          <h2 id="slide-title">Pamplona</h2>
          <span
            v-for="(x, index) in slides"
            :key="index"
            :data-slide-title="index"
            >{{ x.title }}</span
          >
          <div class="meta">Título</div>
          <div id="slide-status">Lorem Ipsum</div>
          <span
            v-for="(x, index) in slides"
            :key="index"
            :data-slide-status="index"
            >{{ x.status }}</span
          >
        </div>
      </div>
      <div class="images">
        <img v-for="(x, index) in slides" :key="index" :src="x.img" />
      </div>
      <div id="pagination">
        <button
          v-for="(x, index) in slides"
          :key="index"
          :data-slide="index"
          :class="{ active: index === 0 }"
        ></button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import * as THREE from "three";
import gsap from "gsap";
import imagesLoaded from "imagesloaded";
import { DisplacementSliderOptions, Slide } from "@/interfaces";
import useStore from "@/store";

export default defineComponent({
  setup() {
    const store = useStore();
    let activeSlideId = 0;
    const slides = ref<Slide[]>([
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
        title: "Leon",
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
        img: require("@/assets/img/ponferrada-dia.webp"),
        imgNight: require("@/assets/img/ponferrada-noche.jpg"),
      },
      {
        title: "Santiago de Compostela",
        status: "Lorem Ipsum",
        img: require("@/assets/img/santiago.webp"),
        imgNight: require("@/assets/img/santiago-noche.jpg"),
      },
    ]);
    const displacementSlider = function (opts: DisplacementSliderOptions) {
      let isAnimating = false;
      let vertex = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

      let fragment = `
    
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

      let images: HTMLImageElement[] = opts.images,
        image: THREE.Texture,
        sliderImages: THREE.Texture[] = [];
      let canvasWidth = images[0].clientWidth;
      let canvasHeight = images[0].clientHeight;
      let parent = opts.parent;
      let renderWidth = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      let renderHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );

      let renderW: number, renderH: number;

      if (renderWidth > canvasWidth) {
        renderW = renderWidth;
      } else {
        renderW = canvasWidth;
      }

      renderH = canvasHeight;

      let renderer = new THREE.WebGLRenderer({
        antialias: false,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x23272a, 1.0);
      renderer.setSize(renderW, renderH);
      parent.appendChild(renderer.domElement);

      let loader = new THREE.TextureLoader();
      loader.crossOrigin = "anonymous";

      images.forEach((img: HTMLImageElement) => {
        image = loader.load(img.getAttribute("src") + "?v=" + Date.now());
        image.magFilter = image.minFilter = THREE.LinearFilter;
        image.anisotropy = renderer.capabilities.getMaxAnisotropy();
        sliderImages.push(image);
      });
      let scene = new THREE.Scene();
      scene.background = new THREE.Color(0x23272a);
      let camera = new THREE.OrthographicCamera(
        renderWidth / -2,
        renderWidth / 2,
        renderHeight / 2,
        renderHeight / -2,
        1,
        1000
      );

      camera.position.z = 1;

      let mat = new THREE.ShaderMaterial({
        uniforms: {
          dispFactor: {
            value: 0.0,
          },
          currentImage: { value: sliderImages[0] },
          nextImage: { value: sliderImages[1] },
        },
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        opacity: 1.0,
      });
      const handleButtonClick = (slideId: number) => {
        if (mat && mat.uniforms) {
          mat.uniforms.nextImage.value = sliderImages[slideId];

          gsap.to(mat.uniforms.dispFactor, {
            duration: 1,
            value: 1,
            ease: "Expo.easeInOut",
            onUpdate: function () {
              if (mat.uniforms.dispFactor.value >= 1) {
                mat.uniforms.currentImage.value = sliderImages[slideId];
                mat.uniforms.dispFactor.value = 0.0;

                isAnimating = false;
              }
            },
          });

          const slideTitleEl = document.getElementById("slide-title");
          const slideStatusEl = document.getElementById("slide-status");
          const nextSlideTitle = document.querySelectorAll(
            `[data-slide-title="${slideId}"]`
          )[0].innerHTML;
          const nextSlideStatus = document.querySelectorAll(
            `[data-slide-status="${slideId}"]`
          )[0].innerHTML;

          gsap.fromTo(
            slideTitleEl,
            {
              duration: 0.5,
              autoAlpha: 1,
              y: 0,
            },
            {
              autoAlpha: 0,
              y: 20,
              ease: "Expo.easeIn",
              onComplete: function () {
                if (slideTitleEl) {
                  slideTitleEl.innerHTML = nextSlideTitle;

                  gsap.to(slideTitleEl, {
                    duration: 0.5,
                    autoAlpha: 1,
                    y: 0,
                  });
                }
              },
            }
          );

          gsap.fromTo(
            slideStatusEl,
            {
              duration: 0.5,
              autoAlpha: 1,
              y: 0,
            },
            {
              autoAlpha: 0,
              y: 20,
              ease: "Expo.easeIn",
              onComplete: function () {
                if (slideStatusEl) {
                  slideStatusEl.innerHTML = nextSlideStatus;

                  gsap.to(slideStatusEl, {
                    duration: 0.5,
                    autoAlpha: 1,
                    y: 0,
                    delay: 0.1,
                  });
                }
              },
            }
          );
        }
      };

      let geometry = new THREE.PlaneGeometry(
        parent.offsetWidth,
        parent.offsetHeight,
        1
      );
      let object = new THREE.Mesh(geometry, mat);
      object.position.set(0, 0, 0);
      scene.add(object);
      const addEvents = function () {
        const paginationElement = document.getElementById("pagination");

        if (paginationElement !== null) {
          const pagButtons: HTMLButtonElement[] = Array.from(
            paginationElement.querySelectorAll("button")
          );
          for (let i = 0; i < pagButtons.length; i++) {
            pagButtons[i].addEventListener("click", function () {
              if (!isAnimating) {
                isAnimating = true;

                paginationElement.querySelectorAll(".active")[0].className = "";
                this.className = "active";

                const slideIdString = this.dataset.slide;

                if (slideIdString !== undefined) {
                  const slideId = parseInt(slideIdString, 10);
                  activeSlideId = slideId;
                  handleButtonClick(slideId);
                }
              }
            });
          }
        }
      };
      addEvents();
      window.addEventListener("resize", function () {
        renderer.setSize(renderW, renderH);
      });

      let animate = function () {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
      };
      animate();
    };
    imagesLoaded(document.querySelectorAll("img"), () => {
      console.log("Todas las imágenes cargadas");
      const el = document.getElementById("slider");
      if (el) {
        const imgs = Array.from(el.querySelectorAll("img"));
        displacementSlider({
          parent: el,
          images: imgs,
        });
      }
    });
    return {
      slides,
      store,
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  background-color: #23272a;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#slider {
  width: 100%;
  padding: 0;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;

  img {
    width: 100%;
    max-width: 100%;
    position: relative;
    z-index: -500;
  }
}

canvas {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  z-index: 100;
}

.slider-inner {
  position: absolute;
  background-color: transparent;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1060px;
  height: 100%;
  margin: 0 auto;
  z-index: 5;
}

#slider-content {
  padding: 10px 20px;
  margin: 3px;
  position: absolute;
  top: 40vh;
  left: 10%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5%;

  h2 {
    font-family: "acta-display", serif;
    font-weight: 400;
    font-size: 30px;
    letter-spacing: -1px;
    color: white;
    line-height: 30px;
    margin: 20px 0 60px;

    @media screen and (min-width: 800px) {
      font-size: 110px;
      line-height: 100px;
    }
  }

  span {
    display: none;
  }

  .meta {
    display: inline-block;
    font-family: "Arial", sans-serif;
    font-size: 11px;
    letter-spacing: 5px;
    color: #88888a;
    text-transform: uppercase;
    position: relative;

    @media screen and (min-width: 800px) {
      font-size: 13px;
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 5px;
      right: -55px;
      width: 45px;
      height: 2px;
      background-color: #393d40;
    }
  }

  #slide-status {
    margin-top: 10px;
    font-family: "acta-display", serif;
    font-weight: 400;
    font-size: 18px;
    color: white;

    @media screen and (min-width: 800px) {
      font-size: 34px;
    }
  }
}
.images {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: -500;
}

.images img {
  position: absolute;
  top: 150%;
  left: 150%;
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

#pagination {
  position: absolute;
  top: 40vh;
  transform: translateY(-50%);
  right: 30px;
  z-index: 6;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 7px;

  button {
    display: block;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    width: 16px;
    height: 16px;
    background-color: #ffffff;
    border-radius: 100%;
    padding: 0;
    margin: 30px 3px;
    cursor: pointer;
    position: relative;
    opacity: 0.2;
    transition: opacity 0.2s ease-in-out;
    outline: none;

    &:hover {
      opacity: 0.5;
    }

    &.active {
      opacity: 1;

      &:before {
        width: 300%;
        height: 300%;
        opacity: 1;
      }
    }

    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      border-radius: 100%;
      border: 1px solid rgba(255, 255, 255, 0.2);
      opacity: 0;
      transition: opacity 0.4s ease-in-out, width 0.4s ease-in-out,
        height 0.4s ease-in-out;
    }
  }
}

/* Page Loader */
.loading {
  &:before {
    content: "";
    position: fixed;
    z-index: 100000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
  }

  &:after {
    content: "";
    position: fixed;
    z-index: 100000;
    top: 50%;
    left: 50%;
    width: 60px;
    height: 60px;
    margin: -30px 0 0 -30px;
    pointer-events: none;
    border-radius: 50%;
    opacity: 0.4;
    background: white;
    animation: loaderAnim 0.7s linear infinite alternate forwards;
  }
}

@keyframes loaderAnim {
  to {
    opacity: 1;
    transform: scale3d(0.5, 0.5, 1);
  }
}
</style>
