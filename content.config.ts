import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        mastodonThread: z.string().optional(),
      })
    })
  }
})
