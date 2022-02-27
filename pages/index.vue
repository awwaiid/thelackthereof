<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

    <a
      v-for="item in githubFeedLimit"
      :key="item.id"
      :href="item.link"
      class="glassmorphism m-2 p-2 rounded-lg shadow-xl"
    >
      <!-- class="border-2 border-black rounded-lg m-2 p-2 shadow-xl bg-red-400" -->
      <img class="float-right" width="32px" src="/social-media-icons/github.png" />
      <div v-cloak v-html="item.content" class="github-rss-item" />
      <!-- <div>{{item.content}}</div> -->
    </a>

    <NuxtLink
      v-for="page in pages.slice(0, pageCount)"
      :key="page.slug"
      :to="{ name: 'slug', params: { slug: page.slug } }"
      class="rounded-lg m-2 p-2 shadow-xl glassmorphism"
    >
      <a href="/"><img class="float-right" width="32px" src="/brock-logo-circle-icon-48x48.png"></a>
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

import RssParser from "rss-parser";

export default {
  // components: {
  //   VueRssFeed
  // },
  data() {
    return {
      pages: [],
      feed: {},
      pageCount: 8
    };
  },
  async fetch() {
    try {
      const pages = await this.$content("/")
        .only(['title', 'description', 'img', 'slug', 'createdAt', 'editedAt'])
        .sortBy('editedAt', 'desc')
        .fetch();
      this.pages = pages;
    } catch (e) {
      console.error("Error loading content", e);
    }
    try {
      const parser = new RssParser();
      console.log(`fetching ${this.$config.baseURL}/proxy/github/awwaiid.atom`);
      const feed = await parser.parseURL(`${this.$config.baseURL}/proxy/github/awwaiid.atom`);
      // const feedResponse = await this.$axios.$get("https://github.com/awwaiid.atom");
      // this.feed = feedResponse;
      // const feed = new window.DOMParser().parseFromString(feedResponse, "text/xml");
      // const feed = new JSDOM(feedResponse, { contentType: "text/xml" });
      this.feed = feed;
      // const items = feed.querySelectorAll("item");
    } catch (e) {
      console.error("Error loading github RSS", e);
    }
  },
  computed: {
    githubFeedLimit() {
      if (this.feed.items) {
        return this.feed.items.slice(0, 4);
      } else {
        return [];
      }
    }
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

// https://feedmix.novaclic.com/atom2rss.php?source=https%3A%2F%2Fgithub.com%2Fawwaiid.atom
  }
}
</script>

<style lang="scss">
.github-rss-item .avatar,
.github-rss-item .avatar-user,
.github-rss-item code,
.github-rss-item .Box > span,
.github-rss-item .Box > a,
.github-rss-item .body > div > span,
.github-rss-item .commits li > span
{
  display: none;
}

.github-rss-item li {
  list-style: disc outside;
  margin-left: 1em;
}

.github-rss-item .Box {
  margin: 0;
  padding: 0;
}

[v-cloak] {
  display: none;
}


</style>
