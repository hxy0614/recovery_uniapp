"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      formData: {
        pregnancyCount: "",
        deliveryCount: "",
        abortionCount: "",
        reason: ""
      },
      reasons: ["产检", "见红", "腹痛", "其他"],
      reasonIndex: 0
    };
  },
  methods: {
    bindReasonChange(e) {
      this.reasonIndex = e.detail.value;
      this.formData.reason = this.reasons[e.detail.value];
    },
    submitForm() {
      if (!this.formData.pregnancyCount) {
        common_vendor.index.showToast({
          title: "请输入怀孕次数",
          icon: "none"
        });
        return;
      }
      if (!this.formData.deliveryCount) {
        common_vendor.index.showToast({
          title: "请输入分娩次数",
          icon: "none"
        });
        return;
      }
      if (!this.formData.abortionCount) {
        common_vendor.index.showToast({
          title: "请输入流产次数",
          icon: "none"
        });
        return;
      }
      if (!this.formData.reason) {
        common_vendor.index.showToast({
          title: "请选择就诊原因",
          icon: "none"
        });
        return;
      }
      console.log("表单数据：", this.formData);
      common_vendor.index.showToast({
        title: "提交成功",
        icon: "success"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.formData.pregnancyCount,
    b: common_vendor.o(($event) => $data.formData.pregnancyCount = $event.detail.value),
    c: $data.formData.deliveryCount,
    d: common_vendor.o(($event) => $data.formData.deliveryCount = $event.detail.value),
    e: $data.formData.abortionCount,
    f: common_vendor.o(($event) => $data.formData.abortionCount = $event.detail.value),
    g: common_vendor.t($data.formData.reason || "请选择就诊原因"),
    h: common_vendor.o((...args) => $options.bindReasonChange && $options.bindReasonChange(...args)),
    i: $data.reasonIndex,
    j: $data.reasons,
    k: common_vendor.o((...args) => $options.submitForm && $options.submitForm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
