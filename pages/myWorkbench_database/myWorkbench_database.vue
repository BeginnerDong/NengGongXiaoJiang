<template>
	<view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">历史资料</view>
		</view>
		<view class="ziliao_indLis pdlr4">
			<view class="item" v-for="(item,index) in ziliaoDate" :key="index">
				<view class="leftPic">
					<image src="../../static/images/about-hetongbuchong-icon1.png" mode=""></image>
				</view>
				<view class="infor">
					<view class="avoidOverflow">标题标题标题标题标题标题标题标题标题标题</view>
					<view class="party font12 color3">甲方</view>
					<view class="flexRowBetween last">
						<view class="upBtn">下载</view>
						<view class="delt">
							<image src="../../static/images/about-address-icon3.png" mode=""></image>
							删除
						</view>
					</view>
				</view>
			</view>
			<view class="submitbtn" style="margin-top: 100rpx;">
				<button type="button" @click="webSelf.$Router.navigateTo({route:{path:'/pages/myWorkbench_database_upmsg/myWorkbench_database_upmsg'}})">上传资料</button>
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
				ziliaoDate:[
					{},{},{}
				]
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
	page{padding-bottom: 60rpx;}
	.leftPic{width: 200rpx; height: 200rpx; display: block;}
	.ziliao_indLis .item{padding: 30rpx 0; display: flex; justify-content: space-between;border-bottom: 2rpx solid #E7E7E7;}
	.leftPic image{width: 100%;height: 100%;}
	.ziliao_indLis .infor{ width: 67%;}
	.last{margin-top: 80rpx;}
	.upBtn{ width: 100rpx; height: 50rpx; line-height: 50rpx; text-align: center;background: #FFCB1E; border-radius: 8rpx;}
	.delt{width: 110rpx; text-align: right;display: flex;justify-content: flex-end; color: #666;font-size: 24rpx;}
	.delt image{width: 30rpx;height: 30rpx; display: block; margin-right: 6rpx;}
</style>

 
