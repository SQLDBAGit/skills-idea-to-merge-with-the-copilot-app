# Copilot instructions

Project context Copilot should apply to every session in this repository.

## Stack

- Framework: Astro (static output).
- Language: TypeScript.
- Styling: plain CSS in the base layout.

## Conventions

- Keep components small and focused.
- Prefer semantic HTML and accessible markup.
- Do not close, or add closing keywords for, the exercise walkthrough issue (issue #1) in any pull request. The exercise's GitHub Actions workflows manage that issue. When you open a pull request for app work, link only the specific app work-item issue you are implementing.

## Persistence and hydration rules

- Persist all bookmarks in browser `localStorage`. Each bookmark must include its original URL and a locally generated short slug.
- Access browser-only APIs such as `localStorage` only in Astro client-side code behind a `client:load` directive or in an inline `<script>`, never during server-side rendering.
