<template>
	<view>
		<view>
			<image class="lgoin-topBj" src="../../static/images/regietered-img1.png" mode=""></image>
		</view>
		
		<view class="login-box">
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon7.png" mode=""></image></view>
				<view class="rr">
					<input type="number" placeholder="输入手机号码" v-model="submitData.phone">
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon5.png" mode=""></image></view>
				<view class="rr pr flexRowBetween">
					<view style="width: 50%;">
						<input type="number" v-model="submitData.code" placeholder="输入验证码">
					</view>
					<view class="yzmBtn" @click="sendCode()" v-if="!hasSend">获取验证码</view>
					<view class="yzmBtn"  v-else>{{text}}</view>
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon9.png" mode=""></image></view>
				<view class="rr">
					<input type="password" placeholder="输入新的登录密码" v-model="submitData.password">
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon9.png" mode=""></image></view>
				<view class="rr">
					<input type="password" placeholder="确认新的登录密码" v-model="submitData.passwordCopy">
				</view>
			</view>
		</view>
		
		<view class="submitbtn" style="margin:100rpx auto">
			<button type="submit" style="margin-bottom: 20rpx;" 
			@click="Utils.stopMultiClick(submit)">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				Utils:this.$Utils,
				index: 0,
				is_show:false,
				type:'',
				mode: '',
				text:'获取验证码',
				hasSend:false,
				currentTime:61,
				submitData:{
					phone:'',
					password:'',
					code:'',
					passwordCopy:''
				}
			}
		},
		onLoad(options) {
			const self = this;
			uni.setStorageSync('canClick', true);
		},
		
		methods: {
			
			sendCode(){
				var self = this;
				console.log(111)
				if(self.hasSend){
					return;
				};
				var phone = self.submitData.phone;
				
				if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
					self.$Utils.showToast('请输入正确的手机号', 'none', 1000)
					
					return;
				}
				var postData = {
					data:{
						type:4,
						phone:self.submitData.phone
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
			
			
		
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);
				var newObject = self.$Utils.cloneForm(self.submitData);
				
				const pass = self.$Utils.checkComplete(newObject);
				console.log('pass', pass);
				console.log('self.submitData',self.submitData)
				if (pass) {
					if(self.submitData.password!=self.submitData.passwordCopy){
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('两次输入密码不一致', 'none');
						return
					};
					self.passwordUpdate();					
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息', 'none')
				};
			},
			
			passwordUpdate() {
				const self = this;
				const postData = {};
				var newObject = self.$Utils.cloneForm(self.submitData);
				delete newObject.passwordCopy;
				delete newObject.code;
				postData.data = {};
				postData.data = self.$Utils.cloneForm(newObject);
				postData.smsAuth = {
					phone:self.submitData.phone,						
					code:self.submitData.code
				};
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('修改成功', 'none');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 800);
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.resetPassword(postData, callback);
			},

		},
	};
</script>

<style>
	@import "../../assets/style/login.css";

</style> 
