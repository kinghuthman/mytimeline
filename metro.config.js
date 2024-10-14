// // metro.config.js
// const { getDefaultConfig } = require("expo/metro-config");

// const defaultConfig = getDefaultConfig(__dirname);

// // This changes the root folder for Expo Router to 'src'
// defaultConfig.resolver.assetExts.push("src");

// module.exports = defaultConfig;

// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// If you need to add any specific asset extensions or custom configurations, do it here
// For example, defaultConfig.resolver.assetExts.push("src");

module.exports = defaultConfig;
