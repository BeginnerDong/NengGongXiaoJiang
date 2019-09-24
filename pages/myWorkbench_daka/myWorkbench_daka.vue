<template>
	<view>
		
		<view class="dakaJilu pdlr4">
			<view class="item" v-for="(item,index) in dakaDate">
				<view class="font15">2019-06-04 星期三</view>
				<view class="font13 line">
					<view class="flex timebox">
						<view class="tit">上班：</view>
						<view class="tt">09:00:00</view>
					</view>
				</view>
				<view class="font13 line">
					<view class="flex timebox">
						<view class="tit">下班：</view>
						<view class="tt">18:00:00</view>
					</view>
					<view class="pic">
						<image src="../../static/images/about-daka-img1.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="fabubtn" style="top: 28%;"  @click="refundAlert">
			<view class="icon">
				<image src="../../static/images/daka-icon1.png" mode=""></image>
			</view>
			<view class="tit">上班</view>
		</view>
		
		<view class="fabubtn"  style="top: 45%;" @click=" Router.navigateTo({route:{path:'/pages/myWorkbench_daka_goOff/myWorkbench_daka_goOff'}})">
			<view class="icon">
				<image src="../../static/images/daka-icon2.png" mode=""></image>
			</view>
			<view class="tit" >下班</view>
		</view>
		
		<!-- 打卡弹框 -->
		<view class="dakaAlert center" v-if="is_show">
			<view class="colseBtn"  @click="refundAlert">×</view>
			<view class="tit">打卡成功</view>
			<view class="time">09:00:00</view>
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
				wx_info:{},
				is_show:false,
				dakaDate:[
					{},{},{}
				]
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			refundAlert(){
				const self = this;
				self.is_show = !self.is_show
			},
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
	page{background: #F5F5F5;padding-bottom: 60rpx;}
	.dakaJilu .item{padding: 30rpx;background: #fff;border-radius: 10rpx; margin-top: 30rpx;}
	.dakaJilu .line{padding-top:26rpx; font-size: 26rpx; display: flex;}
	.dakaJilu .line .timebox{width: 300rpx; align-items: normal;}
	.dakaJilu .line .tit{width: 120rpx;}
	.dakaJilu .line .tt{width: 180rpx;}
	.dakaJilu .line .pic{width: 350rpx;}
	.dakaJilu .line .pic image{width: 150rpx; height: 150rpx;display: block;margin-right: 20rpx;}
	
	.dakaAlert{ position: fixed; top: 50%;left: 50%; transform: translate(-50%,-50%); width: 80%;padding: 80rpx 3%;background: rgba(0,0,0,0.5); color: #fff;box-sizing: border-box; z-index: 66;border-radius: 12rpx;}
	.dakaAlert .colseBtn{ border: 2rpx solid #ffff; color: #fff;background: none; left: auto; right: 20rpx; top: 20rpx; transform: initial;}
	.dakaAlert .tit{font-size: 32rpx;margin-bottom: 40rpx;}
	.dakaAlert .time{font-size: 60rpx;}
	
	
</style>

 
