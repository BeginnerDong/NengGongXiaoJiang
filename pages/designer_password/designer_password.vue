<template>
	<view>
		<view>
			<image class="lgoin-topBj" src="../../static/images/regietered-img1.png" mode=""></image>
		</view>
		
		<view class="login-box">
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon7.png" mode=""></image></view>
				<view class="rr">
					<input type="number" placeholder="输入手机号码" >
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon5.png" mode=""></image></view>
				<view class="rr pr flexRowBetween">
					<view style="width: 50%;">
						<input type="number" placeholder="输入验证码">
					</view>
					<view class="yzmBtn" @click="sendCode()" v-if="!hasSend">获取验证码</view>
					<view class="yzmBtn"  v-else>{{text}}</view>
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon9.png" mode=""></image></view>
				<view class="rr">
					<input type="text" placeholder="输入新的登录密码">
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon9.png" mode=""></image></view>
				<view class="rr">
					<input type="text" placeholder="确认新的登录密码">
				</view>
			</view>
		</view>
		
		<view class="submitbtn" style="margin:100rpx auto">
			<button type="submit" style="margin-bottom: 20rpx;" @click="Router.navigateTo({route:{path:'/pages/designer_login/designer_login'}})">确定</button>
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
			}
		},
		onLoad(options) {
			const self = this;
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
						type:1,
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
			
			
			onConfirm(e) {
				const self = this;
				console.log(e)
				self.submitData.address = e.label
			},
			
			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.order ={
					create_time:'asc'
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data;
						if(self.type=='worker'){
							self.workArray = self.mainData
						}else if(self.type=='designer'){
							self.designStyleArray = self.mainData
						};
						console.log('self.workArray',self.workArray)
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMainData');

				};
				self.$apis.labelGet(postData, callback);
			},

		},
	};
</script>

<style>
	@import "../../assets/style/login.css";

</style> 
