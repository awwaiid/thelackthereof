<template>
  <div v-if="page" class="flex justify-center">
    <div class="prose prose-slate rounded-lg p-8 shadow border-y sm:border-x border-gray-600 bg-white">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <h1 class="text-2xl" style="font-variant: small-caps" v-html="cleanTitle(page.title)"></h1>
      <div class="text-xs mb-4">
        Created {{ shortDate(page.createdAt) }}
        / Edited {{ shortDate(page.updatedAt) }}
      </div>
      <ContentRenderer :value="page">
        <template #empty>
          <p>No content!</p>
        </template>
      </ContentRenderer>
      <div v-if="page.mastodonThread">
        <MastodonThread
            :link="page.mastodonThread"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();

  let { data: page } = await useAsyncData(route.path, () =>
    queryContent(route.path).findOne()
  );

  // Fallback for legacy routes
  if (!page.value) {
    const path = route.path.replace(/_/g, "-");
    let response = await useAsyncData(path, () =>
      queryContent(path).findOne()
    );
    page = response.data;
  }

  if (!page.value) {
    console.error("Page not found", route.path);
    page = "not found";
  }

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
