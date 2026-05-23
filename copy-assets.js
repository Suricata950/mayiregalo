const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, 'assets');
const destDir = path.resolve(__dirname, 'dist', 'assets');

function copyDirectory(source, destination) {
  if (!fs.existsSync(source)) {
    return;
  }

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  for (const item of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, item.name);
    const destinationPath = path.join(destination, item.name);

    if (item.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

copyDirectory(srcDir, destDir);
console.log('Static assets copied to dist/assets');
