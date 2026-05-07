import fs from 'fs';

const files = [
  './src/portals/VendorPortal.tsx',
  './src/portals/GigPortal.tsx',
];

const replacements = [
  [/bg-\[\#181611\](\/\d+)?/g, 'bg-[var(--color-bg-light)]$1'],
  [/bg-\[\#0F1115\](\/\d+)?/g, 'bg-[var(--color-bg-light)]$1'],
  [/bg-black(\/\d+)?/g, 'bg-gray-100'],
  [/bg-white\/5/g, 'bg-white'],
  [/bg-white\/10/g, 'bg-gray-50'],
  [/border-white\/5/g, 'border-gray-100'],
  [/border-white\/10/g, 'border-gray-200'],
  [/border-white\/20/g, 'border-gray-300'],
  [/text-white\/30/g, 'text-gray-400'],
  [/text-white\/40/g, 'text-gray-500'],
  [/text-white\/50/g, 'text-gray-500'],
  [/text-white\/60/g, 'text-gray-600'],
  [/text-white\/80/g, 'text-gray-700'],
  [/text-white/g, 'text-[var(--color-secondary)]'],
  [/from-black(\/\d+)?/g, 'from-gray-100$1'],
  [/text-slate-400/g, 'text-gray-500'],
  [/bg-\[\#1A1D25\](\/\d+)?/g, 'bg-white$1'],
  [/shadow-black/g, 'shadow-gray-200'],
];

for (const path of files) {
  let content = fs.readFileSync(path, 'utf8');
  for (const [regex, replacement] of replacements) {
    content = content.replace(regex, replacement as string);
  }
  // Let's also fix selection:bg-accent/30 -> selection:bg-primary/30 to align with our theming
  content = content.replace(/selection:bg-accent\/30/g, 'selection:bg-primary/30');

  // Let's protect explicitly styled white buttons that became text-[var(--color-secondary)]
  // e.g. text-[var(--color-secondary)] inside bg-[var(--color-primary)] if there are any.
  
  fs.writeFileSync(path, content, 'utf8');
  console.log(`Updated ${path}`);
}
