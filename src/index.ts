import express from "express";
import multer from "multer";
import Stream from "stream";
import OSS from "ali-oss";
import { ossConf } from "./config";

// 生成oss客户端
let { region, bucket, accessKeyId, accessKeySecret } = ossConf;
let client = new OSS({
  region,
  bucket,
  accessKeyId,
  accessKeySecret
});

let app = express();

app.post(
  "/upload/",
  multer({
    limits: {
      fileSize: 10 * 1024 * 1024
    }
  }).any(),
  (req, res) => {
    let files: Express.Multer.File[] = req.files as Express.Multer.File[];
    console.warn("文件个数:", files.length);
    let arr = files.map(fi => {
      console.log(fi.filename, fi.originalname, fi.size, fi.buffer);
      let name =
        ossConf.dir + "/" + Math.floor(1e8 * Math.random()).toString(16);
      let st = new Stream.PassThrough();
      st.end(fi.buffer);
      return new Promise((resolve, reject) => {
        client
          .putStream(name, st)
          .then(() => {
            resolve(name);
          })
          .catch(e => {
            reject(e);
          });
      });
    });
    Promise.all(arr)
      .then(data => {
        console.log("after all:", data);
        res.json(data.map(n => ossConf.prefix + "/" + n));
      })
      .catch(e => {
        console.log(e);
        res.json({ err: "err ~" });
      });
  }
);

app.listen(3000, () => {
  console.log("app run...");
});
