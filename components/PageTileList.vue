<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="page in pages"
      :key="page._path"
      class="rounded-lg m-2 p-2 shadow border border-gray-300 overflow-hidden"
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
