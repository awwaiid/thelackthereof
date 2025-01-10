<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <div
      v-for="page in pages"
      :key="page._path"
      class="rounded-lg m-2 p-2 shadow border border-gray-600 overflow-hidden bg-white"
    >
      <PageTile :page="page" />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    pages: {
      type: Array,
      default: () => []
    }
  }
};
</script>
