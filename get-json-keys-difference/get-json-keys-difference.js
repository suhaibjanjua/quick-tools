const fs = require('fs');
const path = require('path');

// Paths to your JSON files
const originalFilePath = path.join(__dirname, '../sample-data/original.json');
const translatedFilePath = path.join(__dirname, '../sample-data/updated-original.json');

// Read JSON files
const originalJson = JSON.parse(fs.readFileSync(originalFilePath, 'utf8'));
const translatedJson = JSON.parse(fs.readFileSync(translatedFilePath, 'utf8'));

// Function to get all keys from a nested object
const getKeys = (obj, prefix = '') => {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys = keys.concat(getKeys(value, fullPath));
    } else {
      keys.push(fullPath);
    }
  }
  return keys;
};

// Get keys from both JSON objects
const originalKeys = new Set(getKeys(originalJson));
const translatedKeys = new Set(getKeys(translatedJson));

// Determine missing and extra keys
const missingKeys = [...originalKeys].filter(key => !translatedKeys.has(key));
const extraKeys = [...translatedKeys].filter(key => !originalKeys.has(key));

// Output results
console.log('Missing Keys in Translated File:');
console.log(missingKeys.length > 0 ? missingKeys : 'None');

console.log('\nExtra Keys in Translated File:');
console.log(extraKeys.length > 0 ? extraKeys : 'None');
