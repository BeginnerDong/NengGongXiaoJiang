<template>
	<view>

		<view class="userHead"  style="background: #3a3a3a;">
			<view class="infor">
				<view class="left">
					<image class="photo" 
					:src="mainData.info&&mainData.info.mainImg&&mainData.info.mainImg.length>0?mainData.info.mainImg[0].url:'../../static/images/qiyexinxi-icon2.png'" mode=""></image>
					<view style="width: 70%;">{{mainData.info?mainData.info.name:''}}</view>
				</view>
			</view>
		</view>
		
		<view class="userBox2 boxShaow">
			<view class="flexRowBetween tit">
				<view>信息设置</view>
			</view>
			<view class="menu flexRowBetween">
				<view class="child" @click="toDetail()">
					<image src="../../static/images/workers-icon3.1.png"></image>
					<view>个人信息</view>
				</view>
				<view class="child" @click=" Router.navigateTo({route:{path:'/pages/designer_case/designer_case'}})">
					<image src="../../static/images/workers-icon3.2.png"></image>
					<view>经典案例</view>
				</view>
				<view class="child" @click=" Router.navigateTo({route:{path:'/pages/designer_closingShop/designer_closingShop'}})">
					<image src="../../static/images/workers-icon3.png"></image>
					<view>关闭店铺</view>
				</view>
				<view class="child" @click=" Router.navigateTo({route:{path:'/pages/myBankList/myBankList'}})">
					<image src="../../static/images/workers-icon4.png"></image>
					<view>银行卡绑定</view>
				</view>
			</view>
		</view>
		
		<view class="XlineNav">
			<view class="info" @click=" Router.navigateTo({route:{path:'/pages/designerOrder/designerOrder'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/workers-icon5.png"></image>
				</view>
				<view class="ilblock">我的订单</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
			<view class="info" @click=" Router.navigateTo({route:{path:'/pages/designer_skill/designer_skill'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/workers-icon6.png"></image>
				</view>
				<view class="ilblock">技能管理</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
			<!-- <view class="info" @click=" Router.navigateTo({route:{path:'/pages/designer_case/designer_case'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/workers-icon7.png"></image>
				</view>
				<view class="ilblock">案例管理</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view> -->
			<view class="info" @click=" Router.navigateTo({route:{path:'/pages/designer_finance/designer_finance'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/workers-icon8.png"></image>
				</view>
				<view class="ilblock">财务管理</view>
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
				self.$apis.userGet(postData, callback);
			},
			
			toDetail(){
				const self = this;
				
				console.log(self.mainData.behavior)
				if(parseInt(self.mainData.behavior)==0){
					console.log(233)
					self.Router.navigateTo({route:{path:'/pages/teamInfor/teamInfor'}})
				}
				if(parseInt(self.mainData.behavior)==1){
					console.log(456)
					self.Router.navigateTo({route:{path:'/pages/teamInfor_personal/teamInfor_personal'}})
				} 
				if(parseInt(self.mainData.behavior)==2){
					self.Router.navigateTo({route:{path:'/pages/teamInfor_enterprise/teamInfor_enterprise'}})
				}
			},

		},
	};
</script>

<style>
	@import "../../assets/style/user.css";

</style>
