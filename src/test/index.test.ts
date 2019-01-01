// import * as assert from "assert";
import assert = require("assert");
describe("demo", () => {
  // 最简单的函数
  it("plus", () => {
    let fn = (a, b) => a + b;
    assert(fn(1, 2) === 3);
  });

  // 三种异步测试

  it("async", async () => {
    assert(1 == 1);
  });

  it("promise", async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        assert(2 == 2);
        resolve();
      }, 1000);
    });
  });

  it("callback", cb => {
    setTimeout(() => {
      assert(3 === 3);
      cb();
    });
  });

  // 简单的handle
});
