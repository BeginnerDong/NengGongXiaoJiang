<template>
	<view>
		
		<view class="pdlr4">
			<view class="inforOne">
				<view class="font15 tit">2019-06-04 星期三</view>
				<view class="flexRowBetween time">
					<view class="left">20:03:00</view>
					<view class="btn">下班</view>
				</view>
			</view>
			
			<view class="inforOne">
				<view class="upPhoto">
					<view class="name">下班拍照</view>
					<view class="phto">
						<image src="../../static/images/daka-icon3.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="submitbtn" style="margin-top: 300rpx;">
			<button type="button">确定</button>
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
	page{padding-bottom: 60rpx; background: #f5f5f5;}
	.inforOne{background: #fff;border-radius: 10rpx; margin-top: 30rpx;padding: 30rpx;box-sizing: border-box; }
	.time{ margin-top: 20rpx;}
	.time .left{font-size: 40rpx;}
	.time .btn{width: 100rpx;height: 100rpx; line-height: 100rpx;text-align: center;font-size: 28rpx;background: #FFCB1E;border-radius: 50%;}
	.upPhoto{ display: flex; justify-content: flex-start;}
	.upPhoto .name{ margin-right: 10rpx; width: 140rpx;}
	.phto{width:460rpx;}
	.phto image{width: 150rpx; height: 150rpx; display: block;margin-right: 30rpx;}
</style>

 
