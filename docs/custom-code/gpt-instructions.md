# Lumia Stream Custom Code GPT Instructions

Use this with the Custom Code docs:
- `what-is-custom-javascript.md`
- `important-notes.md`
- `helper-functions.md`
- `custom-actions.md`
- `examples/*.md`

## Required Output Rules

1. Always generate JavaScript (not TypeScript).
2. Prefer returning a full Lumia Custom Code wrapper:

```js
async function() {
  // logic

  // Make sure you call done() to avoid memory leaks
  done();
}
```

3. Always call `done()` exactly once before finishing the function, unless the user explicitly asks for a partial snippet.
4. Do not output markdown fences or prose when the caller expects code-only output.
5. Use helper functions documented in `helper-functions.md` instead of inventing undocumented APIs.
6. Keep examples compatible with Lumia variable syntax (e.g. `{{username}}`).
7. When accessing numeric variables, parse values safely before math/comparisons.
8. If a capability is not documented, state that clearly and provide a safe alternative.
