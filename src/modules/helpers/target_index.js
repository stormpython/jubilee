define(function () {
  return function getIndex(parent, child) {
    function isPresent(d) { return d > -1; }
    function indexPosition(d, i) {
      if (d.length > 1) { return i; }
      return d;
    }
    function filterDown(d) {
      if (Array.isArray(d) && !d.length) { return -1; }
      return d;
    }

    var index = parent.datum()
    .map(function (datum) {
      var isArray = Array.isArray(child.datum());
      var target = isArray ? child.datum() : [child.datum()];

      return target.map(function (d) {
        return datum.indexOf(d);
      }).filter(isPresent);
    })
    .map(indexPosition)
    .map(filterDown)
    .filter(isPresent)[0];

    if (Array.isArray(index)) { return index[0]; }

    return index;
  };
});
