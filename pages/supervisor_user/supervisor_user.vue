<template>
	<view>

		<view class="userHead"  style="background: #3a3a3a;">
			<view class="infor">
				<view class="left">
					<image class="photo" 
					:src="mainData.mainImg&&mainData.mainImg.length>0?mainData.mainImg[0].url:'../../static/images/qiyexinxi-icon2.png'" mode=""></image>
					<view style="width: 70%;">{{mainData.name}}</view>
				</view>
			</view>
		</view>
		
		<view class="userBox2 boxShaow">
			<view class="flexRowBetween tit">
				<view>信息设置</view>
			</view>
			<view class="menu flexRowBetween">
				<view class="child" @click=" Router.navigateTo({route:{path:'/pages/teamInfor_personal/teamInfor_personal'}})">
					<image src="../../static/images/supervision-icon2.png"></image>
					<view>基础信息</view>
				</view>
				<view class="child" @click=" Router.navigateTo({route:{path:'/pages/supervisor_signOut/supervisor_signOut'}})">
					<image src="../../static/images/supervision-icon1.png"></image>
					<view>退出监理</view>
				</view>
				<view class="child" @click=" Router.navigateTo({route:{path:'/pages/myBankList/myBankList'}})">
					<image src="../../static/images/workers-icon4.png"></image>
					<view>银行卡绑定</view>
				</view>
			</view>
		</view>
		
		<view class="XlineNav">
			<view class="info" @click=" Router.navigateTo({route:{path:'/pages/supervisorOrder/supervisorOrder'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/workers-icon5.png"></image>
				</view>
				<view class="ilblock">我的订单</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
			<view class="info" @click=" Router.navigateTo({route:{path:'/pages/designer_finance/designer_finance'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/workers-icon8.png"></image>
				</view>
				<view class="ilblock">财务管理</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
			<view class="info" @click=" Router.navigateTo({route:{path:'/pages/supervisor_help/supervisor_help'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/supervision-icon3.png"></image>
				</view>
				<view class="ilblock">帮助中心</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
			<view class="info"  @click=" Router.navigateTo({route:{path:'/pages/myExtend_starEdeem/myExtend_starEdeem'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/workers-icon9.png"></image>
				</view>
				<view class="ilblock">我的推广</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				mainData:{}
			}
		},
		
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		
		onShow() {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self);
		},
		
		methods: {
			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.tokenFuncName = 'getThreeToken';
				postData.searchItem = {
					user_no:uni.getStorageSync('threeInfo').user_no
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data[0]
					} else {
						self.$Utils.showToast(res.msg, 'none');
					};
					self.$Utils.finishFunc('getMainData');
			
				};
				self.$apis.userInfoGet(postData, callback);
			},

		},
	};
</script>

<style>
	@import "../../assets/style/user.css";
	.userBox2 .menu .child{width: 33.3%;}
</style>
