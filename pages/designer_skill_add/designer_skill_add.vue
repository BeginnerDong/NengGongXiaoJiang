<template>
	<view>
		
		<view class="pdlr4" style="padding-top: 40rpx;">
			<view class="font15 title">申请原因</view>
			<view class="rr styleLis">
				<view class="item" v-for="(item,index) in styleLis" :key="index">
					<view class="icon"><image src="../../static/images/about-address-icon4.png" alt=""/></view>
					<view class="tit">{{item}}</view>
				</view>
			</view>
		</view>
		<view class="f5H5"></view>
		<view class="flexRowBetween money">
			<view>价格</view>
			<view class="">
				<input type="number" value=""  style="text-align: right;" placeholder="请输入价格"/>
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
				wx_info:{},
				styleLis:['简约风','欧美风','田园风','欧式风','中国风','简约风','欧美风','田园风','欧式风','中国风','简约风','欧美风','田园风','欧式风','中国风']
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
	.styleLis{ width: 100%; display: flex; flex-wrap: wrap;justify-content: flex-start;padding-bottom: 20rpx;}
	.styleLis .item{margin:0rpx 30rpx 30rpx 0rpx;display: flex;justify-content: flex-start; align-items: center; box-sizing: border-box;width: 150rpx;}
	.styleLis .item:nth-child(4n){margin-right: 0;}
	.styleLis .item .icon{  width: 36rpx;height: 36rpx; margin-right: 10rpx;font-size: 26rpx;}
	.styleLis .item .icon image{width: 100%;height: 100%; display: block;}
	input{ width: 300rpx; height: 60rpx; line-height: 60rpx; text-align: right; display: block;}
</style>

 
