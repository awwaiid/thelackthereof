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

  function canonicalize(path: string): string {
    return path.replace(/_/g, '-').toLowerCase();
  }

  let { data: page, pending } = await useAsyncData(route.path, () =>
    queryCollection('content').path(route.path).first()
  );

  // Fallback for legacy URLs: canonicalize (lowercase + underscores→dashes)
  // and redirect to the canonical path if it resolves.
  if (!page.value && !pending.value) {
    const canonical = canonicalize(route.path);
    if (canonical !== route.path) {
      const fallback = await queryCollection('content').path(canonical).first();
      if (fallback) {
        await navigateTo(canonical, { redirectCode: 301 });
      } else {
        // Try with /tlt- prefix (legacy blog paths without the prefix).
        const withPrefix = '/tlt' + canonical;
        const prefixed = await queryCollection('content').path(withPrefix).first();
        if (prefixed) {
          await navigateTo(withPrefix, { redirectCode: 301 });
        }
      }
    }
  }

  if (!page.value) {
    console.error("Page not found", route.path);
    if (import.meta.server) {
      const event = useRequestEvent();
      if (event) setResponseStatus(event, 404);
    }
  }

  // Update page state for footer component using composable
  const pageState = usePageState();
  watchEffect(() => {
    pageState.value = {
      exists: !!page.value,
      path: page.value?.path || route.path,
      filename: page.value ? `${page.value.stem}.${page.value.extension}` : null
    };
  });

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
