<template>
  <view class="container">
    <view class="header">
      <view class="title"></view>
    </view>
 
    <!-- 用户信息 -->
    <view class="user-info"> 
      <image class="avatar" src="/static/images/icons/default-avatar.png" style="vertical-align:middle;"></image>
      <text class="nickname">请创建你的档案</text>
    </view>
  
    <!-- 功能卡片组 -->
    <!-- 功能卡片组 -->
    <view class="function-group"> 
      <view class="function-row">  
        <!-- 个人信息 -->
        <view class="function-item" @tap="navigateTo('/pages/pinggu/fenshu/fenshu')">
          <image src="/static/images/icons/person.png" mode="aspectFit" class="icon-image" ></image>
          <text>个人信息</text>
        </view>
        <!-- 预约记录 -->
        <view class="function-item" @tap="navigateTo('/pages/appointment/appointment')">
          <image src="/static/images/icons/calendar.png" mode="aspectFit" class="icon-image"></image>
          <text>预约记录</text>
        </view>
        <!-- AI医生 -->
        <view class="function-item" @tap="navigateTo('/pages/train/train')">
          <image src="/static/images/icons/flag.png" mode="aspectFit" class="icon-image"></image>
          <text>AI医生</text>
        </view>
      </view>
    </view>
 
    <!-- 设置列表 --> 
    <view class="settings-list">
      <view class="settings-item" 
            v-for="(item, index) in settingsList" 
            :key="index"
            @tap="handleSettingsTap(item)">
        <view class="left">
          <image :src="`/static/images/icons/${item.icon}.png`" mode="aspectFit" class="icon-image"></image>
          <text>{{item.name}}</text>
        </view> 
        <image src="/static/images/icons/right.png" mode="aspectFit" class="icon-image"></image>
      </view>
    </view>
  </view> 
</template>

<script setup lang="ts">


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
import { ref } from 'vue'
const settingsList = ref([
  {
    name: '设置',
    icon: 'gear',
    path: '/pages/setting/setting'
  },
  {
    name: '解除科室绑定',
    icon: 'link',
    path: ''
  },
  {
    name: '扫一扫',
    icon: 'scan',
    path: ''
  },
  {
    name: '关于',
    icon: 'info',
    path: '/pages/detail/detail'
  }
])

const handleSettingsTap = (item) => {
  if (item.name === '扫一扫') {
    uni.scanCode({
      success: (res) => {
        console.log('扫码结果：', res.result)
      }
    })
  } else {
    uni.navigateTo({
      url: item.path
    })
  }
}
</script>

<style lang="scss"> 
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFE5D9 0%, #D4E5FF 100%);
  padding: 20rpx;
}

.user-info {
  text-align: center;
  padding: 50rpx 0;
  position: relative;
  
  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 65rpx;
    margin-bottom: 20rpx;
  }
  
  .nickname {
    font-size: 32rpx;
    color: #333;
	padding: 0 100rpx; 
  }
  
  .setting-icon {
    position: absolute;
    right: 20rpx;
    top: 20rpx;
  }
}

.function-group {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  
  .function-row {
    display: flex;
    justify-content: space-around;
    
    .function-item {
      text-align: center;
	  padding: 0 70rpx;
      
      .icon-image {
        width: 100rpx;
        height: 64rpx;
        margin-bottom: 0rpx;
      }
      
      text {
        font-size: 24rpx;
        color: #666;
      }
    }
  }
}

.settings-list {
  background: #FFFFFF;
  border-radius: 20rpx; 
  padding: 0 20rpx;
  
  .settings-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 35rpx 0;
	
	
    border-bottom: 1rpx solid #EEEEEE;
    
    &:last-child { 
      border-bottom: none;
    }
	
    .left {
      display: flex;
      align-items: center;
      gap: 20rpx;
      
      text {
        font-size: 28rpx;
        color: #333;
      }
    }
    
    .icon-image {
      width: 48rpx;
      height: 48rpx;
    }
    
    .left .icon-image {
      margin-right: 20rpx;
    }
  }
}

</style>