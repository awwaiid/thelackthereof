<template>
  <NuxtLink :to="page._path">
    <NuxtLink href="/"><img class="float-right" width="32" src="/brock-logo-circle-icon-48x48.png"></NuxtLink>
    <div class="text-xs">
      <span>{{ shortDate(page.createdAt) }}</span>
      <span v-if="shortDate(page.createdAt) != shortDate(page.updatedAt)">
        → {{ shortDate(page.updatedAt) }}
      </span>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="cleanTitle(page.title)"></div>
    <div class="flex justify-end">
      <div v-for="tag in page.tags" :key="tag">
        <NuxtLink class="tag rounded-full border pl-2 pr-2 ml-2 text-black border-2 border-black" :to="'/tag/' + tag">{{ tag }}</NuxtLink>
      </div>
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
  background-color: rgb(199 191 176);
}
</style>
