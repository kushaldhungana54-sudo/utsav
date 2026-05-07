import fs from 'fs';

const files = [
  './src/portals/VendorPortal.tsx',
  './src/portals/GigPortal.tsx',
  './src/portals/LandingPage.tsx',
  './src/portals/GatekeeperPortal.tsx',
  './src/portals/PublicPortal.tsx'
];

for (const path of files) {
  let content = fs.readFileSync(path, 'utf8');
  // If we find 'bg-primary' followed closely by 'text-black' or 'text-[var(--color-secondary)]' on the same line,
  // we change it to 'text-white'
  content = content.replace(/bg-primary([^>]*)text-black/g, 'bg-primary$1text-white');
  content = content.replace(/bg-primary([^>]*)text-\[var\(--color-secondary\)\]/g, 'bg-primary$1text-white');
  
  // Also hover:bg-primary hover:text-black -> hover:bg-primary hover:text-white
  content = content.replace(/hover:bg-primary([^>]*)hover:text-black/g, 'hover:bg-primary$1hover:text-white');
  content = content.replace(/hover:bg-primary([^>]*)hover:text-\[var\(--color-secondary\)\]/g, 'hover:bg-primary$1hover:text-white');

  // Let's do the same for accent and warning (Gold/Orange can sometimes have black text, it's actually fine for Gold and Orange to have dark text)
  // Contrast of Black on #FFC107 is 10.6, which is excellent. Contrast of White on #FFC107 is 1.9, which fails.
  // So bg-accent should use text-black or text-[var(--color-secondary)].
  content = content.replace(/bg-accent([^>]*)text-white/g, 'bg-accent$1text-[var(--color-secondary)]');

  fs.writeFileSync(path, content, 'utf8');
  console.log(`Contrast fixed for ${path}`);
}
