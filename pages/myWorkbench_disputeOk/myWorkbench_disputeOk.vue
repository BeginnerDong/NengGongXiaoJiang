<template>
	<view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">纠纷类型</view>
		</view>
		<view class="flexRowBetween r-selt mglr4" style="padding-bottom: 30rpx;">
			<view class="selt"  @click="change('1')">
				<image src="../../static/images/case-icon2.png" mode=""></image>无理要求、无法完成
			</view>
		</view>
		<view class="f5H10"></view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">维权说明</view>
		</view>
		<view class="pdlr4">
			<textarea value="原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因原因." placeholder="请编辑原因···"  />
		</view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">添加附件</view>
		</view>
		<view class="pdlr4">
			<view class="uploadBtn">
				<image src="../../static/images/about-hetongbuchong-icon2.png" mode=""></image>
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
				wx_info:{},
				curr:1
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			change(curr){
				const self=this
				if(curr!=self.curr){
					self.curr=curr
				}
			},
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
	textarea{ width: 100%;height:220rpx; display: block; box-sizing: border-box; font-size: 28rpx; line-height: 44rpx; margin-bottom: 20rpx;padding: 20rpx;background: #F5F5F5;}
	.uploadBtn{width: 200rpx; height: 200rpx; margin-right: 20rpx;}
	.uploadBtn image{width: 100%; height: 100%; display: block;}
	
	.r-selt .selt{ width: 50%; justify-content: flex-start;}
</style>

 
