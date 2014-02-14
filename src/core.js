/**
 * Created by shelbysturgis on 2/13/14.
 */

var kbn = window.kbn || {};

kbn.version = '0.0.0';

window.kbn = kbn;

kbn.namespace = function (ns_string) {
  "use strict";

  var parts = ns_string.split('.'),
      parent = kbn,
      i;

  // strip redundant leading global
  if (parts[0] === "kbn") {
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