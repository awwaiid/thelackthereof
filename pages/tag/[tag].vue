<template>
  <div>
    <div class="flex flex-row justify-between flex-wrap mx-4 sm:mx-0">
      <TagNavBar />
    </div>
    <PageTileList :pages="pages?.slice(0, pageCount) || []" />
    <button class="m-2 p-2 rounded-lg shadow border border-gray-300" @click="morePages">
      Load More
    </button>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();

  const pageCount = ref(100);

  const { data: pages } = await useAsyncData("tags-pages-list-" + route.params.tag, async () => {
    const fetchedPages = await queryCollection('content')
      .where('tags', 'LIKE', `%${route.params.tag}%`)
      .where('draft', 'IS NOT', 1)
      .order('createdAt', 'DESC')
      .order('updatedAt', 'DESC')
      .limit(pageCount.value)
      .all();


    // Sort pages with matching title to be first
    return fetchedPages.sort((a, b) => {
      const tagLower = route.params.tag.toLowerCase();
      const aTitleLower = a.title.toLowerCase();
      const bTitleLower = b.title.toLowerCase();

      if (aTitleLower === tagLower || aTitleLower === tagLower + 's') return -1;
      if (bTitleLower === tagLower || bTitleLower === tagLower + 's') return 1;
      return 0;
    });
  });

  function morePages() {
    pageCount.value += 100;
  }
</script>
