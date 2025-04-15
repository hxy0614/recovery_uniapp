<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="title">产后盆底康复助手</view>
    </view>

    <!-- 预约和个人信息卡片 -->
    <view class="card-row"@tap="navigateTo('/pages/pinggu/fenshu/fenshu')">
      <view class="card">
        <view class="card-content">
          <text class="card-title">妇产信息</text>
          <text class="sub-text">查看信息</text>
        </view>
        <view class="icon-add">
          <image src="/static/images/icons/plus.png" mode="aspectFit" class="icon-image"></image>
        </view>
      </view>
       
      <view class="card"@tap="navigateTo('/pages/pinggu/pingjia/pingjia')">
        <view class="card-content">
          <text class="card-title">个人信息</text>
          <text class="sub-text">查看信息</text>
        </view>
        <view class="qr-icon">
          <image src="/static/images/icons/qr.png" mode="aspectFit" class="icon-image"></image>
        </view>
      </view>
    </view>

    <!-- 训练情况卡片 -->
    <view class="training-card">
      <view class="training-header">
        <view class="training-title">
          <image src="/static/images/icons/chart.png" mode="aspectFit" class="icon-image"></image>
          <text>训练情况</text>
        </view>
        <view class="training-btn" @click="goToTrainingPage">
          <button class="start-btn">立即训练</button>
        </view>
      </view>
      
      <view class="training-stats">
        <view class="stat-item">
          <text class="stat-value">{{ trainingInfo.today_training_duration || 0 }}分钟</text>
          <text class="stat-label">今日训练时长</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ trainingInfo.total_training_duration || 0 }}分钟</text>
          <text class="stat-label">累计训练时长</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ trainingInfo.total_training_days || 0 }}天</text>
          <text class="stat-label">累计训练天数</text>
        </view>
      </view>
    </view>

   <!-- 医生咨询轮播 -->
   <view class="doctor-banner">
     <swiper class="banner-swiper" circular autoplay interval="3000">
       <swiper-item v-for="(item, index) in bannerList" :key="index" @click="handleBannerClick(item)">
         <view class="banner-item" :style="{ backgroundImage: `url(${item.image})` }">
           <view class="banner-content">
             <view class="banner-title">{{item.title}}</view>
             <view class="banner-btn">查看详解</view>
           </view>
         </view>
       </swiper-item>
     </swiper>
   </view>


    <!-- 知识讲堂列表 -->
    <view class="knowledge-section">
      <view class="section-title">知识讲堂</view>
      <view class="article-list">
        <view class="article-item" v-for="(item, index) in articles" :key="index"@click="handleBannerClick(item)">
          <view class="article-info">
            <text class="article-title">{{item.title}}</text>
            <text class="article-date">{{item.date}}</text>
          </view>
          <image class="article-image" :src="item.image"></image>
        </view>
      </view>
    </view>
  </view>
</template>
 
  

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

import { ref, onMounted} from 'vue'

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

// 页面跳转方法
const goToTrainingPage = () => {
  // 使用 switchTab 来跳转到 TabBar 页面
  uni.switchTab({
    url: '/pages/training/training'
  });
};

//
const handleBannerClick = (item: any) => {
  if (item.path) {
    navigateTo(item.path)
  }
}


const bannerList = ref([  
  {
    title: '盆底康复',
    image: 'http://su3irlzut.hn-bkt.clouddn.com/doctor1.jpg',
    path: '/pages/jiaocheng/kangfu/kangfu'
  },
  {
    title: '专业指导',
    image: 'http://su3irlzut.hn-bkt.clouddn.com/doctor2.jpg',
    path: '/pages/jiaocheng/zhidao/zhidao'
  }
])



