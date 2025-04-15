"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my",
  setup(__props) {
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({
        url,
        success: () => {
          console.log("跳转成功");
        },
        fail: (err) => {
          console.error("跳转失败：", err);
          common_vendor.index.showToast({
            title: "页面跳转失败",
            icon: "none"
          });
        }
      });
    };
    const settingsList = common_vendor.ref([
      {
        name: "设置",
        icon: "gear",
        path: "/pages/setting/setting"
      },
      {
        name: "解除科室绑定",
        icon: "link",
        path: ""
      },
      {
        name: "扫一扫",
        icon: "scan",
        path: ""
      },
      {
        name: "关于",
        icon: "info",
        path: "/pages/detail/detail"
      }
    ]);
    const handleSettingsTap = (item) => {
      if (item.name === "扫一扫") {
        common_vendor.index.scanCode({
          success: (res) => {
            console.log("扫码结果：", res.result);
          }
        });
      } else {
        common_vendor.index.navigateTo({
          url: item.path
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_assets._imports_1$2,
        c: common_vendor.o(($event) => navigateTo("/pages/pinggu/fenshu/fenshu")),
        d: common_assets._imports_2$2,
        e: common_vendor.o(($event) => navigateTo("/pages/appointment/appointment")),
        f: common_assets._imports_3$1,
        g: common_vendor.o(($event) => navigateTo("/pages/train/train")),
        h: common_vendor.f(settingsList.value, (item, index, i0) => {
          return {
            a: `/static/images/icons/${item.icon}.png`,
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => handleSettingsTap(item), index)
          };
        }),
        i: common_assets._imports_4$1
      };
    };
  }
});
wx.createPage(_sfc_main);
