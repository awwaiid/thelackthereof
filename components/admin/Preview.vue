<template>
  <div ref="previewContainer" class="relative h-full overflow-auto">
    <!-- Loading indicator (overlay, doesn't hide content) -->
    <div v-if="loading" class="absolute top-0 right-0 m-2 z-10">
      <div class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
        Updating...
      </div>
    </div>

    <div v-if="error" class="text-center py-8">
      <p class="text-red-600">Error rendering preview</p>
    </div>

    <div v-else-if="doc" class="prose prose-slate max-w-none">
      <h1 class="text-2xl" style="font-variant: small-caps">{{ cleanTitle(doc.title) }}</h1>
      <ContentRenderer :value="doc" />
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-500">Type something to see preview...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  frontmatter: any;
  content: string;
}>();

const doc = ref(null);
const loading = ref(false);
const error = ref(false);
const previewContainer = ref<HTMLElement>();

// Debounce preview updates
let debounceTimeout: NodeJS.Timeout;

watch([() => props.frontmatter, () => props.content], async () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(async () => {
    await updatePreview();
  }, 800); // Increased debounce for smoother experience
}, { deep: true });

async function updatePreview() {
  if (!props.content.trim()) {
    doc.value = null;
    return;
  }

  // Save scroll position
  const scrollTop = previewContainer.value?.scrollTop || 0;

  loading.value = true;
  error.value = false;

  try {
    const response: any = await $fetch('/api/admin/preview', {
      method: 'POST',
      body: {
        frontmatter: props.frontmatter,
        content: props.content
      }
    });

    doc.value = response.doc;

    // Restore scroll position after render
    await nextTick();
    if (previewContainer.value) {
      previewContainer.value.scrollTop = scrollTop;
    }
  } catch (e) {
    error.value = true;
    console.error('Preview error:', e);
  } finally {
    loading.value = false;
  }
}

function cleanTitle(value: string) {
  if (!value) return '';
  return value
    ?.replace(/_/g, ' ')
    ?.replace(/TLT - /, '')
    ?.replace(/\d\d\d\d[.-]\d\d[.-]\d\d - /, '')
    ?.replace(/ - /g, "<br/>");
}

// Initial preview
onMounted(() => {
  updatePreview();
});

// Expose previewContainer ref to parent for scroll sync
defineExpose({
  previewContainer
});
</script>
