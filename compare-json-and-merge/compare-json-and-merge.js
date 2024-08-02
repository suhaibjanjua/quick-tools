const fs = require('fs');
const path = require('path');

// Paths to your JSON files
const originalFilePath = path.join(__dirname, '../sample-data/original.json');
const translatedFilePath = path.join(__dirname, '../sample-data/translated.json');
const updatedTranslatedFilePath = path.join(__dirname, '../sample-data/updated-original.json');

// Read JSON files
const originalJson = JSON.parse(fs.readFileSync(originalFilePath, 'utf8'));
const translatedJson = JSON.parse(fs.readFileSync(translatedFilePath, 'utf8'));

// Function to deeply merge objects, preserving translated values and adding missing keys
const mergeDeep = (target, source) => {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      mergeDeep(target[key], source[key]);
    } else {
      if (!(key in target)) {
        target[key] = source[key];
      }
    }
  }
};

// Clone the translated JSON to avoid modifying the original
const updatedTranslations = JSON.parse(JSON.stringify(translatedJson));

// Merge original JSON into updated translations
mergeDeep(updatedTranslations, originalJson);

// Write the updated translations to a new file
fs.writeFileSync(updatedTranslatedFilePath, JSON.stringify(updatedTranslations, null, 2), 'utf8');

console.log('Updated translated JSON file has been created.');
