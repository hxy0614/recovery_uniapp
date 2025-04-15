"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/training/training.js";
  "./pages/my/my.js";
  "./pages/setting/setting.js";
  "./pages/login/login.js";
  "./pages/detail/detail.js";
  "./pages/about/privacy/privacy.js";
  "./pages/about/agreement/agreement.js";
  "./pages/jiaocheng/kangfu/kangfu.js";
  "./pages/jiaocheng/zhidao/zhidao.js";
  "./pages/appointment/appointment.js";
  "./pages/train/train.js";
  "./pages/guide/beginner/beginner.js";
  "./pages/guide/dumbbell/dumbbell.js";
  "./pages/pinggu/fenshu/fenshu.js";
  "./pages/pinggu/pingjia/pingjia.js";
  "./pages/news/news1/news1.js";
  "./pages/trainings/breathing-detail/breathing-detail.js";
  "./pages/trainings/breathing-exercise/breathing-exercise.js";
  "./pages/trainings/breathing-session/breathing-session.js";
  "./pages/trainings/training-detail/training-detail.js";
  "./pages/trainings/training-exercise/training-exercise.js";
  "./pages/trainings/training-session/training-session.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
