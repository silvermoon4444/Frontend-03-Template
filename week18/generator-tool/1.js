"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _HelloWord = _interopRequireDefault(require("./HelloWord.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

new _vue["default"]({
  el: '#app',
  render: function render(h) {
    return h(_HelloWord["default"]);
  }
});

for (var _i = 0, _arr = [1, 2, 3]; _i < _arr.length; _i++) {
  var v = _arr[_i];
  console.log(v);
}

