<template>
  <div>
    <div v-if="loading" class="max-w-7xl mx-auto py-6 px-4">
      <p class="text-center text-gray-500">Loading...</p>
    </div>

    <div v-else-if="error" class="max-w-7xl mx-auto py-6 px-4">
      <div class="bg-red-50 border border-red-200 rounded-md p-4">
        <p class="text-red-800">Error loading file: {{ error }}</p>
        <NuxtLink to="/admin" class="text-blue-600 hover:text-blue-800 mt-2 inline-block">
          ← Back to list
        </NuxtLink>
      </div>
    </div>

    <AdminEditor
      v-else
      :initial-frontmatter="frontmatter"
      :initial-content="content"
      :is-new="isNew"
      :is-blog="isBlog"
      :filename="filename"
      @saved="handleSaved"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
});

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const error = ref('');
const frontmatter = ref<any>({});
const content = ref('');
const isNew = ref(false);
const isBlog = ref(false);
const filename = ref('');

onMounted(async () => {
  try {
    // Check if this is a new file
    if (route.query.new) {
      isNew.value = true;
      isBlog.value = route.query.new === 'blog';

      // Get pre-filled title from query param if provided
      const prefilledTitle = (route.query.title as string) || '';

      // Initialize with template
      frontmatter.value = {
        draft: true,
        title: prefilledTitle,
        tags: isBlog.value ? ['blog'] : [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      content.value = '(summary)\n\n## Section\n\ncontent\n';
    } else if (route.query.file) {
      // Load existing file
      filename.value = route.query.file as string;
      const response: any = await $fetch(`/api/admin/file?path=${encodeURIComponent(filename.value)}`);
      frontmatter.value = response.frontmatter;
      content.value = response.content;
    } else {
      error.value = 'No file specified';
    }
  } catch (e: any) {
    error.value = e.data?.message || e.message || 'Unknown error';
  } finally {
    loading.value = false;
  }
});

function handleSaved(response: any) {
  // Redirect to edit the saved file
  if (isNew.value && response.path) {
    router.push(`/admin/edit?file=${encodeURIComponent(response.path)}`);
  }
}
</script>
