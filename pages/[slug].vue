<template>
  <!-- Loading state -->
  <div v-if="pending" class="flex justify-center py-8">
    <p class="text-gray-500">Loading...</p>
  </div>

  <!-- Content found -->
  <div v-else-if="page" class="flex justify-center">
    <div class="prose prose-slate sm:rounded-lg p-2 sm:p-8 sm:shadow sm:border-y sm:border-x sm:border-gray-600 bg-white">
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

  <!-- 404 - Page not found -->
  <div v-else class="flex justify-center py-8">
    <div class="text-center">
      <h1 class="text-2xl mb-4">404 - Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();

  let { data: page, pending } = await useAsyncData(route.path, () =>
    queryContent(route.path).findOne()
  );

  // Fallback for legacy routes
  if (!page.value && !pending.value) {
    const path = route.path.replace(/_/g, "-");
    let response = await useAsyncData(path, () =>
      queryContent(path).findOne()
    );
    page = response.data;
    pending = response.pending;
  }

  if (!page.value) {
    console.error("Page not found", route.path);
    // Don't assign a string - leave page.value as null for proper 404 handling
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
