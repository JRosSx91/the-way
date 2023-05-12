<template>
  <div class="slider" id="slider-1">
    <div class="item">
      <svg xmlns="http://www.w3.org/2000/svg" class="original">
        <image
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          xlink:href="https://github.com/supahfunk/supah-codepen/blob/master/flowers/1.jpg?raw=true"
          mask="url(#donutmask)"
        ></image>
      </svg>
      <div class="tit">DAISY</div>
    </div>
    <div class="item">
      <svg xmlns="http://www.w3.org/2000/svg" class="original">
        <image
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          xlink:href="https://github.com/supahfunk/supah-codepen/blob/master/flowers/3.jpg?raw=true"
          mask="url(#donutmask)"
        ></image>
      </svg>
      <div class="tit">CANDIDUM</div>
    </div>
    <div class="item">
      <svg xmlns="http://www.w3.org/2000/svg" class="original">
        <image
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          xlink:href="https://github.com/supahfunk/supah-codepen/blob/master/flowers/4.jpg?raw=true"
          mask="url(#donutmask)"
        ></image>
      </svg>
      <div class="tit">MARIGOLD</div>
    </div>
    <div class="item">
      <svg xmlns="http://www.w3.org/2000/svg" class="original">
        <image
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          xlink:href="https://github.com/supahfunk/supah-codepen/blob/master/flowers/2.jpg?raw=true"
          mask="url(#donutmask)"
        ></image>
      </svg>
      <div class="tit">BLOSSOM</div>
    </div>
  </div>

  <svg>
    <defs>
      <mask id="donutmask">
        <circle id="outer" cx="250" cy="250" r="400" fill="white" />
        <circle id="inner" cx="250" cy="250" r="300" />
      </mask>
    </defs>
  </svg>

  <div class="cursor"></div>

  <a
    class="the-most"
    target="_blank"
    href="https://codepen.io/2018/popular/pens/9/"
  >
    <img
      src="https://raw.githubusercontent.com/supahfunk/supah-codepen/master/themost-2018.png"
    />
  </a>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "SliderComponent",
  setup() {
    let slides = ref<Array<number>>([]); // Esto debería contener los datos de tus diapositivas
    let currentSlide = ref(1);

    const createIndicators = () => {
      for (let i = 0; i < slides.value.length; i++) {
        // Aquí se crea la lógica para añadir los indicadores a tu slider
      }
      setTimeout(() => {
        // Aquí se añade la lógica para añadir la clase a tu elemento
      }, 1000);
    };

    const goToSlide = (number: number) => {
      // Aquí se añade la lógica para cambiar la diapositiva activa
      currentSlide.value = number;
    };

    const nextSlide = () => {
      if (currentSlide.value >= slides.value.length) {
        currentSlide.value = 1;
      } else {
        currentSlide.value++;
      }
      goToSlide(currentSlide.value);
    };

    onMounted(() => {
      createIndicators();
    });

    return {
      slides,
      currentSlide,
      goToSlide,
      nextSlide,
    };
  },
});
</script>
<style lang="scss" scoped>
html,
body {
  height: 100vh;
  overflow: hidden;
  cursor: none;

  @media (pointer: coarse) {
    cursor: default;
  }
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transition: 0.5s ease-in-out;

  .down & {
    transform: scale(0.9);

    .item {
      .tit {
        opacity: 0;
      }
    }
  }

  * {
    outline: none;
  }

  .item {
    position: relative;
    z-index: 1;
    width: 100vw;
    height: 100vh;

    svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1;
    }

    .tit {
      text-align: center;
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 0;
      width: 100%;
      transform: translateY(-50%);
      letter-spacing: 2rem;
      color: #fff;
      font-family: Roboto, sans-serif;
      font-size: 7vw;
      transition: all 0.3s ease-in-out;
    }
  }
}

#slider-1 {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;

  .tit {
    display: none;
  }
}

#slider-2 {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  transform: scale(1) !important;
  pointer-events: none;
}

.cursor {
  pointer-events: none;
  position: absolute;
  width: 30px;
  height: 30px;
  margin-top: -15px;
  margin-left: -15px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.05);
  transition: transform ease-in-out 0.2s, background ease-in-out 0.2s;
  transform: translateZ(0);
  z-index: 100;
  left: -9999px;

  &:before,
  &:after {
    content: "";
    position: absolute;
    border-left: 6px solid rgba(255, 255, 255, 0.5);
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    top: 10px;
    left: 52px;
    opacity: 0;
    transition: left ease-in-out 0.1s, opacity ease-in-out 0.2s;
  }

  &:after {
    border-left: none;
    border-right: 6px solid rgba(255, 255, 255, 0.5);
    left: -27px;
  }

  .down & {
    transform: scale(0.7) translateZ(0);
    background: rgba(255, 255, 255, 0.4);

    &:before,
    &:after {
      opacity: 1;
      left: 49px;
    }

    &:after {
      left: -24px;
    }
  }

  @media (pointer: coarse) {
    display: none;
  }
}

.the-most {
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 50vw;
  max-width: 100px;
  padding: 10px;

  img {
    max-width: 100%;
  }
}
</style>
