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

  const pageCount = ref(100);

  const { data: pages } = await useAsyncData("tags-pages-list-" + route.params.tag, async () => {
    const fetchedPages = await queryContent("/")
      .where({ tags: { $contains: route.params.tag } })
      .where({ draft: { $ne: true }})
      .sort({ createdAt: -1})
      .sort({ updatedAt: -1})
      .limit(pageCount)
      .find();
    

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
