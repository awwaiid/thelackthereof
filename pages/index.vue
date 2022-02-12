<template>
  <div class="grid grid-cols-4">
      <NuxtLink
        v-for="page in pages" :key="page.slug" class="border m-2 p-2"
        :to="{ name: 'slug', params: { slug: page.slug } }"
      >
        <div class="text-xs">
          Created <span>{{ shortDate(page.createdAt) }}</span>
          /
          Edited <span>{{ shortDate(page.editedAt) }}</span>
        </div>
        <div v-html="cleanTitle(page.title)"></div>
      </NuxtLink>
  </div>
</template>

<script>
export default {

  data() {
    return {
      pages: []
    };
  },
  async fetch() {
    const pages = await this.$content("/")
      .only(['title', 'description', 'img', 'slug', 'createdAt', 'editedAt'])
      .sortBy('editedAt', 'desc')
      .fetch();
    this.pages = pages;
  },
  methods: {
    cleanTitle(value) {
      return value
        ?.replace(/_/g, ' ')
        ?.replace(/TLT - /, '')
        ?.replace(/ - /g, "<br/>");
    },
    shortDate(timestamp) {
      return timestamp.replace(/(\d+-\d+-\d+).*/, "$1");
    }
  }
}
</script>
