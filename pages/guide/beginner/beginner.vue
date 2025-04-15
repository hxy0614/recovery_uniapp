<template>
  <view class="guide-container">
    <!-- 标签切换 -->
    <view class="tabs">
      <view class="tab-item" 
            v-for="(tab, index) in tabs" 
            :key="index"
            :class="{ active: currentTab === index }"
            @click="switchTab(index)">
        {{ tab }}
        <view class="tab-line" v-show="currentTab === index"></view>
      </view>
    </view>

    <!-- 新手指引内容 -->
    <view v-show="currentTab === 0" class="content">
      <scroll-view scroll-y class="scroll-area">
        <!-- 盆底肌介绍 -->
        <view class="section">
          <view class="section-title">盆底肌介绍</view>
          <view class="section-content">
            盆底肌是指封闭骨盆底的肌肉群。这一肌肉群犹如一张"吊网"，尿道、膀胱、阴道、子宫、直肠等脏器被这张"网"紧紧吊住，从而维持正常位置以便行使其功能。一旦这张"网"弹性变差，"吊力"不足，便会导致"网"内的器官无法维持在正常位置，从而出现相应功能障碍，如大小便失禁、盆底脏器脱垂等。
          </view>
          <image src="/static/images/guide/pelvic.png" mode="widthFix" class="guide-image"></image>
        </view>

        <!-- 如何正确收缩放松盆底肌 -->
        <view class="section">
          <view class="section-title">如何收缩放松盆底肌肉</view>
          <view class="instruction-card">
            <image src="/static/images/guide/instruction.png" mode="widthFix" class="instruction-image"></image>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 哑铃使用指导内容 -->
    <view v-show="currentTab === 1" class="content">
      <scroll-view scroll-y class="scroll-area">
        <view class="video-container">
          <video
            src=""
            controls
            show-play-btn
            class="guide-video"
            muted
          ></video>
        </view>

        <view class="instruction">
          <view class="main-title">如何正确使用这款阴道哑铃？</view>

          <view class="step-item">
            <text class="step-num">1. 第一步：</text>
            <text class="step-title">清水清洗润滑</text>
            <text class="step-desc">为避免交叉感染，阴道哑铃应专人专用</text>
          </view>

          <view class="step-item">
            <text class="step-num">2. 第二步：</text>
            <text class="step-title">缓慢放入</text>
            <text class="step-desc">使用者采取半仰卧位，缓慢将阴道哑铃放入阴道，阴道哑铃的头部尾端距阴道口2cm左右，收缩盆底肌肉，感觉到阴道哑铃在上升，表明位置放置正确，接下来就可以放心锻炼了。</text>
          </view>

          <view class="step-item">
            <text class="step-num">3. 第三步：</text>
            <text class="step-title">使用完毕后</text>
            <text class="step-desc">将阴道哑铃用清水清洗，并用干毛巾擦拭干净后，放回阴道哑铃盒内</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 底部按钮 -->
    <view class="bottom-button" @click="goToTraining">
      <text>开始训练</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const tabs = ref(['新手指引', '哑铃使用指导']);
const currentTab = ref(0);

const switchTab = (index) => {
  currentTab.value = index;
};

const goToTraining= () => {
  console.log('开始训练');
  uni.switchTab({
    url: '/pages/training/training',
    success: () => {
      console.log('跳转成功');
    },
    fail: (err) => {
      console.error('跳转失败', err);
    }
  });
};
</script>

<style lang="scss">
.guide-container {
  min-height: 100vh;
  background: #FFF;
  padding-bottom: 120rpx; // 为底部按钮留出空间
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  padding: 20rpx 30rpx;
  background: #FFF;

  .tab-item {
    position: relative;
    padding: 20rpx 0;
    margin-right: 40rpx;
    font-size: 32rpx;
    color: #333;
    transition: all 0.3s ease; // 添加过渡效果

    &.active {
      color: #333;
      font-weight: bold;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 40rpx;
        height: 6rpx;
        background: #ffcf7b;
        border-radius: 3rpx;
      }
    }

    .tab-line {
      width: 40rpx;
      height: 6rpx;
      background: #ffefd9;
      border-radius: 3rpx;
      position: absolute;
      bottom: 0;
      left: 0;
      transition: all 0.3s ease; // 添加过渡效果
    }
  }
}

.content {
  padding: 30rpx;
  flex: 1;
  position: relative;

  .scroll-area {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 30rpx;
  }

  .section {
    margin-bottom: 40rpx;
    transition: opacity 0.3s ease;

    &.fade-enter-active,
    &.fade-leave-active {
      transition: opacity 0.3s ease;
    }

    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }

    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
      position: relative;
      padding-left: 20rpx;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 6rpx;
        height: 30rpx;
        background: #ffcf7b;
        border-radius: 3rpx;
      }
    }

    .section-content {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
    }

    .guide-image {
      width: 100%;
      margin: 20rpx 0;
      border-radius: 20rpx;
    }

    .instruction-card {
      background: #fffcf5;
      border-radius: 20rpx;
      padding: 20rpx;

      .instruction-image {
        width: 100%;
      }
    }
  }

  .video-container {
    width: 100%;
    height: 400rpx;
    background: #f5f5f5;
    border-radius: 20rpx;
    margin-bottom: 40rpx;
    overflow: hidden;

    .guide-video {
      width: 100%;
      height: 100%;
    }
  }

  .instruction {
    .main-title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 30rpx;
    }

    .step-item {
      margin-bottom: 30rpx;

      .step-num {
        font-size: 30rpx;
        font-weight: bold;
        color: #333;
      }

      .step-title {
        font-size: 30rpx;
        color: #ff875b;
        font-weight: bold;
      }

      .step-desc {
        display: block;
        font-size: 28rpx;
        color: #666;
        line-height: 1.6;
        margin-top: 10rpx;
      }
    }
  }
}

.bottom-button {
  position: fixed;
  bottom: 40rpx;
  left: 30rpx;
  right: 30rpx;
  height: 88rpx;
  background: linear-gradient(135deg, #ff7b7b 0%, #ff875b 100%);
  color: #FFF;
  font-size: 32rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 44rpx;
  box-shadow: 0 4rpx 12rpx rgba(255, 123, 156, 0.3);
  background-color: #FF7B9C;
  color: white;
  padding: 10rpx;
  border-radius: 5rpx;
  text-align: center;
  cursor: pointer;

  &:active {
    transform: scale(0.98);
  }
}
</style>
