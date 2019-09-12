<template>
	<view>
		<view class="flexRowBetween money">
			<view>当前余额</view>
			<view class="price">566.23</view>
		</view>
		<view class="f5H5"></view>
		
		<view class="pdlr4" style="padding-top: 40rpx;">
			<view class="font15 title">申请原因</view>
			<view class="">
				<textarea value="原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因" placeholder="" />
			</view>
		</view>
		<view class="f5H5"></view>
		<view class="flexRowBetween money">
			<view>申请金额</view>
			<view class="">
				<input type="number" value=""  style="text-align: right;" placeholder="请输入金额"/>
			</view>
		</view>
		<view class="f5H5"></view>
		
		
		<view class="submitbtn" style="margin-top: 200rpx;">
			<button type="submit">确认</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webSelf: this,
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
	textarea{ width: 100%;height: 300rpx; display: block; box-sizing: border-box; font-size: 28rpx; line-height: 44rpx; margin-bottom:30rpx;padding: 20rpx;background: #F5F5F5;}
	input{ width: 300rpx; height: 60rpx; line-height: 60rpx; text-align: right; display: block;}
</style>

 
