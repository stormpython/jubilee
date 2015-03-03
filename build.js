({
  baseUrl: "./src",
  mainConfigFile: "src/require.config.js",

  out: "build/kd3.js",
  optimize: "none",

  include: ["require.config", "index"],
  name: "../lib/almond/almond",

  wrap: {
    startFile: "src/start.js",
    endFile: "src/end.js"
  }
})