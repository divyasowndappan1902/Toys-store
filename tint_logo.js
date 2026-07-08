const sharp = require('sharp');

sharp('logo1.webp.png')
  .tint({ r: 255, g: 120, b: 0 }) // Bright Orange tint
  .webp({ quality: 90 })
  .toFile('assets/stackly_logo.webp')
  .then(info => {
    console.log('Successfully tinted the original raster logo to orange!');
    console.log('Size:', info.size, 'bytes');
  })
  .catch(err => {
    console.error('Error:', err);
  });
