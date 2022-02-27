<template>
  <div class="m-2">
    <div class="m-2 flex items-center">
      <a href="/"><img src="/brock-logo-outline-80x100.png"></a>
      <div class="ml-4 flex-grow">
        <a href="/">
          <h1 class="lg:text-2xl font-bold">THE LACK THEREOF</h1>
          <h2 class="text-xs italic">Various musings of Brock Wilcox (@awwaiid)</h2>
        </a>
      </div>
      <div class="grid grid-cols-3">
        <a class="m-1" href="https://www.github.com/awwaiid"><img width="32px" src="/social-media-icons/github.png" /></a>
        <a class="m-1" href="https://www.twitter.com/awwaiid/"><img width="32px" src="/social-media-icons/twitter.png" /></a>
        <a class="m-1" href="https://www.instagram.com/awwaiid/"><img width="32px" src="/social-media-icons/instagram.png" /></a>
        <a class="m-1" href="https://www.linkedin.com/in/brockwilcox/"><img width="32px" src="/social-media-icons/linkedin.png" /></a>
        <a class="m-1" href="https://soundcloud.com/awwaiid"><img width="32px" src="/social-media-icons/soundcloud.png" /></a>
        <a class="m-1" href="https://www.youtube.com/user/awwaiid"><img width="32px" src="/social-media-icons/youtube.png" /></a>
        <a class="m-1" href="https://www.tiktok.com/@awwaiid"><img width="32px" src="/social-media-icons/tiktok.png" /></a>
        <a class="m-1" href="mailto:awwaiid@thelackthereof.org"><img width="32px" src="/social-media-icons/email.png" /></a>
        <a class="m-1" href="/"><img width="32px" src="/brock-logo-circle-icon-48x48.png" /></a>
      </div>
    </div>

    <div class="m-4">
      <Nuxt />
    </div>
  </div>
</template>

<style>
body {
    height: 100vh;
    display: flex;
    background-image: url(/bg/orange-land.jpg);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #a8803c;

  font-family: Nunito, sans-serif;
}

.glassmorphism {
  background-color: hsla(0, 0%, 97%, 0.2);
  border: 1px solid hsla(0, 0%, 97%, 0.4);
  /* -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px); */
  color: #241701;
  overflow: hidden;
}

/* @supports (background: -moz-element(body)) and (not (backdrop-filter: blur(10px))) {  */
  .glassmorphism {
    position: relative;
  }
  .glassmorphism::before {
    background-attachment: fixed;
    /* background-image: -moz-element(body); */

    background-image: url(/bg/orange-land.jpg);
    content: "";
    filter: blur(2px);
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    z-index: -1;
  }
/* } */



</style>
