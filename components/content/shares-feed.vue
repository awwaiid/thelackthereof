<template>
  <ul>
    <li v-for="item in feedItems" :key="item.link">
      <a :href="item.link">{{ item.title }} ({{ item.date }})</a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      feedItems: []
    }
  },
  async mounted() {
    let response = await fetch('/shares.rss.xml');
    let text = await response.text();
    let parser = new DOMParser();
    let xml = parser.parseFromString(text, 'text/xml');
    let items = xml.querySelectorAll('item');
    items.forEach(item => {
      let title = item.querySelector('title').textContent;
      let link = item.querySelector('link').textContent;
      let pubDate = item.querySelector('pubDate').textContent;
      let date = new Date(pubDate).toISOString().split('T')[0];
      this.feedItems.push({title, link, date});
    });
  }
};
</script>
