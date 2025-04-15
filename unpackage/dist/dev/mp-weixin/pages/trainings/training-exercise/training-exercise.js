"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "training-exercise",
  setup(__props) {
    const secondsCount = common_vendor.ref(6);
    const timeLeft = common_vendor.ref(15 * 60 + 1);
    const currentSet = common_vendor.ref(0);
    const isTraining = common_vendor.ref(false);
    let timer = null;
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };
    const saveTrainingData = async (duration) => {
      var _a;
      const userId = (_a = common_vendor.index.getStorageSync("userInfo")) == null ? void 0 : _a.id;
      if (!userId) {
        common_vendor.index.showToast({ title: "请先登录", icon: "none" });
        return;
      }
      try {
        const res = await common_vendor.index.request({
          url: "http://localhost:3000/training-save",
          method: "POST",
          data: {
            userId,
            duration: Math.ceil(duration / 60)
          }
        });
        if (res.statusCode !== 200) {
          throw new Error(`HTTP错误: ${res.statusCode}`);
        }
        if (res.data.code !== 200) {
          common_vendor.index.showToast({ title: `保存失败: ${res.data.message}`, icon: "none" });
        }
      } catch (err) {
        console.error("完整请求错误:", err);
        common_vendor.index.showToast({ title: `请求失败: ${err.message}`, icon: "none" });
      }
    };
    const stopTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
        const trainedSeconds = 15 * 60 + 1 - timeLeft.value;
        saveTrainingData(trainedSeconds);
      }
    };
    const startTimer = () => {
      timer = setInterval(() => {
        secondsCount.value--;
        if (secondsCount.value === 0) {
          secondsCount.value = 6;
          currentSet.value++;
        }
        if (timeLeft.value > 0) {
          timeLeft.value--;
        } else {
          stopTimer();
        }
      }, 1e3);
    };
    const toggleTraining = () => {
      isTraining.value = !isTraining.value;
      if (isTraining.value) {
        startTimer();
      } else {
        stopTimer();
        common_vendor.index.redirectTo({
          url: "/pages/trainings/training-session/training-session"
          // 替换为你的目标页面路径
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(secondsCount.value),
        b: common_vendor.t(formatTime(timeLeft.value)),
        c: common_vendor.t(currentSet.value),
        d: common_vendor.t(isTraining.value ? "暂停训练" : "开始训练"),
        e: common_vendor.o(toggleTraining)
      };
    };
  }
};
wx.createPage(_sfc_main);
