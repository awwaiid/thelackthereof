<template>
  <div>
    <TagNavBar />
    <PageTileList :pages="pages.slice(0, pageCount)" />
    <button class="m-2 p-2 rounded-lg shadow border border-gray-300" @click="morePages">
      Load More
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: [],
      pageCount: 16
    };
  },
  async fetch() {
    try {
      const pages = await this.$content("/")
        .only(['title', 'description', 'img', 'slug', 'createdAt', 'updatedAt', 'tags'])
        .where({ tags: { $contains: this.$route.params.tag } })
        .sortBy('updatedAt', 'desc')
        .fetch();
      this.pages = pages;
    } catch (e) {
      console.error("Error loading content", e);
    }
  },
  methods: {
    morePages() {
      this.pageCount += 16;
    }
  }
}
</script>
