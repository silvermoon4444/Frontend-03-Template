var assert = require("assert");
import {add} from './add'
// import {mul} from './add'

describe("add Test", function () {
  it("add result 3", function () {
    assert.equal(add(1,2),3);
  });
  // it("mul result 2", function () {
  //   assert.equal(mul(1,2),2);
  // });
});