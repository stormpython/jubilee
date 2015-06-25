define(function () {
  return function (_, stack) {
    stack.offset = typeof _.offset !== "undefined" ? _.offset : stack.offset;
    stack.order = typeof _.order !== "undefined" ? _.order : stack.order;
    stack.out = typeof _.out !== "undefined" ? _.out : stack.out;

    return stack;
  };
});