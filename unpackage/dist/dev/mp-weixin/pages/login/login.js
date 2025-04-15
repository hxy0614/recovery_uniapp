"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const isAgree = common_vendor.ref(false);
    const account = common_vendor.ref("");
    const password = common_vendor.ref("");
    const toggleAgreement = () => {
      isAgree.value = !isAgree.value;
    };
    const handleLogin = async () => {
      if (!isAgree.value) {
        common_vendor.index.showToast({
          title: "请先同意用户协议和隐私政策",
          icon: "none"
        });
        return;
      }
      if (!account.value || !password.value) {
        common_vendor.index.showToast({
          title: "请输入账号和密码",
          icon: "none"
        });
        return;
      }
      common_vendor.index.request({
        url: "http://192.168.236.62:3000/login",
        // 后端登录接口
        method: "POST",
        data: {
          account: account.value,
          password: password.value
        },
        success: (res) => {
          if (res.data.success) {
            common_vendor.index.setStorageSync("userInfo", res.data.user);
            common_vendor.index.showToast({
              title: "登录成功",
              icon: "success"
            });
            common_vendor.index.navigateTo({
              url: "/pages/setting/setting"
            });
          } else {
            common_vendor.index.showToast({
              title: res.data.message || "账号或密码错误",
              icon: "none"
            });
          }
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: "登录失败，请稍后重试",
            icon: "none"
          });
          console.error("登录请求失败:", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$3,
        b: account.value,
        c: common_vendor.o(($event) => account.value = $event.detail.value),
        d: password.value,
        e: common_vendor.o(($event) => password.value = $event.detail.value),
        f: common_vendor.o(handleLogin),
        g: isAgree.value,
        h: common_vendor.o(toggleAgreement)
      };
    };
  }
};
wx.createPage(_sfc_main);
