<template>
	<view>
		<view class="pdlr4" style="padding-top: 40rpx;">
			<view class="font15 title">工作进度</view>
			<view class="tex color2">1、内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
			<view class="tex color2">2、内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
			<view class="tex color2">3、内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
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
	.title{padding-bottom: 30rpx;}
	.tex{padding-bottom: 20rpx;}
	.money{padding: 30rpx 4%;}
</style>

 
