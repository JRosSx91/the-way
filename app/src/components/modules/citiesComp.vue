<template>
  <main>
    <div id="slider" ref="sliderRef">
      <div class="slider-inner">
        <div id="slider-content">
          <div class="meta">Species</div>
          <h2 id="slide-title">Amur <br />Leopard</h2>
          <span data-slide-title="0">Amur <br />Leopard</span>
          <span data-slide-title="1">Asiatic <br />Lion</span>
          <span data-slide-title="2">Siberian <br />Tiger</span>
          <span data-slide-title="3">Brown <br />Bear</span>
          <div class="meta">Status</div>
          <div id="slide-status">Critically Endangered</div>
          <span data-slide-status="0">Critically Endangered</span>
          <span data-slide-status="1">Endangered</span>
          <span data-slide-status="2">Endangered</span>
          <span data-slide-status="3">Least Concern</span>
        </div>
      </div>

      <img v-for="(image, index) in images" :key="index" :src="image" />

      <div id="pagination">
        <button class="active" data-slide="0"></button>
        <button data-slide="1"></button>
        <button data-slide="2"></button>
        <button data-slide="3"></button>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as THREE from "three";
import { Uniform, Texture } from "three";
import { TweenLite } from "gsap";
import imagesLoaded from "imagesloaded";

export default defineComponent({
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const sliderRef = ref();

    onMounted(() => {
      imagesLoaded(sliderRef.value.querySelectorAll("img"), () => {
        displacementSlider({
          parent: sliderRef.value,
          images: props.images,
        });
      });
    });

    const displacementSlider = (opts: any) => {
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
            
            _currentImage = texture2D(currentImage, vec2(uv.x, uv.y + dispFactor * (orig2 * intensity)));

            _nextImage = texture2D(nextImage, vec2(uv.x, uv.y + (1.0 - dispFactor) * (orig1 * intensity)));

            vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);

            gl_FragColor = finalTexture;

        }
    `;

      let images = opts.images,
        image,
        sliderImages: any[] = [];
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

      let renderW: any, renderH: any;

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

      images.forEach((img: any) => {
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
          dispFactor: new Uniform(0.0),
          currentImage: new Uniform(sliderImages[0] as Texture),
          nextImage: new Uniform(sliderImages[1] as Texture),
        },
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        opacity: 1.0,
      });

      let geometry = new THREE.PlaneGeometry(
        parent.offsetWidth,
        parent.offsetHeight,
        1
      );
      let object = new THREE.Mesh(geometry, mat);
      object.position.set(0, 0, 0);
      scene.add(object);

      let addEvents = function () {
        let pagButtons = Array.from(
          document.getElementById("pagination")!.querySelectorAll("button")
        );
        let isAnimating = false;

        pagButtons.forEach((el) => {
          el.addEventListener("click", function () {
            if (!isAnimating) {
              isAnimating = true;

              document
                .getElementById("pagination")!
                .querySelectorAll(".active")[0].className = "";
              this.className = "active";

              let slideId = parseInt(this.dataset.slide!, 10);

              mat.uniforms.nextImage.value = sliderImages[slideId];

              TweenLite.to(mat.uniforms.dispFactor, 1, {
                value: 1,
                ease: "Expo.easeInOut",
                onComplete: function () {
                  mat.uniforms.currentImage.value = sliderImages[slideId];
                  mat.uniforms.dispFactor.value = 0.0;
                  isAnimating = false;
                },
              });

              let slideTitleEl = document.getElementById("slide-title");
              let slideStatusEl = document.getElementById("slide-status");
              let nextSlideTitle = document.querySelectorAll(
                `[data-slide-title="${slideId}"]`
              )[0].innerHTML;
              let nextSlideStatus = document.querySelectorAll(
                `[data-slide-status="${slideId}"]`
              )[0].innerHTML;

              TweenLite.fromTo(
                slideTitleEl,
                0.5,
                {
                  autoAlpha: 1,
                  y: 0,
                },
                {
                  autoAlpha: 0,
                  y: 20,
                  ease: "Expo.easeIn",
                  onComplete: function () {
                    slideTitleEl!.innerHTML = nextSlideTitle;

                    TweenLite.to(slideTitleEl, 0.5, {
                      autoAlpha: 1,
                      y: 0,
                    });
                  },
                }
              );

              TweenLite.fromTo(
                slideStatusEl,
                0.5,
                {
                  autoAlpha: 1,
                  y: 0,
                },
                {
                  autoAlpha: 0,
                  y: 20,
                  ease: "Expo.easeIn",
                  onComplete: function () {
                    slideStatusEl!.innerHTML = nextSlideStatus;

                    TweenLite.to(slideStatusEl, 0.5, {
                      autoAlpha: 1,
                      y: 0,
                      delay: 0.1,
                    });
                  },
                }
              );
            }
          });
        });
      };

      addEvents();

      window.addEventListener("resize", function (e) {
        renderer.setSize(renderW, renderH);
      });

      let animate = function () {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
      };
      animate();
    };

    imagesLoaded(document.querySelectorAll("img"), () => {
      document.body.classList.remove("loading");

      const el = document.getElementById("slider");
      const imgs = Array.from(document.querySelectorAll("img"));
      displacementSlider({
        parent: el,
        images: imgs,
      });
    });

    return { sliderRef };
  },
});
</script>
<style lang="scss" scoped>
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section,
summary {
  display: block;
}
audio,
canvas,
video {
  display: inline-block;
}
audio:not([controls]) {
  display: none;
  height: 0;
}
[hidden] {
  display: none;
}
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
body {
  margin: 0;
}
a:focus {
  outline: thin dotted;
}
a:active,
a:hover {
  outline: 0;
}
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
abbr[title] {
  border-bottom: 1px dotted;
}
b,
strong {
  font-weight: bold;
}
dfn {
  font-style: italic;
}
hr {
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  height: 0;
}
mark {
  background: #ff0;
  color: #000;
}
code,
kbd,
pre,
samp {
  font-family: monospace, serif;
  font-size: 1em;
}
pre {
  white-space: pre-wrap;
}
q {
  quotes: "\201C""\201D""\2018""\2019";
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sup {
  top: -0.5em;
}
sub {
  bottom: -0.25em;
}
img {
  border: 0;
}
svg:not(:root) {
  overflow: hidden;
}
figure {
  margin: 0;
}
fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em;
}
legend {
  border: 0;
  padding: 0;
}
button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  margin: 0;
}
button,
input {
  line-height: normal;
}
button,
select {
  text-transform: none;
}
button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}
button[disabled],
html input[disabled] {
  cursor: default;
}
input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
input[type="search"] {
  -webkit-appearance: textfield;
  -moz-box-sizing: content-box;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}
textarea {
  overflow: auto;
  vertical-align: top;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*,
*::after,
*::before {
  box-sizing: border-box;
}

::selection {
  background-color: grey;
  color: white;
}

::-moz-selection {
  background-color: grey;
  color: white;
}

@import url("https://use.typekit.net/euz1eqv.css");

html {
  background: #fff;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: #23272a;
  overflow: hidden;
}

main {
  position: relative;
  width: 100%;
  height: 100vh;
}

#slider {
  width: 100%;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  position: relative;

  canvas {
    width: 150%;
    height: 150%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  img {
    width: 100%;
    max-width: 100%;
    position: relative;
    z-index: 0;
  }
}

.slider-inner {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1060px;
  height: 100%;
  margin: 0 auto;
  z-index: 5;
}

#slider-content {
  padding: 0 10px;

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

#pagination {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 30px;
  z-index: 6;

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
    margin: 30px 0;
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
