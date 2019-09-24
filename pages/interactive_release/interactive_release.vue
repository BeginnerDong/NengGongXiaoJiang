<template>
	<view class="fabuCont">
		<view class="">
			<textarea value="" placeholder="这一刻你的想法···" />
		</view>
		<view>
			<view class="uploadBtn">
				<image src="../../static/images/release-icon1.png" mode=""></image>
			</view>
		</view>
		
		<view class="submitbtn" style="margin-top: 200rpx;">
			<button type="submit">发布</button>
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
	.fabuCont{ padding: 30rpx 4%;}
	.fabuCont textarea{ width: 100%;height: 200rpx; display: block; box-sizing: border-box; font-size: 28rpx; line-height: 44rpx; margin-bottom: 20rpx;}
	.uploadBtn{width: 150rpx; height: 150rpx; margin-right: 20rpx;}
	.uploadBtn image{width: 100%; height: 100%; display: block;}
</style>

 
