<template>
  <div v-if="feedItems.length === 0">
    <h1>Loading...</h1>
  </div>
  <section v-for="(items, section) in feedItems" :key="section">
    <h3>{{ section }}</h3>
    <p><i>{{ categoryDescriptions[section] }}</i></p>
    <ul>
      <li v-for="item in items" :key="item.link">
        <a :href="item.link">{{ item.title }} ({{ item.date }})</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      feedItems: {},
      categoryDescriptions: {}
    }
  },
  async mounted() {

    this.categoryDescriptions = {
      'Cool stuff': 'Things that are ... you know ... *cool*',
      'Inline dev tools': 'I\'m interested in developer tooling that is integrated into the application itself, or can be used for interactive testing, or things like `binding.pry` that can be dropped inline',
      'ML/AI': 'Things that I find interesting in the world of machine learning and artificial intelligence',
      'Music & Art Making': 'Usually overlapping with code, but not necessarily',
      'Organization, Process, Task&Time': 'Pomodoros?!',
      'Programming learning': 'I like to learn about learning and teaching',
      'WASM Event Horizon': 'The rise of WebAssembly is fascinating ... it is a new target platform on top of everything and may bring my desired "cross-language module re-use" into a practical realm. Be the JVM. Or something.',
      'Blog Inspiration': 'Things that inspire me to write, in theory',
      'Recurse': 'Stuff related to the Recurse Center',
      'Software Engineering / Day Job': 'Things related to the craft of software engineering',
    };

    let response = await fetch('/shares.rss.xml');
    let text = await response.text();
    let parser = new DOMParser();
    let xml = parser.parseFromString(text, 'text/xml');
    let items = xml.querySelectorAll('item');
    items.forEach(item => {
      let fullTitle = item.querySelector('title').textContent;
      console.log(fullTitle);
      let match = fullTitle.match(/\[(.+)\]\s*(.+)/);
      let sectionList = match[1].replace('Software Engineering, Day Job', 'Software Engineering / Day Job');
      let sections = sectionList.split(/,/);
      let title = match[2];
      let link = item.querySelector('link').textContent;
      let pubDate = item.querySelector('pubDate').textContent;
      let date = new Date(pubDate).toISOString().split('T')[0];
      sections.forEach(section => {
        this.feedItems[section] = this.feedItems[section] || {};
        this.feedItems[section][title] = {title, link, date};
      });
    });
  }
};
</script>
