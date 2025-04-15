<template>
  <view class="form-container">
    <view class="form-title">妇产信息</view>
    
    <view class="form-item">
      <text class="label">怀孕次数</text>
      <input 
        type="number" 
        v-model="formData.pregnancyCount"
        placeholder="请输入" 
        class="input"
      />
    </view>
    
    <view class="form-item">
      <text class="label">分娩次数</text>
      <input 
        type="number" 
        v-model="formData.deliveryCount"
        placeholder="请输入" 
        class="input"
      />
    </view>
    
    <view class="form-item">
      <text class="label">流产次数</text>
      <input 
        type="number" 
        v-model="formData.abortionCount"
        placeholder="请输入" 
        class="input"
      />
    </view>
    
    <view class="form-item">
      <text class="label">就诊原因</text>
      <picker 
        @change="bindReasonChange" 
        :value="reasonIndex" 
        :range="reasons" 
        class="picker"
      >
        <view class="picker-text">{{ formData.reason || '请选择就诊原因' }}</view>
      </picker>
    </view>
    
    <button @tap="submitForm" class="submit-btn">确认</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        pregnancyCount: '',
        deliveryCount: '',
        abortionCount: '',
        reason: ''
      },
      reasons: ['产检', '见红', '腹痛', '其他'],
      reasonIndex: 0
    }
  },
  methods: {
    bindReasonChange(e) {
      this.reasonIndex = e.detail.value
      this.formData.reason = this.reasons[e.detail.value]
    },
    submitForm() {
      // 表单验证
      if (!this.formData.pregnancyCount) {
        uni.showToast({
          title: '请输入怀孕次数',
          icon: 'none'
        })
        return
      }
      if (!this.formData.deliveryCount) {
        uni.showToast({
          title: '请输入分娩次数',
          icon: 'none'
        })
        return
      }
      if (!this.formData.abortionCount) {
        uni.showToast({
          title: '请输入流产次数',
          icon: 'none'
        })
        return
      }
      if (!this.formData.reason) {
        uni.showToast({
          title: '请选择就诊原因',
          icon: 'none'
        })
        return
      }
      
      // 提交表单
      console.log('表单数据：', this.formData)
      uni.showToast({
        title: '提交成功',
        icon: 'success'
      })
    }
  }
}
</script>

<style>
.form-container {
  padding: 20rpx;
}

.form-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  padding-left: 20rpx;
  border-left: 4rpx solid #ff6b81;
}

.form-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}

.label {
  width: 180rpx;
  font-size: 28rpx;
  color: #333;
}

.input {
  flex: 1;
  font-size: 28rpx;
  padding: 0 20rpx;
}

.picker {
  flex: 1;
}

.picker-text {
  font-size: 28rpx;
  color: #666;
  padding: 0 20rpx;
}

.submit-btn {
  margin-top: 60rpx;
  background-color: #ff6b81;
  color: #fff;
  border-radius: 40rpx;
}

.submit-btn:active {
  opacity: 0.8;
}
</style>