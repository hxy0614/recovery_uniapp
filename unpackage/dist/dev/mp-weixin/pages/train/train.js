"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "train",
  setup(__props) {
    const messages = common_vendor.ref([]);
    const inputValue = common_vendor.ref("");
    const isLoading = common_vendor.ref(false);
    const scrollTop = common_vendor.ref(0);
    const initWelcomeMessage = () => {
      messages.value.push({
        role: "ai",
        content: "🤓 欢迎使用 AI 医生应用！\n📌 输入你的病症或不适地方。"
      });
      scrollToBottom();
    };
    const sendQuestion = async () => {
      const question = inputValue.value;
      if (!question || isLoading.value)
        return;
      messages.value.push({ role: "user", content: question });
      inputValue.value = "";
      isLoading.value = true;
      scrollToBottom();
      try {
        const res = await common_vendor.index.request({
          url: "http://192.168.236.62:3000/ask",
          // 替换为你的后端地址
          method: "POST",
          data: { question }
        });
        const answer = res.data.answer;
        messages.value.push({ role: "ai", content: answer });
        scrollToBottom();
      } catch (err) {
        console.error(err);
        common_vendor.index.showToast({ title: "请求失败，请稍后重试", icon: "none" });
      } finally {
        isLoading.value = false;
      }
    };
    const scrollToBottom = () => {
      setTimeout(() => {
        scrollTop.value = 999999;
      }, 100);
    };
    common_vendor.onMounted(() => {
      initWelcomeMessage();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(messages.value, (message, index, i0) => {
          return {
            a: common_vendor.t(message.content),
            b: index,
            c: common_vendor.n(message.role === "user" ? "user-message" : "ai-message")
          };
        }),
        b: scrollTop.value,
        c: isLoading.value,
        d: inputValue.value,
        e: common_vendor.o(($event) => inputValue.value = $event.detail.value),
        f: common_vendor.t(isLoading.value ? "发送中..." : "发送"),
        g: common_vendor.o(sendQuestion),
        h: isLoading.value
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f69a297f"]]);
wx.createPage(MiniProgramPage);
