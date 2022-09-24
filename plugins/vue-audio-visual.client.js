import AudioVisual from 'vue-audio-visual';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(AudioVisual);
});
