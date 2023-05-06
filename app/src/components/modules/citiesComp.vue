<template>
    <div ref="slider" class="slider">
      <div id="pagination" class="pagination">
        <button v-for="(img, index) in images" :key="index" :data-slide="index">
          {{ index }}
        </button>
      </div>
      <div class="slide-info">
        <h2 id="slide-title">{{ titles[0] }}</h2>
        <p id="slide-status">{{ statuses[0] }}</p>
      </div>
      <div class="loading-text">Loading...</div>
      <img v-for="(img, index) in images" :key="index" :src="img" alt="" />
    </div>
  </template>
  <script lang="ts">
    import * as THREE from "three";
    import gsap from "gsap";
    import imagesLoaded from "imagesloaded";
    import { defineComponent, onMounted, watch, computed, ref } from "vue";

    export default defineComponent({
      name: "DisplacementSlider",
      setup() {
        const sliderRef = ref<HTMLDivElement | null>(null);
        const images = computed(() =>
          Array.from(sliderRef.value.querySelectorAll("img") || [])
        );
        const titles = computed(() =>
          images.value.map((img) => img.getAttribute("data-slide-title"))
        );
        const statuses = computed(() =>
          images.value.map((img) => img.getAttribute("data-slide-status"))
        );

        onMounted(() => {
          imagesLoaded(sliderRef.value.querySelectorAll("img"), () => {
            document.body.classList.remove("loading");

            const el = sliderRef.value;
            const imgs = images.value;

            displacementSlider({
              parent: el,
              images: imgs,
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

          let canvasWidth = images.value[0].clientWidth;
          let canvasHeight = images.value[0].clientHeight;
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
          if (parent != undefined) parent.appendChild(renderer.domElement);
          let loader = new THREE.TextureLoader();
          loader.crossOrigin = "anonymous";

          const sliderImages: any[] = [];
          images.value.forEach((img: any) => {
            const image = loader.load(
              img.getAttribute("src") + "?v=" + Date.now()
            );
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
              dispFactor: { value: 0.0 },
              currentImage: { value: sliderImages[0] },
              nextImage: { value: sliderImages[1] },
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            opacity: 1.0,
          });

          let geometry = new THREE.PlaneGeometry(
            parent?.offsetWidth || 0,
            parent?.offsetHeight || 0,
            1
          );
          let object = new THREE.Mesh(geometry, mat);
          object.position.set(0, 0, 0);
          scene.add(object);

          const addEvents = function () {
            let pagButtons = Array.from(
              (
                document.getElementById("pagination") || {
                  querySelectorAll: () => [],
                }
              ).querySelectorAll("button")
            );
            let isAnimating = false;

            pagButtons.forEach((el) => {
              el.addEventListener("click", function () {
                if (!isAnimating) {
                  isAnimating = true;

                  let paginationElement = document.getElementById("pagination");

                  if (paginationElement) {
                    let activeElements =
                      paginationElement.querySelectorAll(".active");

                    if (activeElements.length > 0) {
                      activeElements[0].className = "";
                    }
                  }
                  this.className = "active";

                  let slideId = this.dataset.slide
                    ? parseInt(this.dataset.slide, 10)
                    : 0;

                  mat.uniforms.nextImage.value = sliderImages[slideId];
                  let nextImageUniform = mat.uniforms
                    .nextImage as THREE.Uniform & {
                    value: THREE.Texture;
                  };
                  nextImageUniform.value = sliderImages[slideId];
                  nextImageUniform.value.needsUpdate = true;

                  gsap.to(mat.uniforms.dispFactor, {
                    duration: 1,
                    value: 1,
                    ease: "Expo.easeInOut",
                    onComplete: function () {
                      mat.uniforms.currentImage.value = sliderImages[slideId];
                      (
                        mat.uniforms.currentImage.value as THREE.Texture
                      ).needsUpdate = true;
                      (
                        mat.uniforms.nextImage.value as THREE.Texture
                      ).needsUpdate = true;

                      mat.uniforms.dispFactor.value = 0.0;
                      isAnimating = false;
                    },
                  });

                  let slideTitleEl = document.getElementById("slide-title");
                  let slideStatusEl = document.getElementById("slide-status");
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
                        let slideTitleEl =
                          document.getElementById("slide-status");
                        if (slideTitleEl) {
                          slideTitleEl.innerHTML = nextSlideTitle;
                        }

                        gsap.to(slideTitleEl, {
                          duration: 0.5,
                          autoAlpha: 1,
                          y: 0,
                        });
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
                        let slideStatusEl =
                          document.getElementById("slide-status");
                        if (slideStatusEl) {
                          slideStatusEl.innerHTML = nextSlideStatus;
                        }

                        gsap.to(slideStatusEl, {
                          duration: 0.5,
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

          window.addEventListener("resize", function () {
            renderer.setSize(renderW, renderH);
          });

          const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
          };
          animate();
        };

        watch(images, () => {
          if (sliderRef.value) {
            displacementSlider({
              parent: sliderRef.value,
              images: images.value,
            });
          }
        });

        return {
          sliderRef,
          images,
          titles,
          statuses,
        };
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

    header {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 115px;
      z-index: 10;
      background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/menutexture.png);
      background-position: center top;
      background-size: auto 200px;
      background-repeat: repeat-x;

      .inner {
        max-width: 1060px;
        margin: 0 auto;
        display: flex;
        height: 70px;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .logo {
        display: block;
        width: 76px;
        height: 90px;
        position: absolute;
        top: 0;
        left: 0;
        background-color: white;
        text-align: center;

        img {
          width: 45px;
          margin-top: 10px;
        }
      }

      nav {
        display: none;

        a {
          font-family: "Arial", serif;
          font-size: 12px;
          color: #8c8c8e;
          text-transform: uppercase;
          letter-spacing: 3px;
          text-decoration: none;
          margin: 0 18px;

          &.active,
          &:hover {
            color: white;
          }
        }

        @media screen and (min-width: 800px) {
          display: block;
        }
      }

      .burger {
        display: block;
        position: relative;
        top: -6px;
        padding-left: 30px;

        &:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 30px;
          height: 2px;
          background: white;
          box-shadow: 0 12px 0 0 white, 0 6px 0 0 white;
        }

        @media screen and (min-width: 800px) {
          display: none;
        }
      }

      .donate-link {
        width: 72px;
        text-align: center;
        position: absolute;
        right: 10px;
        top: 27px;
        font-family: "Arial", sans-serif;
        font-size: 12px;
        color: white;
        text-transform: uppercase;
        letter-spacing: 3px;
        text-decoration: none;
        padding-bottom: 6px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.3);
      }
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
</template>
