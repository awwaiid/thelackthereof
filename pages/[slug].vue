<template>
  <div v-if="page">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <h1 class="text-2xl" v-html="cleanTitle(page.title)"></h1>
    <div class="text-xs mb-4">
      Created {{ shortDate(page.createdAt) }}
      / Edited {{ shortDate(page.updatedAt) }}
    </div>
    <!-- <nuxt-content class="prose prose-lg" :document="page" /> -->
    <ContentRenderer class="prose prose-lg" :value="page" />
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();

  const { data: page } = await useAsyncData(route.path, () =>
    queryContent(route.path).findOne()
  );

  function cleanTitle(value) {
    return value
      ?.replace(/_/g, ' ')
      ?.replace(/TLT - /, '')
      ?.replace(/\d\d\d\d[.-]\d\d[.-]\d\d - /, '')
      ?.replace(/ - /g, "<br/>");
  }

  function shortDate(timestamp) {
    return timestamp?.replace(/(\d+-\d+-\d+).*/, "$1");
  }
</script>
