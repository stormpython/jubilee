define(function () {
  return function getClass(name) {
    if (typeof name !== "string") {
      throw new Error("getClass expects a string as input");
    }

    return name.split(" ").join(".");
  };
});