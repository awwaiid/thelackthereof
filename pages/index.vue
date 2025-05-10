<template>
  <div>
    <div class="flex flex-row justify-between flex-wrap mx-4 sm:mx-0">
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

  const search  = ref('');

  const { data: pages } = await useAsyncData("posts-list", async () => {

    let query = queryContent("/");

    if (search.value) {
      console.log(`Searching for [${search.value}]`);
      let results = await searchContent(search);
      let resultPaths = results.value.map((page) => page.id.replace(/\#.*$/, ''));

      if (resultPaths.length > 0) {
        query = query.where({ "_path": { $in: resultPaths.slice(0, 20) }});
      }
    }

    return query
      .where({ draft: { $ne: true }})
      .sort({ createdAt: -1})
      .sort({ updatedAt: -1})
      .limit(pageCount)
      .find();
  }, { watch: [search, pageCount] });

  function morePages() {
    pageCount.value += 100;
  }
</script>
