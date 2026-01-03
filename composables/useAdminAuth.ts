import { computed } from 'vue';

export const useAdminAuth = () => {
  // Shared state across all component instances
  const authState = useState('adminAuth', () => ({
    checked: false,
    authenticated: false,
    loading: false,
    error: null as Error | null
  }));

  // Check if user is authenticated
  const checkAuth = async () => {
    // Only run on client side
    if (process.server) {
      return;
    }

    // Don't check again if already checked
    if (authState.value.checked) {
      return;
    }

    authState.value.loading = true;
    authState.value.error = null;

    try {
      const response = await $fetch('/api/admin/auth-check', {
        method: 'GET',
      });

      authState.value.authenticated = response?.authenticated === true;
      authState.value.checked = true;
    } catch (error: any) {
      // 401 is expected for non-authenticated users, don't log as error
      if (error?.statusCode !== 401) {
        console.error('[useAdminAuth] Error checking auth:', error);
      }
      authState.value.error = error as Error;
      authState.value.authenticated = false;
      authState.value.checked = true;
    } finally {
      authState.value.loading = false;
    }
  };

  // Computed properties for easy access
  const isAuthenticated = computed(() => authState.value.authenticated);
  const isLoading = computed(() => authState.value.loading);
  const hasError = computed(() => authState.value.error !== null);

  // Force recheck (useful if auth state changes)
  const recheck = async () => {
    authState.value.checked = false;
    await checkAuth();
  };

  return {
    isAuthenticated,
    isLoading,
    hasError,
    checkAuth,
    recheck
  };
};
