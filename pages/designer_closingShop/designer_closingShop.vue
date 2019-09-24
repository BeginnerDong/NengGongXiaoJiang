<template>
	<view class="pdlr4">
		<view class="toptit center">关闭说明</view>
		<view class="infor">
			<view class="cont">
				<view class="tit">一、标题标题标题标题标题标题标题</view>
				<view>1、内容内容内容内容内容内容内容内容内容内容内容</view>
				<view>2、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容</view>
				<view>3、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容</view>
				<view>4、内容内容内容内容内容内容内容容内容内容内容内容内容内容</view>
				<view>5、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容</view><view>1、内容内容内容内容内容内容内容内容内容内容内容</view>
				<view>6、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容</view>
			</view>
			<view class="submitbtn" style="margin-top: 140rpx;">
				<button type="button">确认关闭</button>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				showView: false,
				score: '',
				wx_info: {},
				current:1
			}
		},

		onLoad(options) {
			uni.setStorageSync('canClick', true);
		},

		onShow() {
			const self = this;
			document.title = ''
		},

		methods: {
			getMainData() {
				const self = this;
				self.$apis.userGet(postData, callback);
			}
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	@import "../../assets/style/quill.css";
	page{padding-bottom: 80rpx;}
	.toptit{font-size: 32rpx;padding: 40rpx 0;}
	.infor{ color: #666; line-height: 44rpx; font-size: 26rpx;}
	.infor .tit{color: #333; font-size: 28rpx;}
	.infor view{padding-bottom: 10rpx;}
	.infor image{max-width: 100%; margin: 0 auto;}
</style>
