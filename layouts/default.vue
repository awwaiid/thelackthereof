<template>
  <div>
    <div class="header text-white">
      <div class="flex items-center header-content">

        <div class="ml-4 flex-grow header-title">
          <NuxtLink to="/">
            <h1 class="sm:text-2xl font-bold">THE LACK THEREOF</h1>
            <h2 class="text-xs italic">Various musings of Brock Wilcox (@awwaiid)</h2>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-3 mr-2">
          <a class="social-logo m-1" href="/rss.xml"><img width="32" src="/social-media-icons/rss.png" /></a>
          <NuxtLink class="social-logo m-1" href="https://www.github.com/awwaiid"><img width="32" src="/social-media-icons/github.png" /></NuxtLink>
          <!-- <NuxtLink class="social-logo m-1" href="https://www.twitter.com/awwaiid/"><img width="32" src="/social-media-icons/twitter.png" /></NuxtLink> -->
          <NuxtLink class="social-logo m-1" rel="me" href="https://mastodon.social/@awwaiid/"><img width="32" src="/social-media-icons/mastodon.png" /></NuxtLink>
          <NuxtLink class="social-logo m-1" href="https://www.instagram.com/awwaiid/"><img width="32" src="/social-media-icons/instagram.png" /></NuxtLink>
          <NuxtLink class="social-logo m-1" href="https://www.linkedin.com/in/brockwilcox/"><img width="32" src="/social-media-icons/linkedin.png" /></NuxtLink>
          <NuxtLink class="social-logo m-1" href="https://soundcloud.com/awwaiid"><img width="32" src="/social-media-icons/soundcloud.png" /></NuxtLink>
          <NuxtLink class="social-logo m-1" href="https://www.youtube.com/user/awwaiid"><img width="32" src="/social-media-icons/youtube.png" /></NuxtLink>
          <NuxtLink class="social-logo m-1" href="https://www.tiktok.com/@awwaiid"><img width="32" src="/social-media-icons/tiktok.png" /></NuxtLink>
          <NuxtLink class="social-logo m-1" href="mailto:awwaiid@thelackthereof.org"><img width="32" src="/social-media-icons/email.png" /></NuxtLink>
          <!-- <NuxtLink class="social-logo m-1" href="/"><img width="32" src="/brock-logo-circle-icon-48x48.png" /></NuxtLink> -->
        </div>
      </div>

      <div class="flex items-center logo-link-wrapper">
        <NuxtLink to="/" class="logo-link" />
      </div>
    </div>


    <NuxtLoadingIndicator />

    <div class="m-0 sm:m-4">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  // mounted() {
  //   let gtmScript = document.createElement('script')
  //   gtpScript.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-7FLNGJSFBK');
  //   document.head.appendChild(gtmScript);
  //   let gtagScript = document.createElement('script')
  //   gtagScript.innerHTML = `
  //     window.dataLayer = window.dataLayer || [];
  //     function gtag(){dataLayer.push(arguments);}
  //     gtag('js', new Date());
  //     gtag('config', 'G-7FLNGJSFBK');
  //   `;
  //   document.head.appendChild(gtagScript);
  // }
}
</script>

<style>
body {
    /* height: 100vh;
    display: flex;
    background-color: #afa299;
     background-size: cover; */

  font-family: "Atkinson Hyperlegible", Nunito, sans-serif;
  background-color: #f4f3f0;
}

.logo-link-wrapper {
  position: relative;
  margin-bottom: 35px;
}

.logo-link {
  border: 3px solid black;
  padding: 3px;
  background-color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-image: url(/brock-logo-outline-80x100.png);
  background-position:50% 50%;
  background-repeat:no-repeat;
  background-size: 50%;
  position: absolute;
  top: -28px;
  left: 10px;
}
.header-title {
  position: relative;
  top: -10px;
}

.header {
  background-image: url(/bg/babbage-banner-800-worse.jpeg);
  background-size: cover;
  background-position: center;
  color: rgb(199 191 176);

  /* opacity: 0.85;
  position: sticky;
  top: 0; */

  /* -webkit-text-stroke: 2px white; */
}

.header-content {
  border-bottom: 3px solid black;
  background: linear-gradient(
  to right,
  hsl(0, 0%, 0%) 0%,
  hsla(0, 0%, 0%, 0.964) 7.4%,
  hsla(0, 0%, 0%, 0.918) 15.3%,
  hsla(0, 0%, 0%, 0.862) 23.4%,
  hsla(0, 0%, 0%, 0.799) 31.6%,
  hsla(0, 0%, 0%, 0.73) 39.9%,
  hsla(0, 0%, 0%, 0.655) 48.2%,
  hsla(0, 0%, 0%, 0.577) 56.2%,
  hsla(0, 0%, 0%, 0.497) 64%,
  hsla(0, 0%, 0%, 0.417) 71.3%,
  hsla(0, 0%, 0%, 0.337) 78.1%,
  hsla(0, 0%, 0%, 0.259) 84.2%,
  hsla(0, 0%, 0%, 0.186) 89.6%,
  hsla(0, 0%, 0%, 0.117) 94.1%,
  hsla(0, 0%, 0%, 0.054) 97.6%,
  hsla(0, 0%, 0%, 0) 100%
);

}

.social-logo {
  border-radius: 50%;
  background-color: rgb(199 191 176);
}

.glassmorphism {
  background-color: hsla(0, 0%, 97%, 0.75);
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

    /* background-image: url(/bg/orange-land.jpg); */
    background-image: url(/bg/babbage-banner-1500x500.jpeg);
    background-size: cover;
    content: "";
    filter: blur(4px);
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    z-index: -1;
  }
/* } */

.prose li {
  padding-top: 0;
  padding-bottom: 0;
  line-height: 1.1em;
}
  .prose-lg > ul > li > *:last-child {
    margin-bottom: 0;
}

.prose-lg > ul > li > *:first-child {
    margin-top: 0;
}

  .prose-lg ul > li::before {
    width: 0.3333333em;
    height: 0.3333333em;
    top: 0.3em;
    left: 0.2222222em;
    background-color: black;
}

.prose code::before {
  display: none;
}

.prose code::after {
  display: none;
}

.prose p code {
  background-color: #dcd5c8;
  padding: 0.25em;
  border-radius: 0.375rem;
}
.prose pre {
  background-color: #dcd5c8;
  font-size: 0.8em;
  color: #101112;
  /* max-width: 80ch; */
  max-width: 90vw;
}

.prose h2 a,
.prose h3 a,
.prose h4 a,
.prose h5 a,
.prose h6 a {
  text-decoration: none;
}

audio::-webkit-media-controls-panel, video::-webkit-media-controls-panel {
  /* background-color: red; */
}
audio {
    /* filter: sepia(20%) saturate(70%) grayscale(1) contrast(99%) invert(12%); */
    width: 200px;
    height: 25px;
    display: inline;
  /* background-color: red; */
}

h1, h2, h3, h4 {
  font-variant: small-caps;
}

.prose img {
  border: 1px solid #ccc;
}

.prose {
  line-height: 1.5em;
}

</style>
