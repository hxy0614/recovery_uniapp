"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "training-detail",
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
    const startTraining = () => {
      common_vendor.index.navigateTo({
        url: "/pages/trainings/training-session/training-session"
      });
    };
    const isIntroExpanded = common_vendor.ref(false);
    const toggleIntro = () => {
      isIntroExpanded.value = !isIntroExpanded.value;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$6,
        b: common_assets._imports_1$5,
        c: isIntroExpanded.value
      }, isIntroExpanded.value ? {} : {}, {
        d: common_vendor.t(isIntroExpanded.value ? "收起" : "详情"),
        e: isIntroExpanded.value ? 1 : "",
        f: common_vendor.o(toggleIntro),
        g: common_vendor.t(trainingInfo.value.total_training_days),
        h: common_vendor.o(startTraining),
        i: common_vendor.o(startTraining)
      });
    };
  }
};
wx.createPage(_sfc_main);
