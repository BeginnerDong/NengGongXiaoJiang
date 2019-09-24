<template>
	<view>

		<view class="userHead">
			<view class="infor">
				<view class="left">
					<image class="photo" src="../../static/images/about-daka-img2.png" mode=""></image>
					<view style="width: 70%;">昵称昵称昵称昵称</view>
				</view>
			</view>
		</view>
		
		<view class="userBox2 boxShaow">
			<view class="flexRowBetween tit">
				<view>我的订单</view>
				<view class="more" @click=" Router.navigateTo({route:{path:'/pages/myOderList/myOderList'}})">全部订单 &gt;</view>
			</view>
			<view class="menu flexRowBetween">
				<view class="child" @click=" Router.navigateTo({route:{path:'/pages/myOderList/myOderList'}})">
					<image src="../../static/images/about-icon2.png"></image>
					<view>待支付</view>
				</view>
				<view class="child" @click=" Router.navigateTo({route:{path:'/pages/myOderList/myOderList'}})">
					<image src="../../static/images/about-icon3.png"></image>
					<view>待发货</view>
				</view>
				<view class="child" @click=" Router.navigateTo({route:{path:'/pages/myOderList/myOderList'}})">
					<image src="../../static/images/about-icon4.png"></image>
					<view>待收货</view>
				</view>
				<view class="child" @click=" Router.navigateTo({route:{path:'/pages/myOderList/myOderList'}})" >
					<image src="../../static/images/about-icon5.png"></image>
					<view>已完成</view>
				</view>
			</view>
		</view>
		
		<view class="XlineNav">
			<view class="info" @click=" Router.navigateTo({route:{path:'/pages/myToolingOrder/myToolingOrder'}})" >
				<view class="ilblock listimg">
					<image src="../../static/images/about-icon6.png"></image>
				</view>
				<view class="ilblock">工装订单</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
			<view class="info"  @click=" Router.navigateTo({route:{path:'/pages/myNeeds/myNeeds'}})" >
				<view class="ilblock listimg">
					<image src="../../static/images/about-icon7.png"></image>
				</view>
				<view class="ilblock">我的需求</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
			<view class="info"  @click=" Router.navigateTo({route:{path:'/pages/myCollection/myCollection'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/about-icon8.png"></image>
				</view>
				<view class="ilblock">我的收藏</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
			<view class="info"  @click=" Router.navigateTo({route:{path:'/pages/myFootprint/myFootprint'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/about-icon9.png"></image>
				</view>
				<view class="ilblock">浏览足迹</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
			<view class="info" @click=" Router.navigateTo({route:{path:'/pages/myEvaluate/myEvaluate'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/about-icon10.png"></image>
				</view>
				<view class="ilblock">我的评价</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
			<view class="info" @click=" Router.navigateTo({route:{path:'/pages/myExtend/myExtend'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/about-icon11.png"></image>
				</view>
				<view class="ilblock">我的推广</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
			<view class="f5H10"></view>
			<view class="info" @click=" Router.navigateTo({route:{path:'/pages/designer_login/designer_login'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/about-icon12.png"></image>
				</view>
				<view class="ilblock">设计师</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
			<view class="info" @click=" Router.navigateTo({route:{path:'/pages/worker_user/worker_user'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/about-icon13.png"></image>
				</view>
				<view class="ilblock">工人</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
			<view class="info" @click=" Router.navigateTo({route:{path:'/pages/supervisor_user/supervisor_user'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/about-icon14.png"></image>
				</view>
				<view class="ilblock">监理</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
			<view class="info" @click=" Router.navigateTo({route:{path:'/pages/myBusinessRegister/myBusinessRegister'}})">
				<view class="ilblock listimg">
					<image src="../../static/images/about-icon15.png"></image>
				</view>
				<view class="ilblock">商家注册</view>
				<image class="arrow" src="../../static/images/arrow-icon1.png" ></image>
			</view>
		</view>
		<view style="height: 40rpx;width: 100%;background: #f5f5f5;"></view>

		
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
