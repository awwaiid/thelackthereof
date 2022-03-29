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

// import RssParser from "rss-parser";

export default {
  // components: {
  //   VueRssFeed
  // },
  data() {
    return {
      pages: [],
      feed: {},
      pageCount: 16
    };
  },
  async fetch() {
    try {
      const pages = await this.$content("/")
        .only(['title', 'description', 'img', 'slug', 'createdAt', 'updatedAt', 'tags'])
        .sortBy('updatedAt', 'desc')
        .fetch();
      this.pages = pages;
    } catch (e) {
      console.error("Error loading content", e);
    }
    // try {
    //   const parser = new RssParser();
    //   console.log(`fetching ${this.$config.baseURL}/proxy/github/awwaiid.atom`);
    //   const feed = await parser.parseURL(`${this.$config.baseURL}/proxy/github/awwaiid.atom`);
    //   // const feedResponse = await this.$axios.$get("https://github.com/awwaiid.atom");
    //   // this.feed = feedResponse;
    //   // const feed = new window.DOMParser().parseFromString(feedResponse, "text/xml");
    //   // const feed = new JSDOM(feedResponse, { contentType: "text/xml" });
    //   this.feed = feed;
    //   // const items = feed.querySelectorAll("item");
    // } catch (e) {
    //   console.error("Error loading github RSS", e);
    // }
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
    morePages() {
      this.pageCount += 16;
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
