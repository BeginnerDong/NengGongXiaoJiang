<template>
	<view>

		<view class="userHead" style="background: #3a3a3a;">
			<view class="infor">
				<view class="left">
					<image class="photo" src="../../static/images/about-daka-img2.png" mode=""></image>
					<view style="width: 70%;">工人昵称</view>
				</view>
			</view>
		</view>
		
		<view class="userBox2 boxShaow">
			<view class="flexRowBetween tit">
				<view>信息设置</view>
			</view>
			<view class="menu flexRowBetween">
				<view class="child" @click=" Router.navigateTo({route:{path:'/pages/teamInfor/teamInfor'}})">
					<image src="../../static/images/workers-icon3.1.png"></image>
					<view>企业信息</view>
				</view>
				<view class="child" @click=" Router.navigateTo({route:{path:'/pages/designer_certificate/designer_certificate'}})">
					<image src="../../static/images/workers-icon3.2.png"></image>
					<view>资质证书</view>
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
			<view class="info" @click=" Router.navigateTo({route:{path:'/pages/designer_case/designer_case'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/workers-icon7.png"></image>
				</view>
				<view class="ilblock">案例管理</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
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
			<view class="info"  @click=" Router.navigateTo({route:{path:'/pages/worker_insurance/worker_insurance'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/workers-icon10.png"></image>
				</view>
				<view class="ilblock">购买保险</view>
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


		},
	};
</script>

<style>
	@import "../../assets/style/user.css";

</style>
