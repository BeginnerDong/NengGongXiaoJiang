<template>
	<view>
		<view class="work_indLis pdlr4 flexRowBetween">
			<view class="item" @click="webSelf.$Router.navigateTo({route:{path:'/pages/myWorkbench_addContract/myWorkbench_addContract'}})">
				<image src="../../static/images/about-workbench-icon1.png" alt=""/>
				<view class="tit">发起补充合同</view>
			</view>
			<view class="item" @click="webSelf.$Router.navigateTo({route:{path:'/pages/myWorkbench_dispute/myWorkbench_dispute'}})">
				<image src="../../static/images/about-workbench-icon2.png" alt=""/>
				<view class="tit">维权争议</view>
			</view>
			<view class="item" @click="webSelf.$Router.navigateTo({route:{path:'/pages/myWorkbench_inspect/myWorkbench_inspect'}})">
				<image src="../../static/images/about-workbench-icon3.png" alt=""/>
				<view class="tit">验收申请</view>
			</view>
			<view class="item" @click="webSelf.$Router.navigateTo({route:{path:'/pages/myWorkbench_addBudget/myWorkbench_addBudget'}})">
				<image src="../../static/images/about-workbench-icon4.png" alt=""/>
				<view class="tit">预算申请</view>
			</view>
			<view class="item" @click="webSelf.$Router.navigateTo({route:{path:'/pages/myWorkbench_daka/myWorkbench_daka'}})">
				<image src="../../static/images/about-workbench-icon5.png" alt=""/>
				<view class="tit">工人打卡记录</view>
			</view>
			<view class="item" @click="webSelf.$Router.navigateTo({route:{path:'/pages/myWorkbench_database/myWorkbench_database'}})">
				<image src="../../static/images/about-workbench-icon6.png" alt=""/>
				<view class="tit">资料库</view>
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
	@import "../../assets/style/user.css";
	.work_indLis{ flex-wrap: wrap; margin-top: 200rpx;}
	.work_indLis .item{ width: 33.3%; font-size: 26rpx; color: #666;padding: 40rpx 10rpx;box-sizing: border-box;text-align: center;}
	.work_indLis .item image{width: 120rpx; height: 120rpx;margin:20rpx auto; display: block;}
	

</style> 
