"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "news1",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$5,
        b: common_assets._imports_1$4
      };
    };
  }
});
wx.createPage(_sfc_main);
