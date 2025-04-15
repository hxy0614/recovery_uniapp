"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "beginner",
  setup(__props) {
    const tabs = common_vendor.ref(["新手指引", "哑铃使用指导"]);
    const currentTab = common_vendor.ref(0);
    const switchTab = (index) => {
      currentTab.value = index;
    };
    const goToTraining = () => {
      console.log("开始训练");
      common_vendor.index.switchTab({
        url: "/pages/training/training",
        success: () => {
          console.log("跳转成功");
        },
        fail: (err) => {
          console.error("跳转失败", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabs.value, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab),
            b: currentTab.value === index,
            c: index,
            d: currentTab.value === index ? 1 : "",
            e: common_vendor.o(($event) => switchTab(index), index)
          };
        }),
        b: common_assets._imports_0$4,
        c: common_assets._imports_1$3,
        d: currentTab.value === 0,
        e: currentTab.value === 1,
        f: common_vendor.o(goToTraining)
      };
    };
  }
};
wx.createPage(_sfc_main);
