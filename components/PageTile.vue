<template>
  <div class="bg-white">
    <div class="flex flex-row border-b-2">
      <div class="flex justify-between w-full">
        <NuxtLink :to="page.path">
          <div class="flex flex-col">
            <div class="font-bold" style="font-variant: small-caps" v-html="cleanTitle(page.title)"></div>
            <div class="text-xs">
              <span>{{ shortDate(page.createdAt) }}</span>
              <span v-if="shortDate(page.createdAt) != shortDate(page.updatedAt)">
                → {{ shortDate(page.updatedAt) }}
              </span>
            </div>
          </div>
        </NuxtLink>

        <div class="text-right text-xs text-slate-400">
          <div v-for="tag in page.tags" :key="tag">
            <NuxtLink class="tag pl-2 pr-2 ml-2" :to="'/tag/' + tag">{{ tag }}</NuxtLink>
          </div>
        </div>

      </div>
    </div>

  <NuxtLink :to="page.path">
    <div class="m-2 flex flex-col">
      <div v-if="page.image" class="basis-1/3 pb-2 flex justify-center">
        <img class="w-max max-h-40" :src="imageUrl(page.image)">
      </div>
      <div class="basis-2/3 grow mb-4">{{ page.description }}</div>
    </div>
  </NuxtLink>
  </div>
</template>

<script>
export default {
  props: [
    "page"
  ],
  methods: {
    cleanTitle(value) {
      return value
        ?.replace(/_/g, ' ')
        ?.replace(/TLT - /, '')
        ?.replace(/\d\d\d\d[.-]\d\d[.-]\d\d - /, '')
        ?.replace(/ - /g, "<br/>");
    },
    shortDate(timestamp) {
      if(!timestamp) {
        return "";
      }
      return timestamp.replace(/(\d+-\d+-\d+).*/, "$1");
    },
    imageUrl(imagePath) {
      // If it's already an absolute URL, return as-is
      if (imagePath?.match(/^https?:\/\//)) {
        return imagePath;
      }
      // Use IPX image handler (same as ContentRenderer does)
      // The /_ipx/_/ prefix tells Nuxt Image to process the image from the content dir
      return imagePath ? `/_ipx/_/${imagePath}` : '';
    }
  }
};
</script>

<style>
.tag {
  /*background-color: rgb(199 191 176);*/
  /* background-color: #888;
  color: rgb(199 191 176); */
}
</style>