const articles = ref([
  {
    title: '几大超实用家庭版"紧致"训练指南！今天暂时...',
    date: '2022-06-22',
    image: '/static/images/article1.jpg',
	path: '/pages/news/news1/news1'
  },
  {
    title: '这几类人更容易出现产后盆腔器官脱垂，请...',
    date: '2022-06-22',
    image: '',
	path: 'https://mp.weixin.qq.com/s/ydRZvMpIfH98TnrvGwAqoA'
  },
  {
    title: '几大超实用家庭版"紧致"训练指南！今天暂时...',
    date: '2022-06-22',
    image: ''
  },
  {
    title: '几大超实用家庭版"紧致"训练指南！今天暂时...',
    date: '2022-06-22',
    image: ''
  },
  {
    title: '几大超实用家庭版"紧致"训练指南！今天暂时...',
    date: '2022-06-22',
    image: ''
  },
  {
    title: '几大超实用家庭版"紧致"训练指南！今天暂时...',
    date: '2022-06-22',
    image: ''
  }
])
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFE5D9 0%, #D4E5FF 100%);
  padding: 20rpx 20rpx 120rpx;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx 30rpx;
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
  }
  
  .right-icons {
    display: flex;
    gap: 20rpx;
  }
}
.card-row {
  display: flex;
  gap: 20rpx;
  margin: 30rpx 0;
  
  .card {
    flex: 1;
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .card-title {
      font-size: 28rpx;
      font-weight: bold;
    }
    
    .sub-text {
      font-size: 24rpx;
      color: #999;
      margin-top: 10rpx;
      display: block;
    }
  }
}

.training-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  
  .training-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    
    .training-title {
      display: flex;
      align-items: center;
      gap: 10rpx;
      font-size: 28rpx;
      font-weight: bold;
    }
  }
  
  .start-btn {
    background: #FF6B6B;
    color: #FFFFFF;
    font-size: 20rpx;
    padding: 10rpx 30rpx;
    border-radius: 20rpx;
  }
  
  .training-stats {
    display: flex;
    justify-content: space-around;
    text-align: center;
    
    .stat-item {
      .stat-value {
        font-size: 36rpx;
        font-weight: bold;
        display: block;
      }
      
      .stat-label {
        font-size: 24rpx;
        color: #999;
        margin-top: 10rpx;
      }
    }
  }
}

.doctor-banner {
  margin: 30rpx 0;
  border-radius: 20rpx;
  overflow: hidden;
  
  .banner-swiper {
    height: 240rpx;
  }
  
  .banner-item {
    position: relative;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 20rpx;
      display: flex;
      justify-content: center; // 水平居中
      align-items: center; // 垂直居中
      padding: 0 30rpx;
  }
  
  .doctor-image {
    width: 200rpx;
    height: 200rpx;
    margin-right: 30rpx;
  }
  
  .banner-content {
     position: relative;
      z-index: 1;
      text-align: center; // 文
    
    .banner-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
    }
    
    .banner-btn {
      display: inline-block;
      padding: 10rpx 30rpx;
      background: rgba(255, 107, 107, 0.1);
      border-radius: 30rpx;
      color: #FF6B6B;
      font-size: 24rpx;
    }
  }
}

.knowledge-section {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 30rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }
  
  .article-item {
    display: flex;
    justify-content: space-between;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #EEEEEE;
    
    &:last-child {
      border-bottom: none;
    }
    
    .article-info {
      flex: 1;
      padding-right: 20rpx;
    }
    
    .article-title {
      font-size: 28rpx;
      line-height: 1.4;
    }
    
    .article-date {
      font-size: 24rpx;
      color: #999;
      margin-top: 10rpx;
      display: block;
    }
    
    .article-image {
      width: 160rpx;
      height: 120rpx;
      border-radius: 10rpx;
    }
  }
}

// 添加图标样式
.icon-image {
  width: 40rpx;
  height: 40rpx;
}

.header {
  .right-icons {
    display: flex;
    gap: 20rpx;
    
    .icon-image {
      width: 40rpx;
      height: 40rpx;
    }
  }
}

.card {
  .icon-add,
  .qr-icon {
    .icon-image {
      width: 40rpx;
      height: 40rpx;
    }
  }
}

.training-title {
  display: flex;
  align-items: center;
  gap: 10rpx;
  
  .icon-image {
    width: 40rpx;
    height: 40rpx;
  }
}
	

</style>