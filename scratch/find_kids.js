const fs = require('fs');

const xmlFiles = ['bayku.WordPress.2026-09-25 (1).xml', 'bayku.WordPress.2026-09-25.xml'];

for (const file of xmlFiles) {
  if (!fs.existsSync(file)) continue;
  console.log(`Checking ${file}...`);
  const content = fs.readFileSync(file, 'utf8');
  const regex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const itemStr = match[1];
    if (itemStr.toLowerCase().includes('kids')) {
      const titleMatch = itemStr.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/);
      console.log(`Found item in ${file}, title:`, titleMatch ? titleMatch[1] : 'unknown');
      fs.writeFileSync('scratch/kids_found.txt', itemStr);
      
      // Let's also search for elementor json
      const elemMatch = itemStr.match(/<wp:meta_key><!\[CDATA\[_elementor_data\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(.*?)\]\]><\/wp:meta_value>/s);
      if (elemMatch) {
        fs.writeFileSync('scratch/kids_elementor.json', elemMatch[1]);
        console.log('Saved kids_elementor.json');
      }
    }
  }
}
