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
$main: #777;
$back: #aaa;
$accent: hsl(220, 50%, 40%);

$sans: "Open Sans", sans-serif;
$heebo: "Heebo", sans-serif;

$base: 3vh;

$time: 1800ms;

$ease-out: cubic-bezier(0.26, 0.005, 0.135, 1);
$ease-in-out: cubic-bezier(0.785, 0.135, 0.15, 0.86);

body {
  background: $back;
  font-family: $sans;
}

.slider {
  position: relative;
  height: 100vh;
  width: 100vw;
  background: $main;
  overflow: hidden;

  &__wrap {
    position: absolute;
    width: 100vw;
    height: 100vh;
    transform: translateX(100vw);
    top: 0%;
    left: 0;
    right: auto;
    overflow: hidden;
    transition: transform $time/4 $ease-in-out;
    transform-origin: 0% 50%;
    transition-delay: $time/4;
    opacity: 0;
    &--hacked {
      opacity: 1;
    }
  }

  &__back {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: auto 100%;
    background-position: center;
    background-repeat: none;
    transition: filter $time/4 $ease-in-out;
  }

  &__inner {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0%;
    background-size: auto 133.3333%;
    background-position: center;
    background-repeat: none;
    transform: scale(0.75);
    transition: transform $time/4 $ease-in-out, box-shadow $time/4 $ease-in-out,
      opacity $time/4 step-end;
    opacity: 0;
    box-shadow: 0 $base $base rgba(darken($accent, 50%), 0);
    padding: $base * 5;
    box-sizing: border-box;
  }

  &__content {
    position: relative;
    top: 50%;
    width: auto;
    transform: translateY(-50%);
    color: white;
    font-family: $heebo;
    opacity: 0;
    transition: opacity $time/4;
    h1 {
      font-weight: 900;
      font-size: $base * 3;
      line-height: 0.85;
      margin-bottom: $base/4;
      pointer-events: none;
      text-shadow: 0 $base/8 $base/4 rgba(darken($accent, 50%), 0.1);
    }
    a {
      cursor: pointer;
      font-size: $base * 0.8;
      letter-spacing: $base * 0.1;
      font-weight: 100;
      position: relative;
      &:after {
        content: "";
        display: block;
        width: $base * 3;
        background: white;
        height: 1px;
        position: absolute;
        top: 50%;
        left: $base * 2;
        transform: translateY(-50%);
        transform-origin: 0% 50%;
        transition: transform $time/2 $ease-in-out;
      }
      &:before {
        content: "";
        border-top: 1px solid white;
        border-right: 1px solid white;
        display: block;
        width: $base/3;
        height: $base/3;
        transform: translateX(0) translateY(-50%) rotate(45deg);
        position: absolute;
        font-family: $heebo;
        font-weight: 100;
        top: 50%;
        left: $base * 5;
        transition: transform $time/2 $ease-in-out;
      }
      &:hover {
        &:after {
          transform: scaleX(1.5);
          transition: transform $time * 2/3 $ease-in-out;
        }
        &:before {
          transform: translateX(#{$base * 2}) translateY(-50%) rotate(45deg);
          transition: transform $time * 2/3 $ease-in-out;
        }
      }
    }
  }

  &__slide {
    position: absolute;
    left: 0;
    height: 100vh;
    width: 100vw;
    //transform: translatex(-100%);
    transition: transform $time/3 $ease-in-out;
    transition-delay: $time/3;
    pointer-events: none;
    z-index: 0;

    &--active {
      transform: translatex(0%);
      z-index: 2;
      .slider__wrap {
        transform: translateX(0);
        transform-origin: 100% 50%;
        opacity: 1;
        animation: none;
      }
      .slider__back {
        filter: blur(#{$base * 0.5});
        transition: filter $time/2 $ease-in-out;
        transition-delay: $time/2 !important;
      }
      .slider__inner {
        transform: scale(0.8);
        box-shadow: 0 $base/3 $base * 2 rgba(darken($accent, 50%), 0.2);
        pointer-events: auto;
        opacity: 1;
        transition: transform $time/2 $ease-in-out,
          box-shadow $time/2 $ease-in-out, opacity 1ms step-end;
        transition-delay: $time/2;
      }
      .slider__content {
        opacity: 1;
        transition-delay: $time * 3/4;
      }
    }

    &:not(.slider__slide--active) .slider__wrap {
      @keyframes hack {
        0% {
          transform: translateX(0);
          opacity: 1;
        }
        50% {
          transform: translateX(-100vw);
          opacity: 1;
        }
        51% {
          transform: translateX(-100vw);
          opacity: 0;
        }
        52% {
          transform: translateX(100vw);
          opacity: 0;
        }
        100% {
          transform: translateX(100vw);
          opacity: 1;
        }
      }
      animation-name: hack;
      animation-duration: $time/2;
      animation-delay: $time/4;
      animation-timing-function: $ease-in-out;
    }

    &:nth-child(1) .slider__back,
    &:nth-child(1) .slider__inner {
      background-image: url("@/assets/img/welcome1.jpg");
      //background: #eee;
    }
    &:nth-child(2) .slider__back,
    &:nth-child(2) .slider__inner {
      background-image: url("@/assets/img/welcome1.jpg");
      //background: #aaa;
    }
  }
}

.sig {
  position: fixed;
  bottom: 8px;
  right: 8px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 100;
  font-family: sans-serif;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 2px;
  z-index: 9999;
}
</style>
