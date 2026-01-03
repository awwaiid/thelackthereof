<template>
  <footer
    v-if="showFooter"
    class="border-t border-gray-300 mt-8 py-4 text-center text-sm text-gray-500"
  >
    <!-- Edit link for existing pages -->
    <a
      v-if="pageExists && editUrl"
      :href="editUrl"
      class="text-blue-600 hover:text-blue-800 hover:underline"
    >
      Edit this page
    </a>

    <!-- Create link for 404 pages -->
    <a
      v-else-if="!pageExists && createUrl"
      :href="createUrl"
      class="text-green-600 hover:text-green-800 hover:underline"
    >
      Create this page
    </a>
  </footer>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { slugToTitle } from '~/lib/pathUtils';

const route = useRoute();

// Get page state from composable
const pageState = usePageState();

// Get admin auth state
const { isAuthenticated, checkAuth } = useAdminAuth();

// Check auth status on mount (client-side only)
onMounted(() => {
  checkAuth();
});

// Hide footer on admin pages
const showFooter = computed(() => {
  return !route.path.startsWith('/admin');
});

const pageExists = computed(() => {
  const exists = pageState.value?.exists || false;
  console.log('[PageFooter] pageExists:', exists, 'pageState:', pageState.value);
  return exists;
});

const editUrl = computed(() => {
  // Only show edit link if authenticated
  if (!isAuthenticated.value) return null;

  const filename = pageState.value?.filename;
  console.log('[PageFooter] filename:', filename, 'pageState:', pageState.value);
  if (!filename) return null;
  return `/admin/edit?file=${encodeURIComponent(filename)}`;
});

// For 404 pages, generate create URL with pre-filled title
const createUrl = computed(() => {
  // Only show create link if authenticated
  if (!isAuthenticated.value) return null;
  if (pageExists.value) return null;

  const title = slugToTitle(route.path);

  // Detect if this looks like a blog post (TLT - YYYY.MM.DD pattern)
  const isBlogPost = route.path.match(/^\/tlt-\d{4}-\d{2}-\d{2}/);
  const pageType = isBlogPost ? 'blog' : 'page';

  return `/admin/edit?new=${pageType}&title=${encodeURIComponent(title)}`;
});
</script>
