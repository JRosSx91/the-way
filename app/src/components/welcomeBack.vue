<template>
  <div class="cont">
    <div class="mouse"></div>
    <div class="app">
      <div class="app__bgimg">
        <div class="app__bgimg-image app__bgimg-image--1"></div>
        <div class="app__bgimg-image app__bgimg-image--2"></div>
      </div>
      <div class="app__img">
        <img
          onmousedown="return false"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/whiteTest4.png"
          alt="city"
        />
      </div>

      <div class="app__text app__text--1">
        <div class="app__text-line app__text-line--4">imperdiet</div>
        <div class="app__text-line app__text-line--3">ut le</div>
        <div class="app__text-line app__text-line--2">non tincidunt</div>
        <div class="app__text-line app__text-line--1">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/opus-attachment.png"
            alt=""
          />
        </div>
      </div>

      <div class="app__text app__text--2">
        <div class="app__text-line app__text-line--4">habitant</div>
        <div class="app__text-line app__text-line--3">ut eget</div>
        <div class="app__text-line app__text-line--2">Nam imperdiet</div>
        <div class="app__text-line app__text-line--1">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/opus-attachment.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="pages">
      <ul class="pages__list">
        <li
          data-target="1"
          class="pages__item pages__item--1 page__item-active"
        ></li>
        <li data-target="2" class="pages__item pages__item--2"></li>
      </ul>
    </div>
  </div>
  <a
    href="https://dribbble.com/shots/2936160-Opus-Animation"
    target="_blank"
    class="icon-link"
  >
    <img
      src="http://icons.iconarchive.com/icons/uiconstock/socialmedia/256/Dribbble-icon.png"
    />
  </a>
  <a
    href="https://twitter.com/mrspok407"
    target="_blank"
    class="icon-link icon-link--twitter"
  >
    <img
      src="https://cdn1.iconfinder.com/data/icons/logotypes/32/twitter-128.png"
    />
  </a>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "welcome-back",
  setup() {
    let animation = ref(true);
    let curSlide = ref(1);
    let scrolledUp: boolean, nextSlide: number;

    const app = ref();
    const pageNav1 = ref(null);
    const pageNav2 = ref(null);

    const pagination = (slide: number, target?: number) => {
      animation.value = true;
      if (target === undefined) {
        nextSlide = scrolledUp ? slide - 1 : slide + 1;
      } else {
        nextSlide = target;
      }

      document
        .querySelector(".pages__item--" + nextSlide)
        ?.classList.add("page__item-active");
      document
        .querySelector(".pages__item--" + slide)
        ?.classList.remove("page__item-active");

      app.value?.classList.toggle("active");
      setTimeout(() => {
        animation.value = false;
      }, 3000);
    };

    const navigateDown = () => {
      if (curSlide.value > 1) return;
      scrolledUp = false;
      pagination(curSlide.value);
      curSlide.value++;
    };

    const navigateUp = () => {
      if (curSlide.value === 1) return;
      scrolledUp = true;
      pagination(curSlide.value);
      curSlide.value--;
    };

    onMounted(() => {
      if (app.value) {
        setTimeout(() => {
          app.value.classList.add("initial");
        }, 1500);
      }

      setTimeout(() => {
        animation.value = false;
      }, 4500);

      document.addEventListener("wheel", (e: WheelEvent) => {
        const delta = e.deltaY;
        if (animation.value) return;
        if (delta > 0) {
          navigateUp();
        } else {
          navigateDown();
        }
      });

      document.addEventListener("click", (e) => {
        if (animation.value) return;
        const targetElement = e.target as HTMLElement;
        if (targetElement) {
          let targetAttr = targetElement.getAttribute("data-target");
          if (targetAttr) {
            let target = +targetAttr;
            pagination(curSlide.value, target);
            curSlide.value = target;
          }
        }
      });
    });

    return {
      app,
      pageNav1,
      pageNav2,
    };
  },
});
</script>
<style lang="scss" scoped>
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

