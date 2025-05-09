const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const folderPath = './images'; // Change this to your folder path

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('❌ Error reading the folder:', err);
    return;
  }

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(folderPath, file);

    if (['.webp', '.jpg', '.jpeg'].includes(ext)) {
      const outputFileName = path.basename(file, ext) + '.webp';
      const outputPath = path.join(folderPath, outputFileName);

      sharp(filePath)
        .webp({ quality: 80 })
        .toFile(outputPath)
        .then(() => {
          fs.unlink(filePath, unlinkErr => {
            if (unlinkErr) {
              console.error(`❌ Error deleting ${file}:`, unlinkErr);
            } else {
              console.log(`✅ Converted to WebP and deleted original: ${file}`);
            }
          });
        })
        .catch(convertErr => {
          console.error(`❌ Error converting ${file}:`, convertErr);
        });
    }
  });
});
