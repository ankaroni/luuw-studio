/* Repeatable build using Tailwind CSS v4. Requires npm install tailwindcss.
   Run: node build-css.js */
const fs = require('node:fs');
const path = require('node:path');
const tailwind = require('tailwindcss');
const { createRequire } = require('node:module');
const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
// Class tokens are literal in HTML; dynamic runtime classes must be added here if needed.
const candidates = new Set();
const classPattern = /\bclass\s*=\s*["']([^"']*)["']/g;
let match;
while ((match = classPattern.exec(html))) {
  for (const cls of match[1].split(/\s+/)) if (cls) candidates.add(cls);
}
(async () => {
  const css = fs.readFileSync(path.join(root, 'tailwind.input.css'), 'utf8');
  const tailwindBase = path.dirname(require.resolve('tailwindcss/package.json'));
  const { build } = await tailwind.compile(css, {
    base: root,
    loadStylesheet: async (id, base) => {
      const f = id === 'tailwindcss' ? path.join(tailwindBase, 'index.css') : path.resolve(base, id);
      return { content: fs.readFileSync(f, 'utf8'), base: path.dirname(f) };
    }
  });
  const result = build(Array.from(candidates));
  fs.writeFileSync(path.join(root, 'styles.css'), result);
  console.log(`Built ${path.join(root, 'styles.css')} (${candidates.size} utility candidates, ${result.length} bytes)`);
})().catch(err => { console.error(err); process.exit(1); });
