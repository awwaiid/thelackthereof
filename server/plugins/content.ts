import tweakMarkdown from '~/lib/tweakMarkdown';

export default defineNitroPlugin(
  (nitroApp) => {
    console.log("Registering beforeParse hook!");
    nitroApp.hooks.hook('content:file:beforeParse', tweakMarkdown);
  }
);
