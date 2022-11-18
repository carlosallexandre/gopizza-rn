module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resovler",
        {
          extensions: [".js", ".ts", ".tsx", ".json"],
          root: ["./src"],
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
