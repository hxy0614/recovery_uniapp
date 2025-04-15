"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "setting",
  setup(__props) {
    const userInfo = common_vendor.ref(common_vendor.index.getStorageSync("userInfo") || {});
    const showUserName = () => {
      common_vendor.index.showModal({
        title: "用户名",
        content: userInfo.value.name || "未登录",
        // 显示用户名
        showCancel: false
      });
    };
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要重新登录吗？",
        success: async (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "退出中...",
              icon: "loading",
              duration: 300
            });
            common_vendor.index.removeStorageSync("userInfo");
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/login/login"
              });
            }, 2e3);
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(userInfo.value.name || "未登录"),
        b: common_vendor.o(showUserName),
        c: common_vendor.o(handleLogout)
      };
    };
  }
};
wx.createPage(_sfc_main);
