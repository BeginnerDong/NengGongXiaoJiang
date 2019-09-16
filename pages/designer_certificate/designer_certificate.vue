<template>
	<view>
		<view class="fabubtn" @click="webSelf.$Router.navigateTo({route:{path:'/pages/designer_certificateDetail/designer_certificateDetail'}})">
			<view class="icon">
				<image src="../../static/images/certificate-icon1.png" mode=""></image>
			</view>
			<view class="tit" >添加证书</view>
		</view>
		<view class="myNeed_ind pdlr4">
			<view class="zizhiline boxShaow" v-for="(item,index) in zizhiData" :key="index" >
				<view class="item_delt pdlr4">
					<view class="deltBtn">
						<image class="deltIcon" src="../../static/images/certificate-icon2.png" mode=""></image>删除
					</view>
				</view>
				<view class="item flexRowBetween" @click="webSelf.$Router.navigateTo({route:{path:'/pages/designer_certificateDetail/designer_certificateDetail'}})">
					<view class="cont">
						<view class="lis flex">
							<image class="icon" src="../../static/images/certificate-icon3.png" mode=""></image>
							<view class="name">证书名称</view>
							<view class="tex">证书名称名称名称名称</view>
						</view>
						<view class="lis flex">
							<image class="icon" src="../../static/images/certificate-icon4.png" mode=""></image>
							<view class="name">获奖时间</view>
							<view class="tex">2019年内7月20日</view>
						</view>
					</view>
					<view class="arrow"><image src="../../static/images/arrow-icon1.png" mode=""></image></view>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				webSelf: this,
				showView: false,
				score: '',
				wx_info: {},
				current:1,
				zizhiData:[
					{},{}
				]
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
			getMainData() {
				const self = this;
				self.$apis.userGet(postData, callback);
			}
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	page{background: #f5f5f5; padding-bottom: 80rpx;}
	.item_delt{ display: flex;justify-content: flex-end; color: #999;}
	.deltIcon{ width: 30rpx; height: 30rpx;margin-right: 10rpx;}
	.myNeed_ind .item{margin-top: 20rpx; padding-top: 0rpx;}
	.zizhiline{background: #fff; margin-top: 30rpx;padding-top: 30rpx;border-radius: 10rpx; overflow: hidden;}
	.item_delt,.deltBtn{display: flex;justify-content: flex-end; align-items: center; font-size: 26rpx;}
	.deltIcon{ width:22rpx ; height: 27rpx; display: block;}
	
</style>
