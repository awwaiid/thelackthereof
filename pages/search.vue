<template>
  <main>
    Search: <input v-model="search">

    <pre>{{ results }} </pre>
  </main>
</template>

<script lang="ts" setup>
const search  = ref('')

const results = await searchContent(search)
</script>

