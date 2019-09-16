<template>
	<view>
		
		<view class="infor-title flexRowBetween">
			<view class="tt">标题</view>
		</view>
		<view class="pdlr4">
			<textarea value="" placeholder="这一刻你的想法···" />
		</view>
		
		<view class="infor-title flexRowBetween">
			<view class="tt">添加附件</view>
		</view>
		<view class="pdlr4">
			<view class="uploadBtn">
				<image src="../../static/images/about-hetongbuchong-icon1.png" mode=""></image>
			</view>
		</view>
		
		<view class="submitbtn" style="margin-top: 200rpx;">
			<button type="submit" @click="webSelf.$Router.navigateTo({route:{path:'/pages/myWorkbench_database/myWorkbench_database'}})">确认上传</button>
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
				wx_info:{}
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
	.infor-title{margin-bottom: 30rpx;}
	.fabuCont{ padding: 30rpx 4%;}
	textarea{ width: 100%;height: 300rpx; display: block; box-sizing: border-box; font-size: 28rpx; line-height: 44rpx; margin-bottom: 20rpx;padding: 20rpx;background: #F5F5F5;}
	.uploadBtn{width: 200rpx; height: 200rpx; margin-right: 20rpx;}
	.uploadBtn image{width: 100%; height: 100%; display: block;}
</style>

 
