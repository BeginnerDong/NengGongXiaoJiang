<template>
	<view class="pub_editInfor">
		<view class="item">
			<view class="name">手机号</view>
			<view class="rr">
				<input type="number" maxlength="11" placeholder="请输入电话"/>
			</view>
		</view>
		<view class="item">
			<view class="name">验证码</view>
			<view class="rr pr">
				<input type="number" placeholder="请输入电话"/>
				<view class="yzmBtn">获取验证码</view>
			</view>
		</view>
		<view class="item">
			<view class="name">兑换码</view>
			<view class="rr">
				<input type="text" placeholder="请输入星级兑换码"/>
			</view>
		</view>
		
		<view class="submitbtn" style="margin-top: 260rpx;">
			<button type="submit" @click="webSelf.$Router.navigateTo({route:{path:'/pages/confirmOrder/confirmOrder'}})">确定</button>
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

 
