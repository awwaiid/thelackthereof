<template>
  <div class="flex flex-col h-svh">
    <!-- Sticky Compact Header -->
    <div class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm px-3 py-2 flex justify-between items-center flex-shrink-0">
      <NuxtLink to="/admin" class="text-sm text-blue-600 hover:text-blue-800">
        ← Back
      </NuxtLink>
      <div class="flex items-center gap-2 text-xs text-gray-600 truncate">
        <span class="truncate max-w-[200px]">{{ frontmatter.title || 'Untitled' }}</span>
        <span v-if="lastSaved" class="text-gray-400">{{ lastSaved }}</span>
      </div>
      <button
        @click="save"
        :disabled="saving"
        class="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {{ saving ? '...' : 'Save' }}
      </button>
    </div>

    <!-- Mobile Tab Switcher -->
    <div class="lg:hidden border-b border-gray-200 flex-shrink-0">
      <div class="flex">
        <button
          @click="activeTab = 'meta'"
          :class="[
            'flex-1 py-2 text-sm text-center',
            activeTab === 'meta'
              ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
              : 'text-gray-500'
          ]"
        >
          Meta
        </button>
        <button
          @click="activeTab = 'edit'"
          :class="[
            'flex-1 py-2 text-sm text-center',
            activeTab === 'edit'
              ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
              : 'text-gray-500'
          ]"
        >
          Edit
        </button>
        <button
          @click="activeTab = 'preview'"
          :class="[
            'flex-1 py-2 text-sm text-center',
            activeTab === 'preview'
              ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
              : 'text-gray-500'
          ]"
        >
          Preview
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 overflow-hidden p-4">
      <!-- Desktop: Show metadata sidebar + editor/preview -->
      <div class="hidden lg:grid lg:grid-cols-[300px_1fr_1fr] lg:gap-4 h-full">
        <!-- Metadata Sidebar (Desktop) -->
        <div class="bg-white rounded-md shadow flex flex-col min-h-0">
          <div class="p-3 border-b border-gray-200 flex-shrink-0">
            <h3 class="text-sm font-semibold">Metadata</h3>
          </div>
          <div class="flex-1 overflow-y-auto p-3">
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Title</label>
                <input
                  v-model="frontmatter.title"
                  type="text"
                  class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Tags</label>
                <input
                  v-model="tagsString"
                  type="text"
                  class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Image</label>
                <input
                  v-model="frontmatter.image"
                  type="text"
                  placeholder="img/filename.png"
                  class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Created</label>
                <input
                  v-model="createdAtDate"
                  type="text"
                  placeholder="2025-01-15"
                  class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Updated</label>
                <input
                  v-model="updatedAtDate"
                  type="text"
                  placeholder="2025-01-15"
                  class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="flex items-center">
                <input
                  v-model="frontmatter.draft"
                  type="checkbox"
                  id="draft"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="draft" class="ml-2 block text-xs text-gray-700">
                  Draft
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Markdown Editor (Desktop) -->
        <div class="bg-white rounded-md shadow flex flex-col min-h-0">
          <div class="p-3 border-b border-gray-200 flex-shrink-0">
            <h3 class="text-sm font-semibold">Markdown Editor</h3>
          </div>
          <div class="flex-1 overflow-hidden p-3 min-h-0">
            <textarea
              ref="editorTextarea"
              v-model="content"
              @paste="handlePaste"
              @keydown="handleKeydown"
              class="w-full h-full font-mono text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              spellcheck="false"
            ></textarea>
          </div>
        </div>

        <!-- Preview (Desktop) -->
        <div class="bg-white rounded-md shadow flex flex-col min-h-0">
          <div class="p-3 border-b border-gray-200 flex-shrink-0">
            <h3 class="text-sm font-semibold">Preview</h3>
          </div>
          <div class="flex-1 overflow-y-auto p-3 min-h-0">
            <AdminPreview ref="previewComponent" :frontmatter="frontmatter" :content="content" />
          </div>
        </div>
      </div>

      <!-- Mobile: Show active tab content only -->
      <div class="lg:hidden h-full">
        <!-- Meta Tab Content (Mobile) -->
        <div v-if="activeTab === 'meta'" class="h-full overflow-y-auto p-4">
          <div class="bg-white rounded-md shadow p-4">
            <h3 class="text-lg font-semibold mb-4">Metadata</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  v-model="frontmatter.title"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  v-model="tagsString"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input
                  v-model="frontmatter.image"
                  type="text"
                  placeholder="img/filename.png"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Created</label>
                <input
                  v-model="createdAtDate"
                  type="text"
                  placeholder="2025-01-15"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Updated</label>
                <input
                  v-model="updatedAtDate"
                  type="text"
                  placeholder="2025-01-15"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="flex items-center">
                <input
                  v-model="frontmatter.draft"
                  type="checkbox"
                  id="draft-mobile"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="draft-mobile" class="ml-2 block text-sm text-gray-700">
                  Draft
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Tab Content (Mobile) -->
        <div v-if="activeTab === 'edit'" class="h-full p-2 flex flex-col">
          <div class="bg-white rounded-md shadow flex flex-col flex-1">
            <div class="flex-1 overflow-hidden p-2">
              <textarea
                ref="editorTextarea"
                v-model="content"
                @paste="handlePaste"
                @keydown="handleKeydown"
                class="w-full h-full font-mono text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                spellcheck="false"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Preview Tab Content (Mobile) -->
        <div v-if="activeTab === 'preview'" class="h-full overflow-auto p-2">
          <div class="bg-white rounded-md shadow p-3">
            <AdminPreview :frontmatter="frontmatter" :content="content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  initialFrontmatter?: any;
  initialContent?: string;
  isNew?: boolean;
  isBlog?: boolean;
  filename?: string;
}>();

