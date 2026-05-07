import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (path: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      if (!dirPath.includes('node_modules') && !dirPath.includes('.git')) {
        walkDir(dirPath, callback);
      }
    } else {
      if (dirPath.endsWith('.tsx')) {
        callback(dirPath);
      }
    }
  });
}

walkDir('./src', (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  content = content.replace(/bg-white/g, 'bg-[var(--surface)]');
  content = content.replace(/bg-gray-50/g, 'bg-[var(--color-bg-light)]');
  content = content.replace(/bg-gray-100/g, 'bg-[var(--border)]');
  content = content.replace(/border-gray-100/g, 'border-[var(--border)]');
  content = content.replace(/border-gray-200/g, 'border-[var(--border)]');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated theme classes in ${filePath}`);
  }
});
