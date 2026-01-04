<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">
          The Lack Thereof - Admin
        </h1>
        <button
          @click="handleLogout"
          class="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

async function handleLogout() {
  try {
    await $fetch('/api/admin/logout', { method: 'POST' });
    // Redirect to login page
    router.push('/admin/login');
  } catch (e) {
    console.error('Logout failed:', e);
    // Still redirect to login on error
    router.push('/admin/login');
  }
}
</script>