$contBgClr: linear-gradient(to left bottom, #f2e3c6 0%, #a7a1a5 100%);
$appShadowClr: rgba(#000, 0.3);

.cont {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: $contBgClr;
  overflow: hidden;
}

.app {
  position: relative;
  min-width: 850px;
  height: 540px;
  box-shadow: 0 0 60px $appShadowClr;
  overflow: hidden;

  &__bgimg {
    position: absolute;
    top: 0;
    left: -2.5%;
    width: 105%;
    height: 100%;
    transition: transform 3.5s 770ms;

    &-image {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;

      &--1 {
        background: url("@/assets/img/welcome1.jpg") center center no-repeat;
        background-size: cover;
      }

      &--2 {
        background: url("@/assets/img/welcome2.jpg") center center no-repeat;
        background-size: cover;
        opacity: 0;
        transition: opacity 0ms 1300ms;
        will-change: opacity;
      }
    }
  }

  &__text {
    position: absolute;
    right: 165px;
    top: 150px;
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    z-index: 1;

    &-line {
      transition: transform 1500ms 400ms, opacity 750ms 500ms;
      will-change: transform, opacity;
      user-select: none;
      @for $i from -4 through -1 {
        &--#{abs($i)} {
          transition: transform 1500ms 2000ms + 100ms * ($i - 1),
            opacity 1500ms 2750ms + 250ms * ($i - 1);
        }
      }
      &--4 {
        font: {
          size: 50px;
          weight: 700;
        }
        color: #0a101d;
      }
      &--3 {
        font: {
          size: 40px;
          weight: 300;
        }
      }
      &--2 {
        margin-top: 10px;
        font: {
          size: 14px;
          weight: 500;
        }
        color: #0099cc;
      }
      &--1 {
        margin-top: 15px;
        img {
          width: 50px;
        }
      }
    }

    &--1 {
      .app__text-line {
        transform: translate3d(0, -125px, 0);
        opacity: 0;
      }
    }

    &--2 {
      right: initial;
      top: 250px;
      left: 80px;
      z-index: -1;
      transition: z-index 1500ms;

      @for $i from -4 through -1 {
        .app__text-line--#{abs($i)} {
          opacity: 0;
          transition: transform 1500ms 300ms + 75ms * ($i - 1),
            opacity 400ms 500ms + 75ms * ($i - 1);
        }
      }
    }
  }

  &__img {
    position: absolute;
    transform: translate3d(0, -750px, 0);
    width: 850px;
    height: 100%;
    transition: transform 3s cubic-bezier(0.6, 0.13, 0.31, 1.02);
    will-change: transform;

    img {
      min-width: 100%;
      user-select: none;
    }
  }
}

.initial {
  .app__img {
    transform: translate3d(0, 0, 0);
  }
  .app__text--1 {
    @for $i from 1 through 4 {
      .app__text-line--#{$i} {
        transform: translate3d(0, 0, 0);
        transition: transform 1500ms 1400ms + 75ms * ($i - 1),
          opacity 400ms 1600ms + 75ms * ($i - 1);
        opacity: 1;
      }
    }
  }
}

.active {
  .app__bgimg {
    transform: translate3d(10px, 0, 0) scale(1.05);
    transition: transform 5s 850ms ease-in-out;
    .app__bgimg-image--2 {
      opacity: 1;
      transition: opacity 0ms 1500ms;
    }
  }
  .app__img {
    transition: transform 3s cubic-bezier(0.6, 0.13, 0.31, 1.02);
    transform: translate3d(0, -1410px, 0);
  }
  .app__text--1 {
    z-index: -1;
    transition: z-index 0ms 1500ms;
    @for $i from 1 through 4 {
      .app__text-line--#{$i} {
        transform: translate3d(0, -125px, 0);
        transition: transform 1500ms 300ms + 75ms * ($i - 1),
          opacity 400ms 500ms + 75ms * ($i - 1);
        opacity: 0;
      }
    }
  }
  .app__text--2 {
    z-index: 1;

    @for $i from 1 through 4 {
      .app__text-line--#{$i} {
        transform: translate3d(0, -125px, 0);
        transition: transform 2500ms 1100ms + 75ms * ($i - 1),
          opacity 1300ms 1300ms + 275ms * ($i - 1);
        opacity: 1;
      }
    }
  }
}

.mouse {
  position: relative;
  margin-right: 20px;
  min-width: 50px;
  height: 80px;
  border-radius: 30px;
  border: 5px solid rgba(255, 255, 255, 0.8);
  &:after {
    content: "";
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    animation: scroll 1s infinite alternate;
    @keyframes scroll {
      100% {
        transform: translate(-50%, 15px);
      }
    }
  }
}

.pages {
  margin-left: 20px;
  &__list {
    list-style-type: none;
  }
  &__item {
    position: relative;
    margin-bottom: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid #fff;
    cursor: pointer;
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0, 0);
      width: 75%;
      height: 75%;
      border-radius: 50%;
      background-color: #fff;
      opacity: 0;
      transition: 500ms;
    }
    &:hover:after {
      transform: translate(-50%, -50%) scale(1, 1);
      opacity: 1;
    }
  }
}

.page__item-active {
  &:after {
    transform: translate(-50%, -50%) scale(1, 1);
    opacity: 1;
  }
}

.icon-link {
  position: absolute;
  left: 5px;
  bottom: 5px;
  width: 50px;
  img {
    width: 100%;
    vertical-align: top;
  }
  &--twitter {
    left: auto;
    right: 5px;
  }
}
</style>
