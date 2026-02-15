# Changelog

## [0.3.0](https://github.com/gemini-cli-extensions/conductor/compare/conductor-v0.2.0...conductor-v0.3.0) (2026-02-11)


### Features

* add /conductor:review command ([d4749d3](https://github.com/gemini-cli-extensions/conductor/commit/d4749d320ae983a12064488eb4b605529b0841e9))
* add /conductor:review command ([d6e382a](https://github.com/gemini-cli-extensions/conductor/commit/d6e382a980a816339c9ca9904a4744a635af7bd0))
* **conductor:** address review comments to make recommendations more conversational ([8630f35](https://github.com/gemini-cli-extensions/conductor/commit/8630f358f1d4ecf9e6c2815d0c607cf8c49ee3e8))
* **conductor:** make review recommendations more conversational ([44446c6](https://github.com/gemini-cli-extensions/conductor/commit/44446c6338bdc5159fd8d9c7cf4c362e48d34e40))
* **conductor:** make review recommendations more conversational ([ec3dd99](https://github.com/gemini-cli-extensions/conductor/commit/ec3dd996afd98e7c695cc8dee79f3779b8e1d105))
* **conductor:** update review process to commit fixes and update plan ([c26980a](https://github.com/gemini-cli-extensions/conductor/commit/c26980a5b9f952974c8c3cbcd82dc8c3ab2911f9))
* **review:** update review process to commit fixes and update plan ([0d533be](https://github.com/gemini-cli-extensions/conductor/commit/0d533be1c3ebfc07fd04cf8219ddc5964343c24a))


### Bug Fixes

* commit changed conductor files at the end of newTrack ([232c08b](https://github.com/gemini-cli-extensions/conductor/commit/232c08b3c99e362981019a6b8e7ca8de55d78357))
* Commit conductor files at the end of :newTrack ([#94](https://github.com/gemini-cli-extensions/conductor/issues/94)) ([232c08b](https://github.com/gemini-cli-extensions/conductor/commit/232c08b3c99e362981019a6b8e7ca8de55d78357))
* **conductor:** move pre-initialization overview before resume check ([774fb49](https://github.com/gemini-cli-extensions/conductor/commit/774fb49119d1f4d8d87dff22cbc14924fdb02a5b))
* **conductor:** move pre-initialization overview before resume check ([f2b7ba5](https://github.com/gemini-cli-extensions/conductor/commit/f2b7ba5c8963990ad454853692182f9367a099be)), closes [#81](https://github.com/gemini-cli-extensions/conductor/issues/81)
* improve error message when required files are missing in review command ([d61c588](https://github.com/gemini-cli-extensions/conductor/commit/d61c588c6d4adc3393468180d62f13097f589e4c))

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
