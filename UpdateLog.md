# Update Log

## v0.4.0-decoupled

### Added

- new `content/` content source structure
  - `content/posts/`
  - `content/chatters/`
  - `content/moments/`
  - `content/pages/`
  - `content/config/`
- new loader layer under `YhBlogs/lib/content/*`
- runtime site config overlay support via `content/config/site.json`
- architecture / schema / migration documentation under `docs/`

### Changed

- homepage now reads from the new content layer
- post detail now reads from the new content layer
- chatter list/detail now read from the new content layer
- about page now reads from the new content layer
- moments page now reads from the new content layer
- timeline page now reads from the new content layer
- tree / creative workshop page now reads from the new content layer

### Deprecated

- `my-blog-manager` is no longer the recommended main workflow
- `update.py` / `update.bat` are no longer treated as the primary maintenance path
- local manager-driven GitHub sync is no longer the recommended publishing path

### Notes

This branch keeps a number of legacy files and directories for compatibility/reference, but the main maintenance path is now:

- edit content under `content/`
- use Git for versioning
- use standard Next.js build/deploy workflow
