const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const inputDir = 'images';
const outputDir = 'resized-images';

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Get the list of image files in the input directory
const imageFiles = fs.readdirSync(inputDir).filter(file => {
  return ['.jpg', '.jpeg', '.png', '.gif'].includes(
      file.substring(file.lastIndexOf('.')).toLowerCase());
});

// Resize and output each image file to the output directory
imageFiles.forEach(file => {
  const inputPath = `${inputDir}/${file}`;
  const {name} = path.parse(file);

  const sizes = [
    {width: 320, suffix: '-320w'},
    {width: 768, suffix: '-768w'},
    {width: 1024, suffix: '-1024w'},
    {width: 1920, suffix: '-1920w'},
  ];

  sizes.forEach(({width, suffix}) => {
    const outputWebP = `${outputDir}/${name}${suffix}.webp`;
    const outputJpeg = `${outputDir}/${name}${suffix}.jpeg`;

    sharp(inputPath).
        resize({width}).
        toFormat('webp').
        toFile(outputWebP, (err, info) => {
          if (err) console.log(err);
          console.log(
              `${file} was resized to ${info.width}px wide and saved as ${outputWebP}`);
        });

    sharp(inputPath).
        resize({width}).
        toFormat('jpeg').
        jpeg({quality: 80}).
        toFile(outputJpeg, (err, info) => {
          if (err) console.log(err);
          console.log(
              `${file} was resized to ${info.width}px wide and saved as ${outputJpeg}`);
        });
  });
});
