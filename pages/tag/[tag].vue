<template>
  <div>
    <TagNavBar />
    <PageTileList :pages="pages.slice(0, pageCount)" />
    <button class="m-2 p-2 rounded-lg shadow border border-gray-300" @click="morePages">
      Load More
    </button>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();

  const pageCount = ref(16);

  const { data: pages } = await useAsyncData("tags-pages-list-" + route.params.tag, () =>
    queryContent("/")
    .where({ tags: { $contains: route.params.tag } })
    .sort({ updatedAt: -1})
    .limit(pageCount)
    .find()
  );
        // .sortBy('updatedAt', 'desc')

  function morePages() {
    pageCount.value += 16;
  }
</script>
