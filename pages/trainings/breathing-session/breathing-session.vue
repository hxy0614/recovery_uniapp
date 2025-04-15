<template>
  <view class="container">

    <!-- 训练信息 -->
    <view class="training-info">
      <view class="title">呼吸放松</view>
      <view class="tag">呼吸放松</view>
    </view>

    <!-- 训练数据卡片 -->
    <view class="stats-row">
      <view class="stat-card">
        <image src="/static/images/icons/actions.png" mode="aspectFit" class="icon"></image>
        <text class="label">动作组</text>
        <text class="value">0次</text>
      </view>
      <view class="stat-card">
        <image src="/static/images/icons/clock.png" mode="aspectFit" class="icon"></image>
        <text class="label">课程时长</text>
        <text class="value">5分钟</text>
      </view>
      <view class="stat-card">
        <image src="/static/images/icons/calendar.png" mode="aspectFit" class="icon"></image>
        <text class="label">参与本训练</text>
        <text class="value">{{trainingInfo.total_training_days || 0 }}天</text>
      </view>
    </view>

    <!-- 注意事项 -->
    <view class="notice-section">
      <view class="section-title">动作说明</view>
      <view class="divider"></view>
      <view class="section-title">注意事项</view>
      <view class="notice-list">
        <text>1.务必要排空膀胱</text>
        <text>2.选择一个舒适的姿势和环境</text>
        <text>3.保持身心放松</text>
        <text>4.正常呼吸，不要憋气</text>
        <text>5.尽量避免腹部、大腿内侧、臀部肌肉用力</text>
        <text>6.建议每天训练30分钟，请勿过量训练</text>
      </view>
      <view class="notice-warning">
        <text>注意：如果训练过程中感到疲劳或不适，请停止训练并咨询专业医生的意见</text>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="bottom-btn" @tap="startTraining">
      <text>立即训练</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';	

const trainingInfo = ref({
  today_training_duration: 0,
  total_training_duration: 0,
  total_training_days: 0,
});

const fetchTrainingInfo = async () => {
  const userId = uni.getStorageSync('userInfo').id; // 从本地存储中获取用户 ID
  if (!userId) {
    console.error('用户 ID 不存在');
    return;
  }

  uni.request({
    url: 'http://localhost:3000/training-info', // 后端接口地址
    method: 'GET',
    data: {
      userId,
    },
    success: (res) => {
      if (res.data.success) {
        // 更新训练信息
        trainingInfo.value = res.data.trainingInfo;
      } else {
        console.error('获取训练信息失败:', res.data.message);
      }
    },
    fail: (err) => {
      console.error('请求失败:', err);
    },
  });
};

// 页面加载时调用
onMounted(() => {
  fetchTrainingInfo();
});
	
const handleBack = () => {
  uni.navigateBack();
}

const startTraining = () => {
  uni.navigateTo({
    url: '/pages/trainings/breathing-exercise/breathing-exercise'
  });
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background: #FFFFFF;
  padding-bottom: 120rpx;
}

.header {
  display: flex;
  align-items: center;
  padding: 40px 20px 20px;
  
  .back-btn {
    padding: 10rpx;
    
    .back-icon {
      font-size: 40rpx;
      color: #333;
    }
  }
  
  .title {
    margin-left: 20rpx;
    font-size: 36rpx;
    font-weight: bold;
  }
}

.training-info {
  padding: 30rpx;
  
  .title {
    font-size: 40rpx;
    font-weight: bold;
    margin-bottom: 16rpx;
  }
  
  .tag {
    display: inline-block;
    font-size: 28rpx;
    color: #FF6B6B;
    padding: 8rpx 24rpx;
    border-radius: 100rpx;
    background: rgba(255, 107, 107, 0.1);
  }
}

.stats-row {
  display: flex;
  padding: 20rpx;
  gap: 20rpx;
  
  .stat-card {
    flex: 1;
    background: #F8F8F8;
    border-radius: 20rpx;
    padding: 30rpx;
    text-align: center;
    
    .icon {
      width: 48rpx;
      height: 48rpx;
      margin-bottom: 16rpx;
    }
    
    .label {
      font-size: 28rpx;
      color: #666;
      display: block;
      margin-bottom: 8rpx;
    }
    
    .value {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
    }
  }
}

.notice-section {
  padding: 30rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }
  
  .divider {
    height: 20rpx;
  }
  
  .notice-list {
    text {
      display: block;
      font-size: 28rpx;
      color: #666;
      line-height: 1.8;
    }
  }
  
  .notice-warning {
    margin-top: 30rpx;
    text {
      font-size: 28rpx;
      color: #FF6B6B;
    }
  }
}

.bottom-btn {
  position: fixed;
  bottom: 40rpx;
  left: 40rpx;
  right: 40rpx;
  background: #FF6B6B;
  color: #FFFFFF;
  text-align: center;
  padding: 30rpx;
  border-radius: 100rpx;
  font-size: 32rpx;
  font-weight: bold;
}
</style> 