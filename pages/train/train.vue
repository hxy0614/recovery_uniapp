<template>
  <view class="container">
    <view class="chat-container">
      <scroll-view scroll-y class="message-list" :scroll-top="scrollTop">
        <view v-for="(message, index) in messages" :key="index" :class="['message', message.role === 'user' ? 'user-message' : 'ai-message']">
          <text>{{ message.content }}</text>
        </view>
      </scroll-view>
      <view class="input-area">
        <input v-model="inputValue" placeholder="请输入问题" :disabled="isLoading" />
        <button @click="sendQuestion" :disabled="isLoading">
          {{ isLoading ? '发送中...' : '发送' }}
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 聊天记录和输入值
const messages = ref<{ role: string; content: string }[]>([]); // 聊天记录
const inputValue = ref(''); // 用户输入
const isLoading = ref(false); // 加载状态
const scrollTop = ref(0); // 滚动位置

// 初始化欢迎消息
const initWelcomeMessage = () => {
  messages.value.push({
    role: 'ai',
    content: '🤓 欢迎使用 AI 医生应用！\n📌 输入你的病症或不适地方。',
  });
  scrollToBottom();
};

// 发送问题函数
const sendQuestion = async () => {
  const question = inputValue.value;
  if (!question || isLoading.value) return;

  // 添加用户消息
  messages.value.push({ role: 'user', content: question });
  inputValue.value = '';
  isLoading.value = true;

  // 滚动到底部
  scrollToBottom();

  // 调用后端API
  try {
    const res = await uni.request({
      url: 'http://192.168.236.62:3000/ask', // 替换为你的后端地址
      method: 'POST',
      data: { question },
    });
    const answer = res.data.answer;

    // 添加AI消息
    messages.value.push({ role: 'ai', content: answer });

    // 滚动到底部
    scrollToBottom();
  } catch (err) {
    console.error(err);
    uni.showToast({ title: '请求失败，请稍后重试', icon: 'none' });
  } finally {
    isLoading.value = false;
  }
};

// 滚动到底部
const scrollToBottom = () => {
  setTimeout(() => {
    scrollTop.value = 999999; // 设置一个足够大的值，确保滚动到底部
  }, 100);
};

// 初始化时显示欢迎消息
onMounted(() => {
  initWelcomeMessage();
});
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  max-width: 70%;
}

.user-message {
  background-color: #e0f7fa;
  align-self: flex-end;
}

.ai-message {
  background-color: #f5f5f5;
  align-self: flex-start;
}

.input-area {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
}

input {
  flex: 1;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
}
</style>