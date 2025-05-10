import VueGtag from 'vue-gtag';

export default defineNuxtPlugin( (app) => {
  app.use(VueGtag, {
    config: { id: 'G-7FLNGJSFBK' }
  });
});

