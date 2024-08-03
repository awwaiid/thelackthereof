<template>
  <div>
    <div class="flex flex-row justify-between flex-wrap">
      <TagNavBar />
      <div>Search: <input v-model="search" size=10 class="border border-black"></div>
    </div>
    <PageTileList :pages="pages.slice(0, pageCount)" />
    <button class="m-2 p-2 rounded-lg shadow border border-gray-300" @click="morePages">
      Load More
    </button>
  </div>
</template>

<script setup lang="ts">
  const pageCount = ref(100);

  const searchInput = ref('');
  const search  = ref('');
  let results = await searchContent(search);
  const resultPaths = computed(() => results.value.map((page) => page.id.replace(/\#.*$/, '')));

  const { data: pages } = await useAsyncData("posts-list", () => {
    let query = queryContent("/");

    if (resultPaths.value.length > 0) {
      query = query.where({ "_path": { $in: resultPaths.value.slice(0, 20) }});
    }

    return query
      .where({ draft: { $ne: true }})
      .sort({ createdAt: -1})
      .sort({ updatedAt: -1})
      .limit(pageCount)
      .find();
  }, { watch: [pageCount, resultPaths] });

  function morePages() {
    pageCount.value += 100;
  }
</script>
