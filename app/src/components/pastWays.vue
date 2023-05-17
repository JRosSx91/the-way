<template>
  <main>
    <div class="container">
      <div class="past-text flex">
        <div class="image-container">
          <img :src="manuscrito" alt="manuscrito" />
          <p>
            <span>L</span>orem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
            Ipsum
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "past-ways",
  setup() {
    return {
      manuscrito: require("@/assets/img/manuscrito.png"),
    };
  },
});
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "Enchanted Land";
  src: url("@/assets/fonts/Enchanted\ Land.otf");
}
@font-face {
  font-family: "Sketch Gothic";
  src: url("@/assets/fonts/Sketch\ Gothic\ School.ttf");
}
@font-face {
  font-family: "Mevno1";
  src: url("@/assets/fonts/mevno1.ttf");
}
@font-face {
  font-family: "Mevno2";
  src: url("@/assets/fonts/mevno2.ttf");
}
main {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  background-image: url("@/assets/img/welcome1.jpg");

  .container {
    width: 85%;
    margin: 0 auto;
    background-color: rgba(161, 123, 65, 0.5);
    border: 1px black solid;
    position: relative;
    top: 125px;

    .past-text {
      width: 100%;
      margin: 0 auto;
      font-family: "Enchanted Land";

      .image-container {
        position: relative;
        margin: 0 auto;

        img {
          display: block;
          width: 100%;
        }

        h2 {
          position: absolute;
          font-size: 3rem;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
        }
        p {
          position: absolute;
          font-size: 2rem;
          top: 27%;
          left: 55%;
          transform: translate(-50%, -50%);
          color: black;
          width: 60%;

          span {
            float: left;
            font-size: 6rem;
            font-family: "Mevno2";
            color: rgb(110, 16, 16);
          }
        }
      }
    }
  }
}
</style>
