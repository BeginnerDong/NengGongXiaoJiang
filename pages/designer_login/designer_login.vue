<template>
	<view>
		
		<image class="lgoin-topBj" src="../../static/images/regietered-img1.png" mode=""></image>
		<view class="login-box">
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon7.png" mode=""></image></view>
				<view class="rr">
					<input type="number" placeholder="输入手机号码" maxlength="11">
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon5.png" mode=""></image></view>
				<view class="rr pr flexRowBetween">
					<view style="width: 50%;">
						<input type="number" placeholder="输入验证码">
					</view>
					<view class="yzmBtn">获取验证码</view>
				</view>
			</view>
		</view>
		<view class="submitbtn" style="margin: 200rpx auto">
			<button type="submit" style="margin-bottom: 20rpx;" @click=" Router.navigateTo({route:{path:'/pages/designer_user/designer_user'}})">登录</button>
			<view class="agreeSel">
				<view class="text color2" @click=" Router.navigateTo({route:{path:'/pages/designer_register/designer_register'}})">没有账号，去注册</view>
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
			xieyiAlert(){
				const self = this;
				self.is_show=!self.is_show;
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
	@import "../../assets/style/user.css";
</style> 
