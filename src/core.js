/**
 * Created by shelbysturgis on 2/13/14.
 */

var kd3 = window.kd3 || {};

kd3.version = '0.0.0';

window.kd3 = kd3;

kd3.namespace = function (ns_string) {
  "use strict";

  var parts = ns_string.split('.'),
      parent = kd3,
      i;

  // strip redundant leading global
  if (parts[0] === "kd3") {
    parts = parts.slice(1);
  }

  for (i = 0; i < parts.length; i += 1) {
    // create a property if it doesn't exist
    if (typeof parent[parts[i]] === "undefined") {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }

  return parent;
};