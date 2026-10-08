const fs = require('fs');

const content = fs.readFileSync('bayku.WordPress.2026-09-25 (1).xml', 'utf8');
const regex = /<item>([\s\S]*?)<\/item>/g;
let match;

function searchKids(obj, path = '') {
  if (!obj) return;
  if (typeof obj === 'string') {
    if (obj.toLowerCase().includes('kids')) {
      console.log(`Found "kids" at ${path}:`, obj.substring(0, 200));
    }
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, idx) => searchKids(item, `${path}[${idx}]`));
    return;
  }
  if (typeof obj === 'object') {
    // If it's a widget or section containing kids
    const jsonStr = JSON.stringify(obj);
    if (jsonStr.toLowerCase().includes('baykuş kids') || jsonStr.toLowerCase().includes('baykus kids')) {
      // Print elements or settings
      if (obj.widgetType || obj.elType === 'section' || obj.elType === 'container') {
        console.log(`\n=== CONTAINER/SECTION/WIDGET at ${path} ===`);
        console.log('elType:', obj.elType, 'widgetType:', obj.widgetType);
        console.log('settings:', JSON.stringify(obj.settings, null, 2));
      }
    }
    for (const key of Object.keys(obj)) {
      searchKids(obj[key], `${path}.${key}`);
    }
  }
}

while ((match = regex.exec(content)) !== null) {
  const itemStr = match[1];
  const titleMatch = itemStr.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';
  
  if (title === 'Anasayfa' || title === 'anasayfa') {
    console.log(`\n=================== PROCESSING ${title} ===================`);
    const elemMatch = itemStr.match(/<wp:meta_key><!\[CDATA\[_elementor_data\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(.*?)\]\]><\/wp:meta_value>/s);
    if (elemMatch) {
      try {
        const data = JSON.parse(elemMatch[1]);
        searchKids(data);
      } catch (e) {
        console.error('JSON parse error:', e.message);
      }
    }
  }
}
