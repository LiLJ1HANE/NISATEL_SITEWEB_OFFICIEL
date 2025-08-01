// generateTranslations.js
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch").default;

// Directory to scan
const COMPONENTS_DIR = path.join(__dirname, "src");

// Files to process
const fileExtensions = [".jsx", ".js"];

// Regex to find text between tags
const regexText = />([^<>{}=]+)</g; 

// Translation dictionaries
const fr = {};
const en = {};

// Improved translation function with error handling
const translate = async (text) => {
  try {
    const res = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "fr",
        target: "en",
        format: "text",
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    if (!data.translatedText) {
      throw new Error("No translation returned");
    }
    return data.translatedText;
  } catch (error) {
    console.error("Translation error for text:", text, error);
    return text; // Return original text if translation fails
  }
};

// Recursive directory walker
const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (fileExtensions.includes(path.extname(file))) {
      results.push(filePath);
    }
  }
  return results;
};

// Main execution function
const run = async () => {
  console.log("📦 Extracting texts...");

  const files = walk(COMPONENTS_DIR);
  const seen = new Set();
  let index = 1;

  // Rate limiting helper
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const matches = content.matchAll(regexText);

    for (const match of matches) {
      const raw = match[1].trim();

      if (raw && !seen.has(raw) && isNaN(raw) && 
          !raw.startsWith("{") && raw.length > 2) {
        seen.add(raw);
        const key = `key_${index++}`;

        fr[key] = raw;
        try {
          en[key] = await translate(raw);
          console.log(`✅ "${raw}" → "${en[key]}"`);
          await delay(500); // Respect API rate limits
        } catch (err) {
          console.error("❌ Translation error:", err);
          en[key] = raw; // Fallback to original text
        }
      }
    }
  }

  // Create output directories
  const localesDir = path.join(COMPONENTS_DIR, "locales");
  const outPathFr = path.join(localesDir, "fr");
  const outPathEn = path.join(localesDir, "en");
  
  if (!fs.existsSync(localesDir)) {
    fs.mkdirSync(localesDir, { recursive: true });
  }

  // Write translation files
  fs.writeFileSync(
    path.join(outPathFr, "translation.json"),
    JSON.stringify(fr, null, 2)
  );
  fs.writeFileSync(
    path.join(outPathEn, "translation.json"),
    JSON.stringify(en, null, 2)
  );

  console.log("✅ Translation files generated!");
  console.log(`- French: ${Object.keys(fr).length} phrases`);
  console.log(`- English: ${Object.keys(en).length} translations`);
};

// Run with error handling
run().catch(err => {
  console.error("❌ Script failed:", err);
  process.exit(1);
});