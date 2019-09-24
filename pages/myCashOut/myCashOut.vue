<template>
	<view>
		<!-- <view class="center addBtn"  @click=" Router.navigateTo({route:{path:'/pages/addBankCard/addBankCard'}})">
			<image src="../../static/images/withdrawal-icon.png" mode=""></image>
			添加银行卡
		</view> -->
		
		<!-- 添加银行卡后显示 -->
		<view class="flexRowBetween bankmsg addBtn" style="justify-content: space-between;">
			<view>到账银行卡</view>
			<view class="lft font12">
				中国银行
				<view class="color2 num">(2356)</view>
			</view>
			<view @click=" Router.navigateTo({route:{path:'/pages/myBankList/myBankList'}})">
				<image style="width: 14rpx; height: 28rpx;" src="../../static/images/about-icon1.png" mode=""></image>
			</view>
		</view>
		
		<view class="editMoney mglr4">
			<view class="tit">提现金额</view>
			<view class="input">
				<input type="number" value="1212">
			</view>
			<view class="flexRowBetween font12 color3">
				<view>本次可提现金额200元</view>
				<view style="color: #537DEB;">全部提现</view>
			</view>
			<view class="submitbtn">
				<button type="button"  style="margin: 100rpx auto 30rpx auto;border-radius: 50rpx;">提现</button>
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
				score:'',
				wx_info:{},
				
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
	/* @import "../../assets/style/common.css"; */
	page{ background: #f5f5f5;}
	
	.bankmsg .lft{ display: flex; justify-content: flex-start; align-items: center; font-size: 26rpx;color: #999;}
	.bankmsg .lft .num{ margin-left: 20rpx; font-size: 26rpx;}
	
	.addBtn{ margin: 100rpx 4% 0rpx 4%; background: #fff;border-radius: 10rpx; display: flex; align-items: center;justify-content: center; height: 100rpx; font-size: 30rpx;padding: 0 30rpx;}
	.addBtn image{ width: 40rpx; height: 40rpx; margin-right: 20rpx;}
	
	.editMoney{padding: 30rpx;background: #fff;}
	.editMoney .tit{ font-size: 28rpx; line-height: 80rpx;}
	.editMoney .input{ display: flex; justify-content: flex-start; line-height: 100rpx; margin-bottom: 10rpx;}
	.editMoney .input input{ font-size: 60rpx; line-height: 100rpx; display: block; width: 80%; height: 100rpx; box-sizing: border-box;}
	.editMoney .input::before{content: "￥"; font-size: 50rpx; margin-right: 10rpx;}
</style> 
