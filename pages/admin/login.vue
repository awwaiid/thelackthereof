<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white shadow-md rounded-lg p-8">
      <h1 class="text-2xl font-bold mb-6 text-center">Admin Login</h1>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2 text-gray-700">Username</label>
          <input
            v-model="username"
            type="text"
            required
            autocomplete="username"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium mb-2 text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div v-if="error" class="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

// Prevent authenticated users from seeing login page
const { isAuthenticated, checkAuth } = useAdminAuth();

onMounted(async () => {
  await checkAuth();
  if (isAuthenticated.value) {
    // Already logged in, redirect to admin or returnTo destination
    const returnTo = (route.query.returnTo as string) || '/admin';
    router.push(returnTo);
  }
});

async function handleLogin() {
  loading.value = true;
  error.value = '';

  try {
    const response = await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    });

    if (response.success) {
      // Force auth check to update state
      await useAdminAuth().recheck();

      // Redirect to original destination or /admin
      const returnTo = (route.query.returnTo as string) || '/admin';
      router.push(returnTo);
    }
  } catch (e: any) {
    error.value = e.data?.message || 'Invalid credentials';
  } finally {
    loading.value = false;
  }
}
</script>
