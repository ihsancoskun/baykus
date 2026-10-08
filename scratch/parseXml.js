const fs = require("fs");

const xmlPath = "c:/Users/ihsanc/Desktop/baykus/bayku.WordPress.2026-09-25.xml";
const outputPath = "c:/Users/ihsanc/Desktop/baykus/data/pages.json";

fs.readFile(xmlPath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    
    const items = data.split("<item>");
    const pages = [];

    // Skip the first split since it's just channel header
    for (let i = 1; i < items.length; i++) {
        const item = items[i];
        
        // Extract post_type
        const typeMatch = item.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/);
        const postType = typeMatch ? typeMatch[1] : "";
        
        // Extract status
        const statusMatch = item.match(/<wp:status><!\[CDATA\[(.*?)\]\]><\/wp:status>/);
        const status = statusMatch ? statusMatch[1] : "";
        
        if (postType === "page" && status === "publish") {
            const titleMatch = item.match(/<title>(.*?)<\/title>/);
            const title = titleMatch ? titleMatch[1] : "";
            
            const slugMatch = item.match(/<wp:post_name><!\[CDATA\[(.*?)\]\]><\/wp:post_name>/);
            const slug = slugMatch ? slugMatch[1] : "";
            
            const contentMatch = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);
            const content = contentMatch ? contentMatch[1] : "";

            pages.push({
                title,
                slug,
                content
            });
        }
    }

    if (!fs.existsSync("c:/Users/ihsanc/Desktop/baykus/data")) {
        fs.mkdirSync("c:/Users/ihsanc/Desktop/baykus/data");
    }

    fs.writeFileSync(outputPath, JSON.stringify(pages, null, 2));
    console.log(`Successfully extracted ${pages.length} pages to ${outputPath}`);
});
