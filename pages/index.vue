<template>
  <div>
    <div class="flex flex-row justify-between flex-wrap mx-4 sm:mx-0">
      <TagNavBar />
      <div>Search: <input v-model="search" size=10 class="border border-black"></div>
    </div>
    <PageTileList :pages="pages?.slice(0, pageCount) || []" />
    <button class="m-2 p-2 rounded-lg shadow border border-gray-300" @click="morePages">
      Load More
    </button>
  </div>
</template>

<script setup lang="ts">
  const pageCount = ref(100);
  const search = ref('');

  // Fetch search sections for Fuse.js
  const { data: searchSections } = await useAsyncData('search-sections', () =>
    queryCollectionSearchSections('content', {
      ignoredTags: ['code', 'pre']
    })
  );

  const { data: pages } = await useAsyncData("posts-list", async () => {
    let queryBuilder = queryCollection('content');

    if (search.value && searchSections.value) {
      console.log(`Searching for [${search.value}]`);

      // Import and configure Fuse.js
      const Fuse = await import('fuse.js').then(m => m.default);
      const fuse = new Fuse(searchSections.value, {
        keys: ['content', 'title'],
        threshold: 0.3
      });

      const results = fuse.search(search.value);
      const resultPaths = results
        .map(result => result.item.id.replace(/#.*$/, ''))
        .filter((path, index, self) => self.indexOf(path) === index)
        .slice(0, 20);

      if (resultPaths.length > 0) {
        queryBuilder = queryBuilder.where('path', 'IN', resultPaths);
      }
    }

    return queryBuilder
      .where('draft', 'IS NOT', 1)
      .order('createdAt', 'DESC')
      .order('updatedAt', 'DESC')
      .limit(pageCount.value)
      .all();
  }, { watch: [search, pageCount] });

  function morePages() {
    pageCount.value += 100;
  }
</script>
