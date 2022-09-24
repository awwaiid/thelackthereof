<template>
  <NuxtLink :to="page._path">
    <div class="flex flex-row">

      <div class="flex justify-between w-full">

        <div class="flex flex-col">
          <div class="font-bold" v-html="cleanTitle(page.title)"></div>
          <div class="text-xs">
            <span>{{ shortDate(page.createdAt) }}</span>
            <span v-if="shortDate(page.createdAt) != shortDate(page.updatedAt)">
              → {{ shortDate(page.updatedAt) }}
            </span>
          </div>
        </div>

        <div class="text-right text-xs text-slate-400">
          <div v-for="tag in page.tags" :key="tag">
            <NuxtLink class="tag pl-2 pr-2 ml-2" :to="'/tag/' + tag">{{ tag }}</NuxtLink>
          </div>
        </div>

      </div>
    </div>

    <div class="m-4 pl-2 text-xs border-l-8 border-slate-200">
      <Markdown>{{ page.description }}</Markdown>
    </div>
  </NuxtLink>
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
