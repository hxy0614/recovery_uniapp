"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "breathing-session",
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
        url: "/pages/trainings/breathing-exercise/breathing-exercise"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$6,
        b: common_assets._imports_1$6,
        c: common_assets._imports_2$2,
        d: common_vendor.t(trainingInfo.value.total_training_days || 0),
        e: common_vendor.o(startTraining)
      };
    };
  }
};
wx.createPage(_sfc_main);
