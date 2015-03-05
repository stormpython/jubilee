(function(unit) {
  'use strict';

  if (typeof exports !== 'undefined') unit = exports;

  unit.occur = function(items) {
    if (items.constructor !== Array) return items;

    var resultList = {};

    // Two heroic paths, the maybe-string and the numeric path.
    if (isNaN(items[0])) {
      items.forEach(function(item) {
        if (undefined === resultList[item]) {
          resultList[item] = 1;
        } else {
          resultList[item] += 1;
        }
      });

    // Count occurrences as well as non occurrences.
    } else {
      // Use an array to keep the sorted numbers in the added order.
      resultList = [];

      // Numeric sort, because JS will sort alphabetically by default.
      // Also use slice to copy the array, because sort mutates items.
      var sorted = items.slice(0).sort(function(prev, next) {
        return prev - next;
      });

      // Start and end indices map sorted bounds.
      for (var item = sorted[0]; item <= sorted[items.length - 1]; item++) {
        var pair = {},
            count = 1,
            index = sorted.indexOf(item);

        if (~index) {
          // Count up until first mismatch if item exists.
          while ((index + 1) < sorted.length && item === sorted[index + 1]) {
            count += 1;
            index += 1;
          } pair[item] = count;
        } else {
          pair[item] = 0;
        }
        resultList.push(pair);
      }
    }
    return resultList;
  };
}(this));
