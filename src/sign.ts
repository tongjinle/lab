// 用来生成一个被secret签名的字符串

const jwtToken = require("jsonwebtoken");
import jwt from "express-jwt";

// 前缀,常量
let prefix = "Bearer ";
let sign = (info: any, secret: string) => prefix + jwtToken.sign(info, secret);

export default sign;
