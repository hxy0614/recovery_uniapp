<template>
  <view class="login-container">
    <view class="logo">
      <image src="/static/images/logo.png" mode="aspectFit"></image>
      <text class="title">盆底小助手</text>
    </view>
   
    <view class="login-box">
      <view class="input-container">
        <input type="text" placeholder="请输入账号" class="input-field" v-model="account"/>
      </view>
      
      <view class="input-container">
        <input type="password" placeholder="请输入密码" class="input-field" v-model="password"/>
      </view>
      
      <button class="phone-btn" 
              @tap="handleLogin">
        登录
      </button>
      
      <view class="agreement">
        <checkbox :checked="isAgree" @tap="toggleAgreement"></checkbox>
        <text class="agreement-text">
          我已阅读并同意
          <text class="link">《用户协议》</text>
          和
          <text class="link">《隐私政策》</text>
        </text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isAgree = ref(false)
const account = ref('') // 绑定账号输入框
const password = ref('') // 绑定密码输入框

const toggleAgreement = () => {
  isAgree.value = !isAgree.value
}

// 登录方法
const handleLogin = async () => {
  if (!isAgree.value) {
    uni.showToast({
      title: '请先同意用户协议和隐私政策',
      icon: 'none'
    })
    return
  }

  if (!account.value || !password.value) {
    uni.showToast({
      title: '请输入账号和密码',
      icon: 'none'
    })
    return
  }

  // 发送登录请求
  uni.request({
    url: 'http://192.168.236.62:3000/login', // 后端登录接口
    method: 'POST',
    data: {
      account: account.value,
      password: password.value
    },
    success: (res) => {
      if (res.data.success) {
		// 存储用户信息到本地
		uni.setStorageSync('userInfo', res.data.user);
		
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        })
        // 登录成功后的操作，例如跳转到首页
		uni.navigateTo({
		  url: '/pages/setting/setting'
		})
      } else {
        uni.showToast({
          title: res.data.message || '账号或密码错误',
          icon: 'none'
        })
      }
    },
    fail: (err) => {
      uni.showToast({
        title: '登录失败，请稍后重试',
        icon: 'none'
      })
      console.error('登录请求失败:', err)
    }
  })
}
</script>

<style lang="scss">
.login-container {
  padding: 60rpx 40rpx;
  
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80rpx;
    
    image {
      width: 200rpx;
      height: 200rpx;
    }
    
    .title {
      font-size: 36rpx;
      font-weight: bold;
      margin-top: 20rpx;
    }
  }
  
  .login-box {
    .input-container {
      margin-bottom: 30rpx; /* 输入框之间的间距 */
    }
    
    .input-field {
      width: 100%; /* 输入框宽度 */
      padding: 15rpx; /* 内边距 */
      border: 1px solid #FF6B6B; /* 边框颜色 */
      border-radius: 30rpx; /* 圆角 */
      font-size: 28rpx; /* 字体大小 */
      color: #333; /* 字体颜色 */
      background-color: #fff; /* 背景颜色 */
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果 */
    }
    
    .phone-btn {
      background: #FF6B6B;
      color: #fff;
      border-radius: 45rpx;
      margin-bottom: 40rpx;
    }
    
    .agreement {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      color: #666;
      
      .link {
        color: #FF6B6B;
      }
    }
  }
}
</style>