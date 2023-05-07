<template>
  <div class="content">
    <div id="slider">
      <div class="images">
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/leopard2.jpg"
        />
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/lion2.jpg"
        />
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg"
        />
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/bear2.jpg"
        />
      </div>
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

      <div id="pagination">
        <button class="active" data-slide="0"></button>
        <button data-slide="1"></button>
        <button data-slide="2"></button>
        <button data-slide="3"></button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as THREE from "three";
import gsap from "gsap";
import imagesLoaded from "imagesloaded";

export default defineComponent({});
</script>

<style lang="scss" scoped>
body {
  background-color: #23272a;
  overflow: hidden;
}

.content {
  background-color: #23272a;
  position: relative;
  width: 100%;
  height: 100%;
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
    min-width: 1120px;
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
  position: absolute;
  top: 8%;

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
  top: 12%;
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
