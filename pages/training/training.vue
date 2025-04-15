<template>
  <view class="container">
    <view class="header">
      <view class="location">
        <uni-icons type="location" size="20"></uni-icons>
      </view>
      <view class="title">产后盆底康复助手</view>
      <view class="right-icons">
        <uni-icons type="more-filled" size="20"></uni-icons>
        <uni-icons type="scan" size="20"></uni-icons>
      </view>
    </view>

    <!-- 训练情况卡片 -->
    <view class="training-stats card">
          <view class="stats-title">
            <uni-icons type="bar" size="20" color="#FF6B6B"></uni-icons>
            <text>当前训练情况</text>
          </view>
          <view class="stats-content">
            <view class="stat-item">
              <text class="value">{{ trainingInfo.today_training_duration || 0 }}分钟</text>
              <text class="label">今日训练时长</text>
            </view>
            <view class="stat-item">
              <text class="value">{{ trainingInfo.total_training_duration || 0 }}分钟</text>
              <text class="label">累计训练时长</text>
            </view>
            <view class="stat-item">
              <text class="value">{{ trainingInfo.total_training_days || 0 }}天</text>
              <text class="label">累计训练天数</text>
            </view>
          </view>
        </view>

    <!-- 指南卡片行 -->
    <view class="guide-row">
      <view class="guide-card" @click="goToGuide">
        <text class="title">新手指引</text>
        <text class="subtitle">入门必读</text>
        <uni-icons type="book" size="24" color="#6BC4FF"></uni-icons> 
		<image src="/static/images/icons/book.png" mode="aspectFit"></image>
      </view>
      <view class="guide-card" @click="goToGuide">
        <text class="title">哑铃使用指导</text>
        <text class="subtitle">如何正确使用哑铃</text>
        <uni-icons type="dumbbell" size="24" color="#6BC4FF"></uni-icons>
		<image src="/static/images/icons/info.png" mode="aspectFit"></image>
      </view>
    </view>

    <!-- 训练类型网格 -->
    <view class="training-grid">
      <view class="grid-item" @tap="navigateTo('/pages/trainings/training-detail/training-detail')">
        <image src="/static/images/training/basic.png" mode="aspectFit"></image>
        <text class="title">盆底肌入门训练</text>
        <text class="status">暂未训练</text>
      </view>
      <view class="grid-item">
        <image src="/static/images/training/advanced.png" mode="aspectFit"></image>
        <text class="title">盆底肌进阶训练</text>
        <text class="status">暂未训练</text>
      </view>
      <view class="grid-item" @tap="navigateTo('/pages/trainings/breathing-detail/breathing-detail')">
        <image src="/static/images/training/breath.png" mode="aspectFit"></image>
        <text class="title">呼吸训练</text>
        <text class="status">暂未训练</text>
      </view>
      <view class="grid-item">
        <image src="/static/images/training/jili.png" mode="aspectFit"></image>
        <text class="title">初级激励训练</text>
        <text class="status">暂未训练</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
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


const navigateTo = (url: string) => {
  uni.navigateTo({
    url,
    success: () => {
      console.log('跳转成功')
    },
    fail: (err) => {
      console.error('跳转失败：', err)
      uni.showToast({
        title: '页面跳转失败',
        icon: 'none'
      })
    }
  })
}

const goToGuide = () => {
  console.log('点击了新手指引');
  uni.navigateTo({
    url: '/pages/guide/beginner/beginner',
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
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFE5D9 0%, #D4E5FF 100%);
  padding: 20rpx;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  
  .location {
    width: 60rpx;
  }
  
  .title {
    font-size: 32rpx;
    font-weight: bold;
  }
  
  .right-icons {
    display: flex;
    gap: 20rpx;
  }
}

.training-stats {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;

  .stats-title {
    display: flex;
    align-items: center;
    gap: 10rpx;
    margin-bottom: 20rpx;
    font-size: 28rpx;
    font-weight: bold;
  }

  .stats-content {
    display: flex;
    justify-content: space-between;
    
    .stat-item {
      text-align: center;
      
      .value {
        font-size: 36rpx;
        font-weight: bold;
        display: block;
        margin-bottom: 10rpx;
      }
      
      .label {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
}

.guide-row {
   display: flex;
   justify-content: space-between; // 确保左右分布
   gap: 20rpx; // 两个卡片之间的间距
   margin: 0 0 30rpx; // 上下外边距
  
    .guide-card {
      flex: 1;
      background: #FFFFFF;
      padding: 20rpx;
      border-radius: 20rpx;
      position: relative;
      box-shadow: 0 4rpx 12rpx rgba(255, 123, 123, 0.2); // 添加阴影效果
    
    .title {
		font-size: 28rpx;
    font-weight: bold;
		display: block;
		margin-bottom: 10rpx;
    }
		
	.subtitle {
	      font-size: 24rpx;
	      color: #999;
	    }	
	
	.uni-icons {
	      position: absolute;
	      right: 20rpx;
	      top: 50%;
	      transform: translateY(-50%);
		}
    
    image {
      position: absolute;
      right: 20rpx;
      top: 50%;
      transform: translateY(-50%);
      width: 60rpx;
      height: 60rpx;
      opacity: 0.8; // 调整透明度
  	  }
  	}
  }

  .training-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  
  .grid-item {
    background: #f8e7e5;
    border-radius: 20rpx;
    padding: 20rpx;
    text-align: center;
    
    image {
      width: 200rpx;
      height: 200rpx;
      margin-bottom: 10rpx;
    }
    
    .title {
      font-size: 28rpx;
      font-weight: bold;
      display: block;
      margin-bottom: 10rpx;
    }
    
    .status {
      font-size: 24rpx;
      color: #999;
    }
  }
}
</style>