<template>
	<view>
		<view class="work_indLis pdlr4 flexRowAround">
			<view class="item" @click=" Router.navigateTo({route:{path:'/pages/teamInfor_enterprise/teamInfor_enterprise'}})">
				<image src="../../static/images/about-workbench-icon1.png" alt=""/>
				<view class="tit">企业</view>
			</view>
			<view class="item" @click=" Router.navigateTo({route:{path:'/pages/teamInfor_personal/teamInfor_personal'}})">
				<image src="../../static/images/about-workbench-icon2.png" alt=""/>
				<view class="tit">个人</view>
			</view>
		</view>
		<view class="submitbtn" style="margin:100rpx auto">
			<button type="submit" style="margin-bottom: 20rpx;">下一步</button>
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
	@import "../../assets/style/user.css";
	.work_indLis{ flex-wrap: wrap; margin-top: 300rpx;}
	.work_indLis .item{ width: 50%; font-size: 26rpx; color: #666;padding: 40rpx 10rpx;box-sizing: border-box;text-align: center;}
	.work_indLis .item image{width: 120rpx; height: 120rpx;margin:20rpx auto; display: block;}
	

</style> 