const emit = defineEmits(['saved']);

// Helper function to convert ISO date to YYYY-MM-DD
function toDateInputValue(dateString: string | undefined): string {
  if (!dateString) return new Date().toISOString().split('T')[0];
  // Handle both ISO timestamps and YYYY-MM-DD format
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return new Date().toISOString().split('T')[0];
  return date.toISOString().split('T')[0];
}

const frontmatter = ref(props.initialFrontmatter || {
  title: '',
  tags: [],
  image: '',
  createdAt: new Date().toISOString().split('T')[0],
  updatedAt: new Date().toISOString().split('T')[0],
  draft: true
});

const content = ref(props.initialContent || '');
const tagsString = ref((frontmatter.value.tags || []).join(', '));
const saving = ref(false);
const lastSaved = ref('');
const activeTab = ref('meta');
const editorTextarea = ref<HTMLTextAreaElement>();
const previewComponent = ref<any>();

// Date fields that work with date inputs
const createdAtDate = computed({
  get: () => toDateInputValue(frontmatter.value.createdAt),
  set: (value) => { frontmatter.value.createdAt = value; }
});

const updatedAtDate = computed({
  get: () => toDateInputValue(frontmatter.value.updatedAt),
  set: (value) => { frontmatter.value.updatedAt = value; }
});

// Watch tagsString and update frontmatter.tags
watch(tagsString, (newValue) => {
  frontmatter.value.tags = newValue
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0);
});

async function save() {
  saving.value = true;
  try {
    const response = await $fetch('/api/admin/file', {
      method: 'POST',
      body: {
        path: props.filename,
        frontmatter: frontmatter.value,
        content: content.value,
        isNew: props.isNew,
        isBlog: props.isBlog
      }
    });

    lastSaved.value = new Date().toLocaleTimeString();
    emit('saved', response);
  } catch (error: any) {
    alert('Error saving file: ' + (error.data?.message || error.message));
  } finally {
    saving.value = false;
  }
}

async function handlePaste(event: ClipboardEvent) {
  const items = event.clipboardData?.items;
  if (!items) return;

  for (const item of items) {
    if (item.type.startsWith('image/')) {
      event.preventDefault();

      const file = item.getAsFile();
      if (!file) continue;

      // Generate default name with timestamp: YYYY-MM-DD-HH-MM-SS
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const defaultName = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;

      // Get file extension from original file
      const extension = file.name.split('.').pop() || 'png';

      // Prompt for image name
      const imageName = prompt('Enter a name for the image:', defaultName);
      if (!imageName) return; // User cancelled

      // Convert to lowercase
      const imageNameLower = imageName.toLowerCase();

      try {
        // Create a new file with the custom name
        const customFile = new File([file], `${imageNameLower}.${extension}`, { type: file.type });

        const formData = new FormData();
        formData.append('file', customFile);

        const response: any = await $fetch('/api/admin/upload', {
          method: 'POST',
          body: formData
        });

        // Insert markdown image syntax at cursor with the name as alt text
        const textarea = editorTextarea.value;
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const markdown = `![${imageNameLower}](${response.url})`;
          content.value = content.value.substring(0, start) + markdown + content.value.substring(end);

          // Move cursor after inserted text
          nextTick(() => {
            textarea.selectionStart = textarea.selectionEnd = start + markdown.length;
            textarea.focus();
          });
        }
      } catch (error: any) {
        alert('Error uploading image: ' + (error.data?.message || error.message));
      }

      break;
    }
  }
}

function handleKeydown(event: KeyboardEvent) {
  // Save on Ctrl+S or Cmd+S
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault();
    save();
  }

  // Sync preview scroll on arrow key navigation (desktop only)
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key)) {
    throttledSyncScroll();
  }
}

// Scroll sync: sync preview scroll to cursor position (desktop only)
function syncPreviewScroll() {
  if (!editorTextarea.value || !previewComponent.value?.previewContainer) return;

  const textarea = editorTextarea.value;
  const previewContainer = previewComponent.value.previewContainer;

  // Get cursor line number
  const textBeforeCursor = textarea.value.substring(0, textarea.selectionStart);
  const cursorLine = textBeforeCursor.split('\n').length;
  const totalLines = textarea.value.split('\n').length;

  // Calculate percentage
  const percentage = Math.max(0, Math.min(1, cursorLine / totalLines));

  // Scroll preview smoothly
  const maxScroll = previewContainer.scrollHeight - previewContainer.clientHeight;
  const targetScroll = percentage * maxScroll;

  previewContainer.scrollTo({
    top: targetScroll,
    behavior: 'smooth'
  });
}

// Throttle scroll sync to avoid excessive updates
let scrollSyncTimeout: NodeJS.Timeout | null = null;
function throttledSyncScroll() {
  if (scrollSyncTimeout) {
    clearTimeout(scrollSyncTimeout);
  }
  scrollSyncTimeout = setTimeout(syncPreviewScroll, 150);
}

// Set up event listeners for cursor movement
onMounted(() => {
  if (editorTextarea.value) {
    // Sync on click (cursor repositioning)
    editorTextarea.value.addEventListener('click', throttledSyncScroll);
  }
});

// Cleanup
onUnmounted(() => {
  if (scrollSyncTimeout) {
    clearTimeout(scrollSyncTimeout);
  }
});
</script>
