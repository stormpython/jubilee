/**
 * Returns a function that creates a deep copy of an object
 */
define(function () {
  return function deepCopy(parent, child) {
    child = child || {};

    for (var i in parent) {
      if (parent.hasOwnProperty(i)) {
        if (typeof parent[i] === "object" && parent[i] !== null) {
          child[i] = (parent[i].constructor === Array) ? [] : {};
          deepCopy(parent[i], child[i]);
        } else {
          child[i] = parent[i];
        }
      }
    }

    return child;
  };
});