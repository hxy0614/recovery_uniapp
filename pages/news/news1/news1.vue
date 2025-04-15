<template>
  <view class="article-container">
    <!-- 文章内容 -->
    <view class="article-content">
      <!-- 标题 -->
      <view class="article-title">
        几大超实用家庭版"紧致"训练指南
      </view>
      
      <!-- 正文内容 -->
      <view class="article-text">
        <view class="paragraph">
          盆底肌肉是位于骨盆底部的一组肌肉，就像一个吊床一样支撑着盆腔内的器官。它的功能包括控制排尿、排便，以及维持盆腔器官的位置。
        </view>
        
        <!-- 图片部分 -->
        <view class="image-section">
          <image src="/static/images/article/diagram.png" mode="widthFix"></image>
          <view class="image-caption"></view>
        </view>
        
        <!-- 训练步骤 -->
        <view class="training-steps">
          <view class="step-item">
            <view class="step-number">1</view>
            <view class="step-content">
              <text class="step-title">找到正确的肌肉</text>
              <text class="step-desc">尝试在排尿时中断尿流，能够中断尿流的肌肉就是盆底肌群。</text>
            </view>
          </view>
          
          <!-- 训练图示 -->
          <view class="training-image">
            <image src="/static/images/article/trainings.png" mode="widthFix"></image>
          </view>
          
          <view class="step-item">
            <view class="step-number">2</view>
            <view class="step-content">
              <text class="step-title">基础训练方法</text>
              <text class="step-desc">收缩盆底肌5秒，放松5秒，重复10次为一组。</text>
            </view>
          </view>
        </view>
        
        <!-- 注意事项 -->
        <view class="tips-section">
          <view class="tips-title">注意事项：</view>
          <view class="tips-list">
            <view class="tip-item">• 训练时保持正常呼吸</view>
            <view class="tip-item">• 避免收缩其他肌肉群</view>
            <view class="tip-item">• 每天坚持训练2-3组</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 可以添加需要的交互逻辑
</script>

<style lang="scss">
.article-container {
  padding: 30rpx;
  background: #fff;
}

.article-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
}

.article-text {
  .paragraph {
    font-size: 28rpx;
    line-height: 1.8;
    color: #666;
    margin-bottom: 20rpx;
  }
}

.image-section {
  margin: 30rpx 0;
  
  image {
    width: 100%;
    border-radius: 12rpx;
  }
  
  .image-caption {
    font-size: 24rpx;
    color: #999;
    text-align: center;
    margin-top: 10rpx;
  }
}

.training-steps {
  margin: 30rpx 0;
  
  .step-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 30rpx;
    
    .step-number {
      width: 40rpx;
      height: 40rpx;
      background: #ff6b6b;
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24rpx;
      margin-right: 20rpx;
      flex-shrink: 0;
    }
    
    .step-content {
      flex: 1;
      
      .step-title {
        font-size: 30rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 10rpx;
        display: block;
      }
      
      .step-desc {
        font-size: 28rpx;
        color: #666;
        line-height: 1.6;
      }
    }
  }
  
  .training-image {
    margin: 20rpx 0;
    
    image {
      width: 100%;
      border-radius: 12rpx;
    }
  }
}

.tips-section {
  background: #f8f8f8;
  padding: 20rpx;
  border-radius: 12rpx;
  
  .tips-title {
    font-size: 30rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 15rpx;
  }
  
  .tips-list {
    .tip-item {
      font-size: 26rpx;
      color: #666;
      line-height: 1.8;
      padding-left: 20rpx;
    }
  }
}
</style>