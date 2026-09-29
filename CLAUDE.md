@AGENTS.md

## Project rules

- JavaScript only — no TypeScript files (`.ts`/`.tsx`), no `tsconfig.json`.
- Never push. The user pushes.
- Stage files by explicit path only — never `git add -A` or `git add .`.
- Never commit anything under `prompts/` (design reference, local only).
- Work only on the branch the user names; ask before creating, renaming or switching branches.
- Font sizes and text-related spacing in `rem`, never `px`, so the header's text-size toggle scales them.
- Content max width comes from the shared `Container` component (`src/components/Container.jsx`).
- Every interactive element must be keyboard operable with a visible focus state (WCAG 2.2 AA).
