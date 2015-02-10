define(function (require) {
  return (function (global) {
    global.kd3 = function () {
      return require('kd3');
    };
  }(this));
});
