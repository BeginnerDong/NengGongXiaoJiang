<template>
	<view v-if="showPage">
		
		<image class="lgoin-topBj" src="../../static/images/regietered-img1.png" mode=""></image>
		<view class="login-box">
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon7.png" mode=""></image></view>
				<view class="rr">
					<input type="number" placeholder="输入手机号码" maxlength="11" v-model="phone">
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon5.png" mode=""></image></view>
				<view class="rr pr flexRowBetween">
					<view style="width: 50%;">
						<input type="number" placeholder="输入验证码" >
					</view>
					<view class="yzmBtn">获取验证码</view>
				</view>
			</view>
		</view>
		<view class="submitbtn" style="margin: 200rpx auto">
			<button type="submit" style="margin-bottom: 20rpx;" 
			@click="submit">登录</button>
			<view class="agreeSel">
				<view class="text color2" 
				@click=" Router.navigateTo({route:{path:'/pages/designer_register/designer_register?type='+type}})">没有账号，去注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				type:'',
				phone:'',
				showPage:false
			}
		},
		
		onLoad(options) {
			const self = this;
			self.type=options.type
			console.log('self.type',self.type)
			//self.$Utils.loadAll(['getMainData'], self);
			if(self.type=='worker'){
				self.identity=1
			}else if(self.type=='designer'){
				self.identity=2
			}else if(self.type=='supervision'){
				self.identity=0
			}
		},
		
		
		onShow() {
			const self = this;
			if(self.type=='worker'&&uni.getStorageSync('threeToken')&&uni.getStorageSync('threeInfo').identity==1){
				self.Router.redirectTo({route:{path:'/pages/worker_user/worker_user'}})
			}else if(self.type=='designer'&&uni.getStorageSync('threeToken')&&uni.getStorageSync('threeInfo').identity==2){
				self.Router.redirectTo({route:{path:'/pages/designer_user/designer_user'}})
			}else if(self.type=='supervision'&&uni.getStorageSync('threeToken')&&uni.getStorageSync('threeInfo').identity==0){
				self.Router.redirectTo({route:{path:'/pages/supervisor_user/supervisor_user'}})
			}else {
				self.showPage = true
			}
		},
		
		methods: {
			
			submit(){
				const self = this;
				self.login()
			},
			
			login() {
				const self = this;
				if(self.phone==''){
					self.$Utils.showToast('请输入账号', 'none', 1000);
					return
				};
				const postData = {
					login_name:self.phone,
					identity:self.identity
				};				
				const callback = (res) => {				
					if (res.solely_code == 100000) {					
						console.log(res)
						uni.setStorageSync('threeInfo',res.info)
						uni.setStorageSync('threeToken',res.token);
						if(self.type=='worker'){
							self.Router.redirectTo({route:{path:'/pages/worker_user/worker_user'}})
						}else if(self.type=='designer'){
							self.Router.redirectTo({route:{path:'/pages/designer_user/designer_user'}})
						}else if(self.type=='supervision'){
							self.Router.redirectTo({route:{path:'/pages/supervisor_user/supervisor_user'}})
						}
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(res.msg, 'none', 1000)
					}	
				};
				self.$apis.login(postData, callback);
			},
			
			superLogin() {
				const self = this;
				if(self.phone==''){
					self.$Utils.showToast('请输入账号', 'none', 1000);
					return
				};
				const postData = {
					login_name:self.phone,
					identity:self.identity
				};				
				const callback = (res) => {				
					if (res.solely_code == 100000) {					
						console.log(res)
						uni.setStorageSync('threeInfo',res.info)
						uni.setStorageSync('threeToken',res.token);
						self.Router.redirectTo({route:{path:'/pages/supervisor_user/supervisor_user'}})
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(res.msg, 'none', 1000)
					}	
				};
				self.$apis.superLogin(postData, callback);
			},
			
			

		},
	};
</script>

<style>
	
	@import "../../assets/style/login.css";
	
</style> 
