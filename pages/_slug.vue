<template>
  <div>
    <h1 class="text-2xl" v-html="cleanTitle(page.title)"></h1>
    <div class="text-xs mb-4">Created {{ shortDate(page.createdAt) }} / Edited {{ shortDate(page.updatedAt) }}</div>
    <nuxt-content class="prose prose-lg" :document="page" />
  </div>
</template>

<script>
export default {

  data() {
    return {
      page: {}
    };
  },
  async fetch() {
    console.log(this.$route.params);
    this.page = await this.$content("/", this.$route.params.slug).fetch();
  },
  methods: {
    cleanTitle(value) {
      return value
        ?.replace(/_/g, ' ')
        ?.replace(/TLT - /, '')
        ?.replace(/ - /g, "<br/>");
    },
    shortDate(timestamp) {
      return timestamp?.replace(/(\d+-\d+-\d+).*/, "$1");
    }
  }
}
</script>
