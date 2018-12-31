# jwt 认证方式

[官方示例](https://github.com/auth0/express-jwt/blob/master/test/jwt.test.js)

- 签名函数是 sign
- client 需要把签名写在 headers 的 authorization 上
- server 解析后,签名解析的信息出现在 request 的 user 上
