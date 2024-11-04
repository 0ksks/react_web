const path = require("path");
const CracoLessPlugin = require("craco-less");
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],
  webpack: {
    alias: {
      "@": resolve("src"),
    },
  },
};
