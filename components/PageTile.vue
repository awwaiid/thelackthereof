<template>
  <div class="bg-white card-container">
    <div class="flex flex-row border-b-2">
      <div class="flex justify-between w-full">
        <NuxtLink :to="page.path">
          <div class="flex flex-col">
            <div class="font-bold" style="font-variant: small-caps" v-html="cleanTitle(page.title)"></div>
            <div class="text-xs">
              <span>{{ shortDate(page.createdAt) }}</span>
              <span v-if="shortDate(page.createdAt) != shortDate(page.updatedAt)">
                → {{ shortDate(page.updatedAt) }}
              </span>
            </div>
          </div>
        </NuxtLink>

        <div class="text-right text-xs text-slate-400">
          <div v-for="tag in page.tags" :key="tag">
            <NuxtLink class="tag pl-2 pr-2 ml-2" :to="'/tag/' + tag">{{ tag }}</NuxtLink>
          </div>
        </div>

      </div>
    </div>

  <NuxtLink :to="page.path">
    <div class="m-2 flex flex-col">
      <div v-if="page.image && !previewHasImage" class="basis-1/3 pb-2 flex justify-center">
        <img class="w-max max-h-40" :src="imageUrl(page.image)">
      </div>
      <div class="basis-2/3 grow mb-4">
        <!-- Render formatted preview if body exists -->
        <div v-if="previewPage" class="prose prose-sm prose-slate max-w-none preview-content">
          <ContentRenderer :value="previewPage">
            <template #empty>
              <p>{{ page.description }}</p>
            </template>
          </ContentRenderer>
        </div>
        <!-- Fallback to plain description -->
        <div v-else>{{ page.description }}</div>
      </div>
    </div>
  </NuxtLink>
  </div>
</template>

<script>
export default {
  props: [
    "page"
  ],
  computed: {
    previewPage() {
      if (!this.page?.body?.value || !Array.isArray(this.page.body.value)) {
        return null;
      }

      // Extract first 3 nodes from body
      const limitedNodes = this.page.body.value.slice(0, 3);

      // Return modified page object with truncated body
      return {
        ...this.page,
        body: {
          type: 'minimark',
          value: limitedNodes
        }
      };
    },
    previewHasImage() {
      if (!this.previewPage?.body?.value) {
        return false;
      }

      // Recursively check if any node is or contains an image
      const hasImageInNode = (node) => {
        if (!node) return false;

        // Check if this node is an image
        if (Array.isArray(node) && node[0] === 'img') {
          return true;
        }

        // Check if this node is a paragraph or other container with children
        if (Array.isArray(node)) {
          // Skip first two elements (tag name and attributes)
          const children = node.slice(2);
          return children.some(child => hasImageInNode(child));
        }

        return false;
      };

      // Check all nodes in the preview
      return this.previewPage.body.value.some(node => hasImageInNode(node));
    }
  },
  methods: {
    cleanTitle(value) {
      return value
        ?.replace(/_/g, ' ')
        ?.replace(/TLT - /, '')
        ?.replace(/\d\d\d\d[.-]\d\d[.-]\d\d - /, '')
        ?.replace(/ - /g, "<br/>");
    },
    shortDate(timestamp) {
      if(!timestamp) {
        return "";
      }
      return timestamp.replace(/(\d+-\d+-\d+).*/, "$1");
    },
    imageUrl(imagePath) {
      // If it's already an absolute URL, return as-is
      if (imagePath?.match(/^https?:\/\//)) {
        return imagePath;
      }
      // Use IPX image handler (same as ContentRenderer does)
      // The /_ipx/_/ prefix tells Nuxt Image to process the image from the content dir
      return imagePath ? `/_ipx/_/${imagePath}` : '';
    }
  }
};
</script>

<style scoped>
.tag {
  /*background-color: rgb(199 191 176);*/
  /* background-color: #888;
  color: rgb(199 191 176); */
}

.card-container {
  position: relative;
  max-height: 16rem;
  overflow: hidden;
}

/* Gradient fade at bottom of card */
.card-container::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3em;
  background: linear-gradient(to bottom, transparent, white);
  pointer-events: none;
}

/* Ensure media scales properly */
.preview-content :deep(img),
.preview-content :deep(audio),
.preview-content :deep(iframe) {
  max-width: 100%;
  height: auto;
}

/* Tighter spacing for previews */
.preview-content :deep(p) {
  margin-bottom: 0.5rem;
}

.preview-content :deep(h1),
.preview-content :deep(h2),
.preview-content :deep(h3) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
