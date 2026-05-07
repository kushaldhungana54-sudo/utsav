import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (path: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (!dirPath.includes('node_modules') && !dirPath.includes('.git')) {
        walkDir(dirPath, callback);
      }
    } else {
      if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts') || dirPath.endsWith('.html') || dirPath.endsWith('.json')) {
        callback(dirPath);
      }
    }
  });
}

walkDir('./', (filePath) => {
  if (filePath.endsWith('package-lock.json')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  content = content.replace(/Utsav Events/g, 'Utsav Events');
  content = content.replace(/UTSAV EVENTS/g, 'UTSAV EVENTS');
  content = content.replace(/Utsav Pro/g, 'Utsav Pro');
  content = content.replace(/UTSAV PRO/g, 'UTSAV PRO');
  content = content.replace(/Utsav Manager/g, 'Utsav Manager');
  content = content.replace(/utsav events/g, 'utsav events');
  content = content.replace(/Utsav/g, 'Utsav');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Renamed Utsav -> Utsav in ${filePath}`);
  }
});
