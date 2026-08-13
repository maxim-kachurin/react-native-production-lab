module.exports = {
  presets: ["module:@react-native/babel-preset"],
  env: {
    production: {
      plugins: ["transform-remove-console"],
    },
  },
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@constants": "./src/constants",
          "@hooks": "./src/hooks",
          "@navigation": "./src/navigation",
          "@screens": "./src/screens",
          "@theme": "./src/theme",
          "@types": "./src/types",
          "@utils": "./src/utils",
        },
      },
    ],
    ["react-native-worklets/plugin"],
  ],
};
