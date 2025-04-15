"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
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
    const goToTrainingPage = () => {
      common_vendor.index.switchTab({
        url: "/pages/training/training"
      });
    };
    const handleBannerClick = (item) => {
      if (item.path) {
        navigateTo(item.path);
      }
    };
    const bannerList = common_vendor.ref([
      {
        title: "盆底康复",
        image: "http://su3irlzut.hn-bkt.clouddn.com/doctor1.jpg",
        path: "/pages/jiaocheng/kangfu/kangfu"
      },
      {
        title: "专业指导",
        image: "http://su3irlzut.hn-bkt.clouddn.com/doctor2.jpg",
        path: "/pages/jiaocheng/zhidao/zhidao"
      }
    ]);
    const articles = common_vendor.ref([
      {
        title: '几大超实用家庭版"紧致"训练指南！今天暂时...',
        date: "2022-06-22",
        image: "/static/images/article1.jpg",
        path: "/pages/news/news1/news1"
      },
      {
        title: "这几类人更容易出现产后盆腔器官脱垂，请...",
        date: "2022-06-22",
        image: "",
        path: "https://mp.weixin.qq.com/s/ydRZvMpIfH98TnrvGwAqoA"
      },
      {
        title: '几大超实用家庭版"紧致"训练指南！今天暂时...',
        date: "2022-06-22",
        image: ""
      },
      {
        title: '几大超实用家庭版"紧致"训练指南！今天暂时...',
        date: "2022-06-22",
        image: ""
      },
      {
        title: '几大超实用家庭版"紧致"训练指南！今天暂时...',
        date: "2022-06-22",
        image: ""
      },
      {
        title: '几大超实用家庭版"紧致"训练指南！今天暂时...',
        date: "2022-06-22",
        image: ""
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: common_vendor.o(($event) => navigateTo("/pages/pinggu/pingjia/pingjia")),
        d: common_vendor.o(($event) => navigateTo("/pages/pinggu/fenshu/fenshu")),
        e: common_assets._imports_2,
        f: common_vendor.o(goToTrainingPage),
        g: common_vendor.t(trainingInfo.value.today_training_duration || 0),
        h: common_vendor.t(trainingInfo.value.total_training_duration || 0),
        i: common_vendor.t(trainingInfo.value.total_training_days || 0),
        j: common_vendor.f(bannerList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: `url(${item.image})`,
            c: index,
            d: common_vendor.o(($event) => handleBannerClick(item), index)
          };
        }),
        k: common_vendor.f(articles.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.date),
            c: item.image,
            d: index,
            e: common_vendor.o(($event) => handleBannerClick(item), index)
          };
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
