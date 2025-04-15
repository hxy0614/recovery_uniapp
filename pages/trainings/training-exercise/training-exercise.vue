<template>
  <view class="container">

    <!-- 不使用哑铃按钮 -->
    <view class="toggle-btn">
      <text>不使用哑铃</text>
      <text class="icon">↻</text>
    </view>

    <!-- 训练状态显示 -->
    <view class="training-status">
      <text class="status-text">放松</text>
    </view>

    <!-- 倒计时显示 -->
    <view class="countdown">
      <text class="count-number">{{ secondsCount }}</text>
    </view>

    <!-- 底部信息 -->
    <view class="bottom-info">
      <view class="time-left">
        <text class="time">{{ formatTime(timeLeft) }}</text>
        <text class="label">剩余时间</text>
      </view>
      <view class="sets-count">
        <text class="count">{{ currentSet }}/53</text>
        <text class="label">动作组数</text>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="bottom-btn" @tap="toggleTraining">
      <text>{{ isTraining ? '暂停训练' : '开始训练' }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const secondsCount = ref(6);
const timeLeft = ref(15 * 60 + 1); // 15分01秒，转换为秒
const currentSet = ref(0);
const isTraining = ref(false);
let timer = null;

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

const saveTrainingData = async (duration) => {
    const userId = uni.getStorageSync('userInfo')?.id;
    if (!userId) {
        uni.showToast({ title: '请先登录', icon: 'none' });
        return;
    }

    try {
        const res = await uni.request({
            url: 'http://localhost:3000/training-save',
            method: 'POST',
            data: {
                userId,
                duration: Math.ceil(duration / 60)
            }
        });

        // 处理HTTP状态码
        if (res.statusCode !== 200) {
            throw new Error(`HTTP错误: ${res.statusCode}`);
        }

        // 处理业务逻辑错误
        if (res.data.code !== 200) {
            uni.showToast({ title: `保存失败: ${res.data.message}`, icon: 'none' });
        }
    } catch (err) {
        console.error('完整请求错误:', err);
        uni.showToast({ title: `请求失败: ${err.message}`, icon: 'none' });
    }
}

// 修改停止训练逻辑 
const stopTimer = () => {
    if (timer) {
        clearInterval(timer);
        timer = null;
        
        // 计算实际训练时长（秒）
        const trainedSeconds = 15 * 60 + 1 - timeLeft.value; 
        saveTrainingData(trainedSeconds);
    }
}

const startTimer = () => {
  timer = setInterval(() => {
    // 6秒倒计时
    secondsCount.value--;
    if (secondsCount.value === 0) {
      secondsCount.value = 6;
      currentSet.value++;
    }
    
    // 总时间倒计时
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      stopTimer();
    }
  }, 1000);
}


const toggleTraining = () => {
  isTraining.value = !isTraining.value;
  if (isTraining.value) {
    startTimer();
  } else {
    stopTimer();
	uni.redirectTo({
	      url: '/pages/trainings/training-session/training-session' // 替换为你的目标页面路径
	    });
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFE5D9 0%, #D4E5FF 100%);
  padding-bottom: 120rpx;
  position: relative;
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

.toggle-btn {
  margin: 30rpx;
  display: inline-flex;
  align-items: center;
  padding: 16rpx 32rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 100rpx;
  
  text {
    font-size: 28rpx;
    color: #FF6B6B;
  }
  
  .icon {
    margin-left: 10rpx;
  }
}

.training-status {
  text-align: center;
  margin-top: 100rpx;
  
  .status-text {
    font-size: 48rpx;
    font-weight: bold;
    color: #333;
  }
}

.countdown {
  text-align: center;
  margin-top: 160rpx;
  
  .count-number {
    font-size: 200rpx;
    font-weight: bold;
    color: #FF6B6B;
  }
}

.bottom-info {
  position: absolute;
  bottom: 200rpx;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 0 40rpx;
  
  .time-left, .sets-count {
    text-align: center;
    
    .time, .count {
      font-size: 48rpx;
      font-weight: bold;
      color: #333;
      display: block;
      margin-bottom: 10rpx;
    }
    
    .label {
      font-size: 28rpx;
      color: #666;
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