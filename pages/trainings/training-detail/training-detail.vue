<template>

  <view class="container">

    <!-- 训练信息卡片 -->

    <view class="info-cards">
      <view class="info-card">
        <text class="label">动作数量</text>
        <text class="value">0个动作</text>
        <image src="/static/images/icons/actions.png" mode="aspectFit" class="card-icon"></image>
      </view>
      <view class="info-card">
        <text class="label">所需哑铃</text>
        <text class="value">无需哑铃</text>
        <image src="/static/images/icons/dumbbell.png" mode="aspectFit" class="card-icon"></image>
      </view>
    </view>



    <!-- 训练内容区域 -->

    <view class="training-sections">
      <view class="section">
        <text class="section-title">训练简介</text>
        <view class="intro-content">
          <view class="intro-text">
            <text>训练者体位----放置时半仰卧位</text>
            <text>使用哑铃训练时：球体处理----建议在球体</text>
            <view v-if="isIntroExpanded">
              <text>顶部涂抹润滑剂（冬天也可用温水）</text>
              <text>放置深度----球体尾部距离阴道口一指节（2cm）</text>
            </view>
          </view>
          <view class="toggle-btn" @tap="toggleIntro">
            <text>{{ isIntroExpanded ? '收起' : '详情' }}</text>
            <text class="toggle-icon" :class="{ 'expanded': isIntroExpanded }">〉</text>
          </view>
        </view>
      </view>
	  
      <view class="section">
        <text class="section-title">训练周期</text>
        <view class="period-content">
          <text>建议一天两次</text>
        </view>
      </view>

      <view class="section">
        <text class="section-title">训练安排</text>
        <text class="training-days">已训练{{trainingInfo.total_training_days}}天</text>

        <!-- 添加训练项目卡片 -->

        <view class="training-item" @tap="startTraining">
          <view class="training-info">
            <text class="item-title">3秒慢肌训练</text>
            <text class="item-duration">暂未训练 15分钟</text>
          </view>
		  
          <view class="training-status">
            <text class="status-text">未完成</text>
            <text class="arrow-icon">〉</text>
          </view>
        </view>
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
    url: '/pages/trainings/training-session/training-session'
  });

}



const isIntroExpanded = ref(false);



const toggleIntro = () => {
  isIntroExpanded.value = !isIntroExpanded.value;
}

</script>



<style lang="scss">

.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFE5D9 0%, #D4E5FF 100%);
  padding: 0;
  position: relative;

}



.header {
  display: flex;
  justify-content: space-between;
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
    font-size: 36rpx;
    font-weight: bold;
  }

  

  .right-icons {
    width: 40rpx;
    height: 40rpx;
  }
}



.course-title {
  padding: 30rpx;
  font-size: 48rpx;
  font-weight: bold;
}



.info-cards {

  display: flex;
  padding: 20rpx;
  gap: 20rpx;

  .info-card {
    flex: 1;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20rpx;
    padding: 30rpx;
    position: relative;

    .label {
      font-size: 28rpx;
      color: #666;
      display: block;
    }

    .value {
      font-size: 32rpx;
      font-weight: bold;
      margin-top: 10rpx;
      display: block;
    }

    

    .card-icon {
      position: absolute;
      right: 20rpx;
      top: 50%;
      transform: translateY(-50%);
      width: 60rpx;
      height: 60rpx;
      opacity: 0.6;
    }
  }
}



.training-sections {
  padding: 30rpx;
  .section {
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #FF6B6B;
      position: relative;
      padding-left: 20rpx;
      margin-bottom: 20rpx;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 6rpx;
        height: 30rpx;
        background: #FF6B6B;
        border-radius: 3rpx;
      }

    }

    

    .training-days {
      float: right;
      font-size: 28rpx;
      color: #999;
    }



    // 添加训练项目样式

    .training-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      margin-top: 20rpx;
      border: 2rpx solid #F0F0F0;
      border-radius: 16rpx;

      

      .training-info {
        .item-title {
          font-size: 32rpx;
          font-weight: bold;
          color: #333;
          display: block;
          margin-bottom: 8rpx;
        }

        

        .item-duration {
          font-size: 28rpx;
          color: #999;
        }

      }

      

      .training-status {
        display: flex;
        align-items: center;
        gap: 10rpx;

        

        .status-text {
          font-size: 28rpx;
          color: #999;
        }

        

        .arrow-icon {
          font-size: 28rpx;
          color: #999;
        }
      }
    }



    .intro-content {
      margin-top: 20rpx;
      .intro-text {
        text {
          display: block;
          font-size: 28rpx;
          color: #666;
          line-height: 1.6;
          margin-bottom: 10rpx;
        }
      }

      

      .toggle-btn {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 10rpx 0;

        text {
          font-size: 28rpx;
          color: #FF6B6B;
        }

        

        .toggle-icon {
          display: inline-block;
          margin-left: 6rpx;
          transform: rotate(90deg);
          transition: transform 0.3s ease;
          &.expanded {
            transform: rotate(-90deg);
          }
        }
      }
    }

    .period-content {
      margin-top: 20rpx;
      text {
        display: block;
        font-size: 32rpx;
        color: #333;
        line-height: 1.6;
        font-weight: bold;
      }
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
