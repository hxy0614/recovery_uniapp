"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "training",
  setup(__props) {
    const trainingInfo = common_vendor.ref({
      today_training_duration: 0,
      total_training_duration: 0,
      total_training_days: 0
    });
    const fetchTrainingInfo = async () => {
      const userId = common_vendor.index.getStorageSync("userInfo").id;
      if (!userId) {
        console.error("用户 ID 不存在");
        return;
      }
      common_vendor.index.request({
        url: "http://localhost:3000/training-info",
        // 后端接口地址
        method: "GET",
        data: {
          userId
        },
        success: (res) => {
          if (res.data.success) {
            trainingInfo.value = res.data.trainingInfo;
          } else {
            console.error("获取训练信息失败:", res.data.message);
          }
        },
        fail: (err) => {
          console.error("请求失败:", err);
        }
      });
    };
    common_vendor.onMounted(() => {
      fetchTrainingInfo();
    });
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
    const goToGuide = () => {
      console.log("点击了新手指引");
      common_vendor.index.navigateTo({
        url: "/pages/guide/beginner/beginner",
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
        a: common_vendor.p({
          type: "location",
          size: "20"
        }),
        b: common_vendor.p({
          type: "more-filled",
          size: "20"
        }),
        c: common_vendor.p({
          type: "scan",
          size: "20"
        }),
        d: common_vendor.p({
          type: "bar",
          size: "20",
          color: "#FF6B6B"
        }),
        e: common_vendor.t(trainingInfo.value.today_training_duration || 0),
        f: common_vendor.t(trainingInfo.value.total_training_duration || 0),
        g: common_vendor.t(trainingInfo.value.total_training_days || 0),
        h: common_vendor.p({
          type: "book",
          size: "24",
          color: "#6BC4FF"
        }),
        i: common_assets._imports_0$1,
        j: common_vendor.o(goToGuide),
        k: common_vendor.p({
          type: "dumbbell",
          size: "24",
          color: "#6BC4FF"
        }),
        l: common_assets._imports_1$1,
        m: common_vendor.o(goToGuide),
        n: common_assets._imports_2$1,
        o: common_vendor.o(($event) => navigateTo("/pages/trainings/training-detail/training-detail")),
        p: common_assets._imports_3,
        q: common_assets._imports_4,
        r: common_vendor.o(($event) => navigateTo("/pages/trainings/breathing-detail/breathing-detail")),
        s: common_assets._imports_5
      };
    };
  }
});
wx.createPage(_sfc_main);
