<template>
  <view class="container">
    <!-- 基础信息部分 -->
    <view class="section">
      <view class="section-title">基础信息</view>
      
      <view class="form-item">
        <text class="required">*</text>
        <text class="label">姓名</text>
        <input type="text" v-model="form.name" placeholder="请输入姓名" />
      </view>
      
      <view class="form-item">
        <text class="required">*</text>
        <text class="label">性别</text>
        <picker @change="bindGenderChange" :value="form.gender" :range="genderList">
          <view class="picker">{{genderList[form.gender] || '请选择性别'}}</view>
        </picker>
      </view>
      
      <view class="form-item">
        <text class="required">*</text>
        <text class="label">年龄</text>
        <input type="number" v-model="form.age" placeholder="请输入年龄" />
      </view>
      
      <view class="form-item">
        <text class="label">证件类型</text>
        <picker @change="bindIdTypeChange" :value="form.idType" :range="idTypeList">
          <view class="picker">{{idTypeList[form.idType] || '请选择证件类型'}}</view>
        </picker>
      </view>
      
      <view class="form-item">
        <text class="label">证件号码</text>
        <input type="text" v-model="form.idNumber" placeholder="请输入证件号码" />
      </view>
      
      <view class="form-item">
        <text class="label">出生日期</text>
        <picker mode="date" @change="bindBirthChange" :value="form.birth">
          <view class="picker">{{form.birth || '请选择出生日期'}}</view>
        </picker>
      </view>

      
      <view class="form-item">
        <text class="label">身高(cm)</text>
        <input type="number" v-model="form.height" placeholder="请输入身高" />
      </view>
      
      <view class="form-item">
        <text class="label">体重(kg)</text>
        <input type="number" v-model="form.weight" placeholder="请输入体重" />
      </view>
    </view>

   

    <!-- 确认按钮 -->
    <button class="submit-btn" @tap="submitForm">确认</button>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 表单数据
const form = reactive({
  name: '',
  gender: '',
  age: '',
  idType: '',
  idNumber: '',
  birth: '',
  phone: '',
  code: '',
  height: '',
  weight: '',
  pregnancyTimes: '',
  deliveryTimes: '',
  abortionTimes: '',
  reason: ''
})

// 选择器数据
const genderList = ['女', '男']
const idTypeList = ['身份证', '护照', '其他']
const reasonList = ['产后康复', '尿失禁', '其他']

// 获取验证码
const getCode = () => {
  if (!form.phone) {
    uni.showToast({
      title: '请先输入手机号',
      icon: 'none'
    })
    return
  }
  // TODO: 调用获取验证码接口
}

// 选择器改变事件
const bindGenderChange = (e: any) => {
  form.gender = e.detail.value
}

const bindIdTypeChange = (e: any) => {
  form.idType = e.detail.value
}

const bindBirthChange = (e: any) => {
  form.birth = e.detail.value
}

const bindReasonChange = (e: any) => {
  form.reason = e.detail.value
}

// 提交表单
const submitForm = () => {
  // 表单验证
  if (!form.name || !form.gender || !form.age || !form.phone || !form.code) {
    uni.showToast({
      title: '请填写必填项',
      icon: 'none'
    })
    return
  }
  
  // TODO: 调用提交接口
  console.log('提交的表单数据：', form)
}
</script>

<style lang="scss">
.container {
  padding: 20rpx;
  background: #f5f5f5;
}

.section {
  background: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
    padding-left: 20rpx;
    border-left: 4rpx solid #ff6b6b;
  }
}

.form-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
  
  .required {
    color: #ff6b6b;
    margin-right: 5rpx;
  }
  
  .label {
    width: 180rpx;
    color: #333;
    font-size: 28rpx;
  }
  
  input {
    flex: 1;
    font-size: 28rpx;
  }
  
  .picker {
    flex: 1;
    font-size: 28rpx;
    color: #333;
  }
  
  .code-btn {
    width: 200rpx;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 24rpx;
    color: #fff;
    background: #ff6b6b;
    border-radius: 30rpx;
    margin-left: 20rpx;
  }
}

.submit-btn {
  width: 90%;
  height: 80rpx;
  line-height: 80rpx;
  background: #ff6b6b;
  color: #fff;
  font-size: 32rpx;
  border-radius: 40rpx;
  margin-top: 40rpx;
}
</style>