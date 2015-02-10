define(function (require) {
  return (function (global) {
    kd3 = function () {
      return require('kd3');
    };

    global.kd3 = kd3;
  }(this));
});
