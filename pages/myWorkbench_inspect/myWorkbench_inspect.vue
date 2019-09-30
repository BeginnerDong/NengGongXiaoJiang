<template>
	<view>
		<view class="pdlr4" style="padding-top: 40rpx;">
			<view class="font15 title">工作进度</view>
			<textarea placeholder="请输入工作进度"></textarea>
		</view>
		<view class="f5H5"></view>
		<view class="flexRowBetween money">
			<view>尾款余额</view>
			<view class="price">562.00</view>
		</view>
		<view class="f5H5"></view>
		
		<view class="submitbtn" style="margin-top: 200rpx;">
			<button type="submit">确认验收</button>
		</view>
		<view class="submitbtn" style="margin-top: 200rpx;">
			<button type="submit">申请验收</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				showView: false,
				score:'',
				wx_info:{}
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';

				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data;
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMainData');

				};
				self.$apis.orderGet(postData, callback);

			},

		},
	};
</script>
<style>
			textarea{ width: 100%;height: 350rpx; display: block; box-sizing: border-box; font-size: 28rpx; line-height: 44rpx; margin-bottom: 20rpx;padding: 20rpx;background: #F5F5F5;}
	.title{padding-bottom: 30rpx;}
	.tex{padding-bottom: 20rpx;}
	.money{padding: 30rpx 4%;}
</style>

 
