<template>
  <div class="flex flex-wrap justify-start gap-2 mb-2">
    <NuxtLink class="tag rounded-full border border-2 pl-2 pr-2 text-black border-black" :class="isAll" to="/">all</NuxtLink>
    <NuxtLink class="tag rounded-full border border-2 pl-2 pr-2 text-black border-black" :class="isBlog" to="/tag/blog">blog</NuxtLink>
    <NuxtLink class="tag rounded-full border border-2 pl-2 pr-2 text-black border-black" :class="isMusic" to="/tag/music">music</NuxtLink>
    <!-- <NuxtLink class="tag rounded-full border border-2 pl-2 pr-2 text-black border-black" :class="isCode" to="/tag/code">code</NuxtLink> -->
    <NuxtLink class="tag rounded-full border border-2 pl-2 pr-2 text-black border-black" :class="isProject" to="/tag/project">project</NuxtLink>
    <NuxtLink class="tag rounded-full border border-2 pl-2 pr-2 text-black border-black" :class="isRecurseCenter" to="/tag/recurse-center">recurse-center</NuxtLink>
    <NuxtLink class="tag rounded-full border border-2 pl-2 pr-2 text-black border-black" :class="isRubyforgood" to="/tag/rubyforgood">rubyforgood</NuxtLink>
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
  const isRecurseCenter = computed(() => ({ 'text-white bg-black': route.path === '/tag/recurse-center' }));
  const isRubyforgood = computed(() => ({ 'text-white bg-black': route.path === '/tag/rubyforgood' }));
</script>
