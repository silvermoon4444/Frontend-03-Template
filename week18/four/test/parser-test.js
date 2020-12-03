import { parseHTML } from "../src/parser";
import assert from "assert";

// import {mul} from './add'

describe("add Test", function () {
  // it("<a></a>", function () {
  //   let tree = parseHTML("<a></a>");
  //   console.log(tree);
  //   assert.equal(tree.child[0].tagChar, "a");
  //   assert.equal(tree.child[0].child.length, 0);
  // });
  it("<a href='baidu.com'></a>", function () {
    let tree = parseHTML("<div width='12px' height=\"12px\" id=bb ><br/> <hr /><hr width=tt /></div>");
    console.log(tree.child[0].child);
    assert.equal(tree.child[0].child.length,4);
    console.log('~~~~~~~~~~~~~~~~');
    console.log(tree.child[0].attr);
    assert.equal(tree.child[0].attr.length,3);
  });
  // it("mul result 2", function () {
  //   assert.equal(mul(1,2),2);
  // });
});
