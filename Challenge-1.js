const fs = require('fs');
const path = require('path');

// Directory path
const dirPath = path.join(__dirname, 'Files');

// Ensure the directory exists
if (!fs.existsSync(dirPath)) {
  console.error('The directory "Files" does not exist.');
  process.exit(1);
}

// Read the directory
fs.readdir(dirPath, (err, files) => {
  if (err) {
    console.error('Error reading the directory:', err);
    process.exit(1);
  }

  // Filter txt files
  const txtFiles = files.filter(file => path.extname(file) === '.txt');

  if (txtFiles.length === 0) {
    console.log('No txt file exists');
  } else {
    // Read and print content of each txt file
    txtFiles.forEach(file => {
      fs.readFile(path.join(dirPath, file), 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', file, err);
          return;
        }
        console.log(`Content of ${file}: ${data}`);
      });
    });
  }
});
