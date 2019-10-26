<template>
	<view class="pub_editInfor">
		<view class="item">
			<view class="name">客户信息</view>
			<view class="rr">
				<input type="text" placeholder="请输入姓名" v-model="submitData.name"/>
			</view>
		</view>
		<view class="item">
			<view class="name">电话</view>
			<view class="rr">
				<input type="number" maxlength="11" placeholder="请输入电话" v-model="submitData.phone"/>
			</view>
		</view>
		<view class="item">
			<view class="name">验证码</view>
			<view class="rr pr">
				<input type="number" placeholder="请输入验证码"/>
				<view class="yzmBtn">获取验证码</view>
			</view>
		</view>
		
		<view class="submitbtn" style="margin-top: 200rpx;">
			<button type="submit" open-type="getUserInfo"  @getuserinfo="Utils.stopMultiClick(submit)">立即预约</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				Utils:this.$Utils,
				submitData:{
					name:'',
					phone:'',
				},
				mainData:{}
			}
		},
		
		onLoad() {
			const self = this;
			uni.setStorageSync('canClick',true);
			self.mainData = uni.getStorageSync('order');
			//self.$Utils.loadAll(['getMainData'], self);
			console.log('self.mainData',self.mainData)
			self.submitData.shop_no = self.mainData.product[0].product.user_no
		},
		
		methods: {
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);
				var phone = self.submitData.phone;			
				const pass = self.$Utils.checkComplete(self.submitData);
				console.log('pass', pass);
				console.log('self.submitData',self.submitData)
				if (pass) {
					if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('手机格式不正确', 'none')			
					} else {					
						const callback = (user, res) => {
							self.addOrder();
						};
						self.$Utils.getAuthSetting(callback);
						
					}
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息', 'none')
				};
			},
			
			addOrder() {
				const self = this;					
				const postData = self.$Utils.cloneForm(self.mainData)
				postData.tokenFuncName = 'getProjectToken';
				postData.snap_address = self.addressData;
				postData.parent = 1;
				postData.data = self.$Utils.cloneForm(self.submitData);
				const callback = (res) => {
					if (res && res.solely_code == 100000) {
						self.orderId = res.info.id;
						self.$Utils.showToast('预约成功', 'none')	
						setTimeout(function() {
							self.$Router.redirectTo({route:{path:'/pages/myToolingOrder/myToolingOrder'}})
						}, 1000);
					} else {		
						uni.setStorageSync('canClick', true);
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					};
					
				};
				self.$apis.addOrder(postData, callback);
			},

		},
	};
</script>

 
