<template>
	<view class="pdlr4">
			<view class="myaddress-lis">
				<view class="adrs">中国银行 <text class="color3 font12">对公</text></view>
				<view class="name">**** **** **** 2356</view>
				<view class="seltBox">
					<view class="L">
						<image class="icon" src="../../static/images/shopping-icon4.png" alt=""></image>
						默认银行卡
					</view>
					<view class="R">
						<view class="child"><image src="../../static/images/about-address-icon2.png" mode=""></image>编辑</view>
						<view class="child" @click="deltAlert"><image src="../../static/images/about-address-icon3.png" mode=""></image>删除</view>
					</view>
					
				</view>
			</view>
			<view class="myaddress-lis">
				<view class="adrs">中国银行 <text class="color3 font12">对公</text></view>
				<view class="name">**** **** **** 2356</view>
			
				<view class="seltBox">
					<view class="L">
						<image class="icon" src="../../static/images/shopping-icon1.png" alt=""></image>
						默认银行卡
					</view>
					<view class="R">
						<view class="child"><image src="../../static/images/about-address-icon2.png" mode=""></image>编辑</view>
						<view class="child" @click="deltAlert"><image src="../../static/images/about-address-icon3.png" mode=""></image>删除</view>
					</view>
					
				</view>
			</view>
			
			<view class="submitbtn" style="margin-top: 200rpx;">
				<button type="button"  @click=" Router.navigateTo({route:{path:'/pages/myBankListMsg/myBankListMsg'}})">添加银行卡</button>
			</view>
			<view class="xieyiAlert" v-if="is_show">
				<view class="infor center" style="padding: 120rpx 30px;height: auto;border-radius: 10rpx;">
					<view class="colseBtn"  @click="deltAlert" style="top: 20rpx;right: 20rpx;left:auto;">×</view>
					<view class="tit font16" style="padding-bottom: 60rpx;">确认是否删除这个技能</view>
					<view class="btnB flexRowBetween">
						<view :class="num==1? 'on':''" @click="chage('1')">是</view>
						<view :class="num==2? 'on':''" @click="chage('2')">否</view>
					</view>
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
				is_show:false,
				num:1
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
			chage(num){
				const self = this;
				if(num!=self.num){
					self.num=num
				}
			},
			deltAlert(){
				const self = this;
				self.is_show=!self.is_show;
			},

			getMainData() {
				const self = this;
				self.$apis.userGet(postData, callback);
			}
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	page{ background: #f5f5f5;}
	.myaddress-lis{padding:30rpx;margin-bottom: 20rpx;background: #fff; margin-bottom: 30rpx;border-radius: 10rpx; margin-top: 30rpx;}
	.myaddress-lis .name{ font-size: 28rpx; color: #222;padding: 10rpx 0;}
	.myaddress-lis .adrs{ font-size: 26rpx;color: #999; line-height: 40rpx;}
	.seltBox{ display: flex;justify-content: space-between; align-items: center;padding-top: 10rpx;}
	.seltBox .L{ width: 30%; display: flex; align-items: center; font-size: 24rpx; color: #999;}
	.seltBox .L .icon{ width: 30rpx; height: 30rpx; display: inline-block; margin-right: 10rpx;}
	.seltBox .R{display: flex; align-items: center; width: 70%; justify-content: flex-end;}
	.seltBox .R .child{margin-left: 30rpx; display: flex; justify-content: flex-end; font-size: 24rpx; color: #999;}
	.seltBox .R image{  width:30rpx; height: 30rpx; display:block; margin-right: 8rpx;}
	
	.btnB{ width: 60%;margin: 0 auto;}
	.btnB view{width: 100rpx; line-height: 50rpx; height: 50rpx;border-radius: 30rpx;border:2rpx solid #626262;}
	.btnB view.on{background: #626262;color: #fff;}
</style>
