<template>
	<view>
		
		<view class="flexRowBetween bankmsg addBtn" v-if="mainData.number" style="justify-content: space-between;">
			<view>到账银行卡</view>
			<view class="lft font12">
				{{mainData.label&&mainData.label[0]?mainData.label[0].title:''}}
				<view class="color2 num">({{mainData.number}})</view>
			</view>
			<view @click=" Router.navigateTo({route:{path:'/pages/myBankList/myBankList'}})">
				<image style="width: 14rpx; height: 28rpx;" src="../../static/images/about-icon1.png" mode=""></image>
			</view>
		</view>
		
		<view class="center addBtn" v-else  @click=" Router.navigateTo({route:{path:'/pages/addBankCard/addBankCard'}})">
			<image src="../../static/images/withdrawal-icon.png" mode=""></image>
			添加银行卡
		</view>
		
		<!-- 添加银行卡后显示 -->
		
		
		<view class="editMoney mglr4">
			<view class="tit">提现金额</view>
			<view class="input">
				<input type="number" v-model="submitData.count">
			</view>
			<view class="flexRowBetween font12 color3">
				<view>本次可提现金额{{userInfoData.balance}}元</view>
				<view style="color: #537DEB;" @click="allCount">全部提现</view>
			</view>
			<view class="submitbtn">
				<button type="button"  style="margin: 100rpx auto 30rpx auto;border-radius: 50rpx;" 
				open-type="getUserInfo"  @getuserinfo="Utils.stopMultiClick(submit)">提现</button>
			</view>
		</view>


		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,	
				Utils:this.$Utils,
				mainData:{},
				userInfoData:{},
				submitData:{
					count:''
				}
			}
		},
		onLoad(options) {
			const self = this;
			self.type = options.type;
			console.log('self.type',self.type)
			self.$Utils.loadAll(['getMainData','getUserInfoData'], self);
		},
		methods: {
			
			allCount(){
				const self = this;
				self.submitData.count = self.userInfoData.balance
			},
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);
				if(!self.mainData.number){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请先绑定银行卡', 'none');
					return
				};
				const pass = self.$Utils.checkComplete(self.submitData);
				console.log('self.submitData',self.submitData)
				if (pass) {
					if(parseFloat(self.submitData.count)>parseFloat(self.userInfoData.balance)){
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('余额不足', 'none');
						return
					};
					if(parseFloat(self.submitData.count)<=0){
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('请输入正确的金额', 'none');
						return
					};
					
					const callback = (user, res) => {
						self.flowLogAdd();
					};
					self.$Utils.getAuthSetting(callback);	
					
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请输入提现金额', 'none')
				};
			},
			
			flowLogAdd() {
				const self = this;
				const postData = {};
				if(self.type==0){
					postData.tokenFuncName = 'getProjectToken'
				}else{
					postData.tokenFuncName = 'getThreeToken'
				};
				if(!wx.getStorageSync('user_info')||!wx.getStorageSync('user_info').headImgUrl){
				  postData.refreshToken = true;
				};
				postData.data = {
					count:self.submitData.count,
					thirdapp_id:2,
					status:0,
					trade_info:'提现',
					type:2
				};
				
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('提交成功', 'none');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 800)
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.flowLogAdd(postData, callback);
			},
			
			
			getUserInfoData() {
				const self = this;
				console.log('852369')
				const postData = {
					searchItem:{}
				};
				if(self.type==0){
					postData.tokenFuncName = 'getProjectToken';
					postData.searchItem.user_no = uni.getStorageSync('user_info').user_no
				}else{
					postData.tokenFuncName = 'getThreeToken';
					postData.searchItem.user_no = uni.getStorageSync('threeInfo').user_no
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.userInfoData = res.info.data[0]
					} else {
						self.$Utils.showToast(res.msg, 'none');
					};
					self.$Utils.finishFunc('getUserInfoData');
			
				};
				self.$apis.userInfoGet(postData, callback);
			},

			getMainData() {
				const self = this;
			
				const postData = {};
				if(self.type==0){
					postData.tokenFuncName = 'getProjectToken';
				}else{
					postData.tokenFuncName = 'getThreeToken';
				};
				postData.searchItem = {
					isdefault:1
				};
				postData.getAfter ={
					label:{			
						tableName:'Label',
						middleKey:'bank',
						key:'id',
						condition:'=',
						searchItem:{
							status:1,
						}
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						self.mainData.number = self.mainData.number.substr(self.mainData.number.length-4)			
					}
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.cardGet(postData, callback);
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
