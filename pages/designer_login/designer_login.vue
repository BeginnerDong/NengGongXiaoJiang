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
				<view class="icon"><image src="../../static/images/regietered-icon7.png" mode=""></image></view>
				<view class="rr">
					<input type="text" placeholder="输入密码"  v-model="password">
				</view>
			</view>
			<!-- <view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon5.png" mode=""></image></view>
				<view class="rr pr flexRowBetween">
					<view style="width: 50%;">
						<input type="number" placeholder="输入验证码" v-model="code">
					</view>
					<view class="yzmBtn" @click="sendCode()" v-if="!hasSend">{{text}}</view>
					<view class="yzmBtn"  v-else>{{text}}</view>
				</view>
			</view> -->
			<view class="findPswd">
				<view class="font13" @click="Router.navigateTo({route:{path:'/pages/designer_password/designer_password'}})">找回密码</view>
			</view>
		</view>
		<view class="submitbtn" style="margin: 200rpx auto 60rpx auto">
			<button type="submit" style="margin-bottom: 20rpx;" 
			@click="submit">登录</button>
			<view class="agreeSel">
				<view class="text color2" 
				@click="Router.navigateTo({route:{path:'/pages/designer_register/designer_register?type='+type}})">没有账号，去注册</view>
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
				showPage:false,
				//code:'',
				currentTime:61,
				text:'获取验证码',
				hasSend:false,
				password:''
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
				/* if(self.code==''){
					self.$Utils.showToast('请输入验证码', 'none', 1000);
					return
				}; */
				const postData = {
					login_name:self.phone,
					identity:self.identity,
					password:self.password
				};			
				/* postData.smsAuth = {
					phone:self.phone,						
					code:self.code					,
				}; */
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
			
			sendCode(){
				var self = this;
				console.log(111)
				if(self.hasSend){
					return;
				};
				var phone = self.phone;
				
				if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
					self.$Utils.showToast('请输入正确的手机号', 'none', 1000)
					
					return;
				}
				var postData = {
					data:{
						phone:self.phone,
						type:3
					}
				};
				var callback = function(res){
					if(res.solely_code==100000){
						self.hasSend = true;
						var interval = setInterval(function() {
							self.currentTime--; //每执行一次让倒计时秒数减一
						
							self.text=self.currentTime + 's';//按钮文字变成倒计时对应秒数
							
							//如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
							if (self.currentTime <= 0) {
								clearInterval(interval)
								
								self.hasSend = false;
								self.text='重新发送';
								self.currentTime= 61;
								
							}
							
						}, 1000);
					}else{
						self.$Utils.showToast('发送失败', 'none', 1000)
					};
				};
				self.$apis.codeGet(postData, callback);
			},
			
			

		},
	};
</script>

<style>
	
	@import "../../assets/style/login.css";
	.findPswd{display: flex;justify-content: flex-end;}
</style> 
