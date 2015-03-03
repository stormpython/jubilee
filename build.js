({
  baseUrl: "./src",
  mainConfigFile: "src/require.config.js",

  out: "build/kd3.js",
  optimize: "none",

  include: ["require.config", "kd3"],
  name: "../lib/almond/almond",

  wrap: {
    startFile: "src/start.js",
    endFile: "src/end.js"
  }
})