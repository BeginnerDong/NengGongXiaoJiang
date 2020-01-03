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
				<input type="number" placeholder="请输入验证码" v-model="submitData.code"/>
				<view class="yzmBtn" @click="sendCode()" v-if="!hasSend">{{text}}</view>
				<view class="yzmBtn"  v-else>{{text}}</view>
			</view>
		</view>
		<view class="item">
			<view class="name">客户地址</view>
			<view class="rr" @click="chooseAddress">
				<input disabled="true" placeholder="请选择您的地址" v-model="submitData.passage2"/>
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
					passage2:'',
					latitude:'',
					longitude:'',
					code:''
				},
				mainData:{},
				currentTime:61,
				text:'获取验证码',
				hasSend:false,
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
						type:2,
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
			
			chooseAddress(e) {
				const self = this;
				uni.authorize({
				    scope: 'scope.userLocation',
				    success() {
				        uni.chooseLocation({
				        	success: (res) => {
				        		console.log(111)
				        		self.submitData.passage2 = res.address
				        		self.submitData.latitude = res.latitude
				        		self.submitData.longitude = res.longitude
				        	},
				        	fail: (e) => {
				        		uni.getSetting({
				        			success: (res) => {
				        				console.log(res)
				        				let locaAuth = res.authSetting['scope.userLocation']
				        				if (locaAuth) {/* 判断位置是否已经授权，是选择地图位置点击取消触发的fail，再选择位置 */
				        					console.log('地图点击取消')
				        					uni.chooseLocation({
				        						success: (res) => {
				        							self.submitData.passage2 = res.address
				        							self.submitData.latitude = res.latitude
				        							self.submitData.longitude = res.longitude
				        						},
				        					});
				        				}
				        				if (!locaAuth) { /* 如果地理位置没授权 */
				        					console.log(222)
				        					uni.showModal({
				        					    title: '提示',
				        					    content: '需要授权位置信息',
				        						confirmColor:'#ca1c1d',
				        						showCancel:true,
				        					    success: function (res) {
				        					        if (res.confirm) {
				        					            uni.openSetting({
				        					            	success: (res) => {
				        					            		console.log(res.authSetting)
				        					            	},
				        					            	fail: (res) => {
				        					            		console.log(res)
				        					            	},
				        					            });
				        					        } else if (res.cancel) {
				        					           
				        					        }
				        					    }
				        					});			
				        					
				        				
				        				}
				        			}
				        		})
				        	}
				        });
				    },
					fail: (e) => {
						uni.showModal({
						    title: '提示',
						    content: '需要授权位置信息',
							confirmColor:'#ca1c1d',
							showCancel:true,
						    success: function (res) {
						        if (res.confirm) {
						            uni.openSetting({
						            	success: (res) => {
						            		console.log(res.authSetting)
						            	},
						            	fail: (res) => {
						            		console.log(res)
						            	},
						            });
						        } else if (res.cancel) {
						           
						        }
						    }
						});
					}
				})
				
			},
			
			
			chooseLocation(){
				
				const self = this;
				uni.chooseLocation({
				    success: function (res) {
				        console.log('位置名称：' + res.name);
				        console.log('详细地址：' + res.address);
				        console.log('纬度：' + res.latitude);
				        console.log('经度：' + res.longitude);
						self.submitData.passage2 = res.address
						self.submitData.latitude = res.latitude
						self.submitData.longitude = res.longitude
				    },
					fail() {
						uni.authorize({
						    scope: 'scope.userLocation',
						    success() {
						      uni.chooseLocation({
						          success: function (res) {
						              console.log('位置名称：' + res.name);
						              console.log('详细地址：' + res.address);
						              console.log('纬度：' + res.latitude);
						              console.log('经度：' + res.longitude);
						      		self.submitData.passage2 = res.address
						      		self.submitData.latitude = res.latitude
						      		self.submitData.longitude = res.longitude
						          },
								})
						    }
						})
					}
				});
			},
			
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
				postData.smsAuth = {
					phone:self.submitData.phone,						
					code:self.submitData.code
				};
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

 
