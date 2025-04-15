<template>
  <view class="settings-container">
    <view class="settings-list">
      <view class="settings-item" @tap="showUserName">
        <text>用户名</text>
        <text class="username">{{ userInfo.name|| '未登录' }}</text>
      </view>
      
      <view class="settings-item logout" @tap="handleLogout">
        <text>登录/退出</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 从本地存储中读取用户信息
const userInfo = ref(uni.getStorageSync('userInfo') || {})

// 显示用户名
const showUserName = () => {
  uni.showModal({
    title: '用户名',
    content: userInfo.value.name || '未登录', // 显示用户名
    showCancel: false
  })
}

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要重新登录吗？',
    success: async (res) => {
      if (res.confirm) {
        // 显示退出中提示
        uni.showToast({
          title: '退出中...',
          icon: 'loading',
          duration: 300
        });
        
        // 清除本地存储
        uni.removeStorageSync('userInfo')
        
        // 跳转到登录页
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/login/login'
          })
        }, 2000); 
      }
    }
  })
}
</script>

<style lang="scss">
.settings-container {
  padding: 20rpx;
  
  .settings-list {
    background: #fff;
    border-radius: 20rpx;
    
    .settings-item {
      display: flex;
      justify-content: space-between;
      padding: 30rpx;
      border-bottom: 1rpx solid #eee;
      
      .username {
        color: #999;
      }
      
      &.logout {
        justify-content: center;
        color: #FF6B6B;
      }
    }
  }
}
</style>