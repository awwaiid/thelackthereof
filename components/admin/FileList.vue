<template>
  <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div class="mb-6">
      <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search pages..."
          class="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div class="flex gap-2">
          <NuxtLink
            to="/admin/edit?new=page"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            New Page
          </NuxtLink>
          <NuxtLink
            to="/admin/edit?new=blog"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            New Blog Post
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="pending" class="text-center py-8">
      <p class="text-gray-500">Loading files...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600">Error loading files: {{ error.message }}</p>
    </div>

    <div v-else>
      <div>
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li
              v-for="file in filteredFiles"
              :key="file.path"
              class="hover:bg-gray-50"
            >
              <NuxtLink
                :to="`/admin/edit?file=${encodeURIComponent(file.path)}`"
                class="block px-4 py-4"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">
                      {{ file.title }}
                      <span
                        v-if="file.draft"
                        class="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded"
                      >
                        Draft
                      </span>
                    </p>
                    <p class="text-sm text-gray-500">{{ file.path }}</p>
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ formatDate(file.updatedAt) }}
                  </div>
                </div>
              </NuxtLink>
            </li>
          </ul>
          <div v-if="filteredFiles.length === 0" class="px-4 py-8 text-center text-gray-500">
            No files found
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('');

const { data: files, pending, error } = await useFetch('/api/admin/files');

const filteredFiles = computed(() => {
  // Merge blog posts and pages
  const allFiles = [
    ...(files.value?.blogPosts || []),
    ...(files.value?.pages || [])
  ];

  // Filter by search query
  const query = searchQuery.value.toLowerCase();
  const filtered = !searchQuery.value
    ? allFiles
    : allFiles.filter((file: any) =>
        file.title.toLowerCase().includes(query) ||
        file.path.toLowerCase().includes(query)
      );

  // Sort by updatedAt (most recent first)
  return filtered.sort((a: any, b: any) => {
    const dateA = new Date(a.updatedAt || a.createdAt || 0);
    const dateB = new Date(b.updatedAt || b.createdAt || 0);
    return dateB.getTime() - dateA.getTime();
  });
});

function formatDate(dateString: string) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } catch {
    return dateString;
  }
}
</script>
