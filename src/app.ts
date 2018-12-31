import express from "express";
import jwt from "express-jwt";
import sign from "./sign";
import { SECRET } from "./config";

let app = express();

app.get(
  "/resource",
  (req, res, next) => {
    let info = {
      name: "tongjinle",
      age: 35,
      expires: "2020/01/01"
    };
    req.headers = {};
    // 写在headers的authorization上面
    req.headers.authorization = sign(info, SECRET);

    console.log(sign);

    next();
  },
  jwt({ secret: SECRET }),
  (req, res) => {
    // 被解析后的签名字符串,最后会挂载到request上的user
    console.log(req.user);
    console.assert(req.user.age === 35);
    res.json({ word: "hi world" });
  }
);

app.listen(3000, () => {
  console.log("app run");
});
