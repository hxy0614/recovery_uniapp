"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "pingjia",
  setup(__props) {
    const form = common_vendor.reactive({
      name: "",
      gender: "",
      age: "",
      idType: "",
      idNumber: "",
      birth: "",
      phone: "",
      code: "",
      height: "",
      weight: "",
      pregnancyTimes: "",
      deliveryTimes: "",
      abortionTimes: "",
      reason: ""
    });
    const genderList = ["女", "男"];
    const idTypeList = ["身份证", "护照", "其他"];
    const bindGenderChange = (e) => {
      form.gender = e.detail.value;
    };
    const bindIdTypeChange = (e) => {
      form.idType = e.detail.value;
    };
    const bindBirthChange = (e) => {
      form.birth = e.detail.value;
    };
    const submitForm = () => {
      if (!form.name || !form.gender || !form.age || !form.phone || !form.code) {
        common_vendor.index.showToast({
          title: "请填写必填项",
          icon: "none"
        });
        return;
      }
      console.log("提交的表单数据：", form);
    };
    return (_ctx, _cache) => {
      return {
        a: form.name,
        b: common_vendor.o(($event) => form.name = $event.detail.value),
        c: common_vendor.t(genderList[form.gender] || "请选择性别"),
        d: common_vendor.o(bindGenderChange),
        e: form.gender,
        f: genderList,
        g: form.age,
        h: common_vendor.o(($event) => form.age = $event.detail.value),
        i: common_vendor.t(idTypeList[form.idType] || "请选择证件类型"),
        j: common_vendor.o(bindIdTypeChange),
        k: form.idType,
        l: idTypeList,
        m: form.idNumber,
        n: common_vendor.o(($event) => form.idNumber = $event.detail.value),
        o: common_vendor.t(form.birth || "请选择出生日期"),
        p: common_vendor.o(bindBirthChange),
        q: form.birth,
        r: form.height,
        s: common_vendor.o(($event) => form.height = $event.detail.value),
        t: form.weight,
        v: common_vendor.o(($event) => form.weight = $event.detail.value),
        w: common_vendor.o(submitForm)
      };
    };
  }
});
wx.createPage(_sfc_main);
