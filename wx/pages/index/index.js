//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    isShowBtns: true,
    photoUrlList: [],
    audioUrl: undefined,
    videoUrl: undefined
  },
  ontap() {
    console.log("ontap");
    wx.chooseImage({
      success: res => {
        console.log(res.tempFilePaths);
        this.uploadFiles(res.tempFilePaths).then(data => {
          console.log("上传之后资源的oss url:", data);
          this.setData({
            photoUrlList: data[0],
            isShowBtns: false
          });
        });
      }
    });
  },
  ontapVideo() {
    wx.chooseVideo({
      success: res => {
        console.log(res.tempFilePath);
        this.uploadFiles([res.tempFilePath]).then(data => {
          console.log("上传之后资源的oss url:", data);
          this.setData({
            videoUrl: data,
            isShowBtns: false
          });
        });
      }
    });
  },
  uploadFiles(filePaths) {
    return Promise.all(
      filePaths.map((path, index) => {
        let url = "http://localhost:3000/upload/";
        let name = "filename";
        return new Promise((resolve, reject) => {
          wx.uploadFile({
            url,
            name,
            filePath: path,
            success(res) {
              console.log("success", index, res);
              resolve(JSON.parse(res.data)[0]);
            },
            fail() {
              reject();
            }
          });
        });
      })
    );
  },

  onLoad: function() {}
});
