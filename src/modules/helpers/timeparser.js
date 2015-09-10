define(function () {
  var timeNotation = {
    s: "second",
    m: "minute",
    h: "hour",
    d: "day",
    w: "week",
    M: "month",
    y: "year"
  };

  return function (str) {
    if (typeof str !== "string") { return; }

    var abbr = str.split(parseFloat(str))[1];

    if (Object.keys(timeNotation).indexOf(abbr) === -1) {
      throw new Error("Invalid time string " + str);
    }

    return timeNotation[abbr];
  };
});