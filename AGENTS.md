# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "The Lack Thereof" (thelackthereof.org), a personal blog/wiki built with Nuxt 3. The site contains markdown content that was originally written in Oddmuse wiki format and is converted at build time to standard markdown.

## Development Commands

### Basic Development
- `npm install` - Install dependencies
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run generate` - Generate static site

### Deployment
- `npm run deploy-static` - Generate static site and sync to server via unison
- `npm run deploy-dynamic` - Sync to server and restart Docker container

## Architecture

### Content Processing Pipeline

The site uses a custom markdown processing pipeline to convert legacy Oddmuse wiki syntax:

1. **Content Input**: Markdown files in `content/` directory (originally Oddmuse format)
2. **Pre-processing Hook**: `server/plugins/content.ts` registers a `beforeParse` hook
3. **Transformation**: `lib/tweakMarkdown.js` transforms Oddmuse syntax to standard markdown:
   - Headers: `= Header =` → `# Header`
   - Lists: `** item` → `  * item`
   - Links: `[[Page Name]]` → `[Page Name](/page-name)`
   - External links: `[[http://url | text]]` → `[text](http://url)`
   - Images: `img:filename` → `<img src="/img/filename" />`
   - Audio: `audio:filename` → `<audio>` player with download link
   - YouTube: `youtube:id` → embedded iframe
   - Dictionary format: `;term: definition` → bold term with definition
4. **Rendering**: Nuxt Content processes transformed markdown with syntax highlighting

### Routing Structure

- **`pages/index.vue`**: Homepage with paginated list of posts, tag navigation, and search
- **`pages/[slug].vue`**: Dynamic page renderer for individual markdown files
  - Includes legacy route support (underscore to dash conversion)
  - Displays creation/edit dates
  - Optional Mastodon thread embedding
- **`pages/tag/[tag].vue`**: Tag-based filtering

### RSS Generation

- **`server/routes/rss.xml.ts`**: Generates RSS feed from content
  - Converts HAST to HTML using `hast-util-to-html`
  - Makes URLs absolute (relative paths → https://thelackthereof.org/...)
  - Supports tag filtering via query params
- **`server/routes/shares.rss.xml.ts`**: Separate RSS feed for shared content

### Key Components

- **`TagNavBar.vue`**: Navigation bar for filtering by tags
- **`PageTileList.vue`**: Grid display of page tiles
- **`PageTile.vue`**: Individual page preview card
- **`MastodonThread.vue`**: Embeds Mastodon discussion threads

### Nuxt Configuration Highlights

**Modules**: @nuxt/content, @nuxtjs/tailwindcss, @nuxtjs/google-fonts, nuxt-delay-hydration, @nuxt/image, nuxt-gtag

**Content Features**:
- Syntax highlighting (GitHub Light/Dark/Sepia themes)
- PlantUML diagram support via remark plugin
- Mermaid diagram support via @d0rich/nuxt-content-mermaid
- Hard line breaks via remark-breaks
- Content search (experimental)

**Image Processing**: Uses @nuxt/image with IPX for optimization, images stored in `content/` directory

**Styling**: Tailwind CSS with custom typography settings and Google Fonts (Nunito, Atkinson Hyperlegible)

### Content Metadata

Markdown files should include frontmatter:
- `title`: Page title (may include hyphens for line breaks)
- `createdAt`: Creation date (YYYY-MM-DD format)
- `updatedAt`: Last updated date
- `tags`: Array of tags for categorization
- `draft`: Set to true to exclude from listings
- `description`: Brief description for RSS
- `mastodonThread`: URL to Mastodon discussion (optional)

### Admin Interface

The site includes a browser-based admin interface at `/admin` for editing content:

**Authentication**:
- HTTP Basic Auth protects both `/admin` pages and `/api/admin/*` endpoints
- Credentials configured via environment variables: `ADMIN_USER` and `ADMIN_PASSWORD`
- Set in `.env` file or server environment (see `.env.example`)

**Features**:
- List all blog posts and pages with search/filter
- Create new blog posts (with date prefix: `TLT - YYYY.MM.DD - Title.md`)
- Create new regular pages (simple: `Title.md`)
- Edit frontmatter (title, tags, dates, draft status) via form fields
- Side-by-side markdown editor and live preview (desktop)
- Tab-based editor/preview switcher (mobile)
- Paste images directly into editor - auto-uploads to `content/img/` and inserts markdown
- Live preview uses full Nuxt Content pipeline (PlantUML, Mermaid, Oddmuse transforms)
- Direct filesystem writes - changes appear immediately (except drafts)
- Keyboard shortcut: Ctrl+S/Cmd+S to save

**Architecture**:
- Pages: `pages/admin/index.vue` (file list), `pages/admin/edit.vue` (editor)
- Components: `components/admin/FileList.vue`, `components/admin/Editor.vue`, `components/admin/Preview.vue`
- API: `server/api/admin/{files.get, file.get, file.post, upload.post, preview.post}.ts`
- Auth: `server/middleware/admin-auth.ts`
- Preview: Writes temp file to `content/_admin-preview.md`, queries via Nuxt Content, renders, deletes
- Config: Route rules exclude `/admin/**` from prerendering; content ignores `_admin-preview.md`

See **ADMIN-PLAN.md** for detailed documentation.

### Deployment

The application can be deployed as:
1. **Static site**: Via `npm run generate` (prerendered routes configured in nuxt.config.ts)
2. **Dynamic Node.js app**: Via Docker using the Dockerfile (Node 20 with libvips for image processing)

**Production Server Setup** (see `../docker-compose.yml`):
- **web-nuxt** service: Runs the Nuxt app
  - Built from `thelackthereof/` context using the Dockerfile
  - Volume mounts: `./thelackthereof:/app` with anonymous `/app/node_modules`
  - Listens on port 3000 (internal)
  - Uses `npm run server-start` (installs deps, builds, and previews)
- **nginx-ssl-proxy** service: SSL termination and reverse proxy
  - Proxies to `web-nuxt:3000` (set via `UPSTREAM` env var)
  - Handles SSL for multiple domains via Let's Encrypt
  - Serves static files from `.:/tlt` and `./docs:/docs` volumes
  - Exposes ports 80 and 443
- **Deployment command**: `npm run deploy-dynamic` syncs code via unison and runs `docker compose up -d --build web-nuxt` on remote server
