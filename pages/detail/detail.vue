<template>
	<view class="container">
		<view class="logo-section">
			<image class="logo" src="/static/images/logo.png" mode="aspectFit"></image>
			<text class="title">产后盆底康复小助手</text>
		</view>
		
		<view class="menu-list">
			<view class="menu-item" @click="navigateTo('/pages/about/privacy/privacy')">
				<text>隐私政策</text>
				<text class="arrow">></text>
			</view>
			<view class="menu-item" @click="navigateTo('/pages/about/agreement/agreement')">
				<text>用户协议</text>
				<text class="arrow">></text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		navigateTo(url) {
			uni.navigateTo({
				url: url
			})
		}
	}
}
</script>

<style>
.container {
	padding: 20px;
}

.logo-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 40px;
}

.logo {
	width: 100px;
	height: 100px;
	border-radius: 20px;
}

.title {
	margin-top: 15px;
	font-size: 18px;
	color: #333;
}

.menu-list {
	background-color: #fff;
	border-radius: 10px;
}

.menu-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	border-bottom: 1px solid #eee;
}

.menu-item:last-child {
	border-bottom: none;
}

.arrow {
	color: #999;
}
</style>