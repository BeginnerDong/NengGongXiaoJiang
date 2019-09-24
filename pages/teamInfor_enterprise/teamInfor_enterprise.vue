<template>
	<view>
		<view class="caseSbmit">
			<form action="">
				<view class="eidt-line">
					<view class="ll">公司名称：</view>
					<view class="rr">
						<input type="text" placeholder="请输入公司名称">
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">成立时间：</view>
					<view class="rr pr" style="padding-right: 20rpx;">
						<input type="number" placeholder="请选择">
						<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">公司规模：</view>
					<view class="rr">
						<input type="text" placeholder="请输入公司规模" >
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">所在地：</view>
					<view class="rr pr" style="padding-right: 20rpx;">
						<input type="text" placeholder="请选择">
						<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">联系电话：</view>
					<view class="rr">
						<input type="number" placeholder="请输入联系电话" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" >
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">邮箱：</view>
					<view class="rr">
						<input type="text" placeholder="请输入邮箱">
					</view>
				</view>
				<view class="submitbtn" style="margin: 200rpx auto">
					<button type="submit" style="margin-bottom: 20rpx;">保存</button>
				</view>
			</form>
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
				is_show:false
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

</style> 
