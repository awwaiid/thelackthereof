<template>
  <div class="flex justify-start mb-2">
    <NuxtLink class="tag rounded-full border border-2 pl-2 pr-2 ml-2 text-black border-black" :class="isAll" to="/">all</NuxtLink>
    <NuxtLink class="tag rounded-full border border-2 pl-2 pr-2 ml-2 text-black border-black" :class="isBlog" to="/tag/blog">blog</NuxtLink>
    <NuxtLink class="tag rounded-full border border-2 pl-2 pr-2 ml-2 text-black border-black" :class="isMusic" to="/tag/music">music</NuxtLink>
    <!-- <NuxtLink class="tag rounded-full border border-2 pl-2 pr-2 ml-2 text-black border-black" :class="isCode" to="/tag/code">code</NuxtLink> -->
    <NuxtLink class="tag rounded-full border border-2 pl-2 pr-2 ml-2 text-black border-black" :class="isProject" to="/tag/project">project</NuxtLink>
  </div>
</template>

<script setup>
  const route = useRoute();

  // This is a horrible way to do this haha
  const isAll = computed(() => ({ 'text-white bg-black': route.path === '/' }));
  const isBlog = computed(() => ({ 'text-white bg-black': route.path === '/tag/blog' }));
  const isMusic = computed(() => ({ 'text-white bg-black': route.path === '/tag/music' }));
  const isCode = computed(() => ({ 'text-white bg-black': route.path === '/tag/code' }));
  const isProject = computed(() => ({ 'text-white bg-black': route.path === '/tag/project' }));
</script>
