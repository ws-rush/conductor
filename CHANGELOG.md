# Changelog

## [0.2.0](https://github.com/ws-rush/conductor/releases) (2026-01-17)

### Changed

- **BREAKING:** Migrate from Gemini CLI extension to Claude Code plugin
- Convert all command definitions from TOML to Markdown with YAML frontmatter
- Rename `GEMINI.md` context file to `CLAUDE.md`
- Update plugin manifest structure for Claude Code compatibility

### Added

- Fork note in README acknowledging original gemini-cli-extensions/conductor project
- `.claude-plugin/` directory with `plugin.json` manifest
- All 5 commands now use Markdown format:
  - `/conductor:setup`
  - `/conductor:newTrack`
  - `/conductor:implement`
  - `/conductor:status`
  - `/conductor:revert`

### Removed

- All `.toml` command files (replaced by `.md` files)
- `gemini-extension.json` (replaced by `.claude-plugin/plugin.json`)
- Gemini-specific model selection instruction ("flash" model)

### Fixed

- Update template path references from `~/.gemini/extensions/conductor/templates/` to `../../templates/`
- Update ignore file references from `.geminiignore` to `.claudeignore`
- Update release-please configuration to track `.claude-plugin/plugin.json`
