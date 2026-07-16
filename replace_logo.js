const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the HTML styled logo
  content = content.replace(/>Toy<span>Up<\/span></g, '><img src="assets/stackly_logo.webp" alt="Stackly" style="height: 35px; vertical-align: middle;"><');
  
  // Replace text instances of ToyUp with Stackly
  content = content.replace(/ToyUp/g, 'Stackly');
  content = content.replace(/hello@toyup\.com/g, 'hello@stackly.com');
  
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
