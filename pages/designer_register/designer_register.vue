<template>
	<view>
		<image class="lgoin-topBj" src="../../static/images/regietered-img1.png" mode=""></image>
		<view class="login-box">
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon8.png" mode=""></image></view>
				<view class="rr">
					<input type="text" placeholder="输入姓名" v-model="submitData.name">
				</view>
			</view>
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
						<input type="number" placeholder="输入验证码" v-model="submitData.smsCode">
					</view>
					<view class="yzmBtn" @click="sendCode()" v-if="!hasSend">{{text}}</view>
					<view class="yzmBtn"  v-else>{{text}}</view>
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon2.png" mode=""></image></view>
				<view class="rr">
					<input type="number" placeholder="输入登录密码" v-model="submitData.password">
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon4.png" mode=""></image></view>
				<view class="rr pr flexRowBetween">
					<view style="width: 80%;" @click="chooseAddress">
						<input type="text" placeholder="请选择地址" :value="submitData.address" disabled="true">
					</view>
					<view class="yzmBtn">
						<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="icon"><image src="../../static/images/regietered-icon3.png" mode=""></image></view>
				<view class="rr">
					<input type="text" placeholder="请输入提升星级兑换码" v-model="submitData.code">
				</view>
			</view>
			<view class="item" v-if="type=='worker'">
				<view class="icon"><image src="../../static/images/regietered-icon2.png" mode=""></image></view>
				<view class="rr flexRowBetween pr">
					<view style="width: 100%; color: grey;font-size: 24rpx;">
						<picker @change="workChange" :value="index" :range="workArray" range-key="title" style="width: 100%;">
							<view class="uni-input">{{workArray[workIndex]&&workArray[workIndex].title?workArray[workIndex].title:'请选择工种'}}</view>
						</picker>
					</view>
					<view class="arrow" style="position: absolute;top: 50%;right:20rpx; transform: translateY(-50%);">
						<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="item" v-if="type=='worker'">
				<view class="icon"><image src="../../static/images/regietered-icon1.png" mode=""></image></view>
				<view class="rr flexRowBetween pr">
					<view style="width: 100%; color: grey;font-size: 24rpx;">
						<picker @change="workStyleChange" :value="index" :range="workStyleArray" range-key="title" style="width: 100%;">
							<view class="uni-input">{{workStyleArray[workStyleIndex]&&workStyleArray[workStyleIndex].title?workStyleArray[workStyleIndex].title:'请选择工种类别'}}</view>
						</picker>
					</view>
					<view class="arrow" style="position: absolute;top: 50%;right:20rpx; transform: translateY(-50%);">
						<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="item" v-if="type=='designer'">
				<view class="icon"><image src="../../static/images/regietered-icon1.png" mode=""></image></view>
				<view class="rr flexRowBetween pr">
					<view style="width: 100%; color: grey;font-size: 24rpx;">
						<picker @change="designStyleChange" :value="index" :range="designStyleArray" range-key="title" style="width: 100%;">
							<view class="uni-input">{{designStyleArray[designStyleIndex]&&designStyleArray[designStyleIndex].title?designStyleArray[designStyleIndex].title:'请选择设计类别'}}</view>
						</picker>
					</view>
					<view class="arrow" style="position: absolute;top: 50%;right:20rpx; transform: translateY(-50%);">
						<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="">
				<view class="ll" style="color: #666;">上传身份证正面</view>
				<view @click="upLoadImgTwo('1')" v-if="submitData.id_img_front.length==0" style="margin-top: 20rpx;width: 300rpx;height:340rpx;background: #f5f5f5;line-height: 340rpx;text-align: center;font-size: 40px;">
					+
				</view>
				<image v-else :src="submitData.id_img_front[0]?submitData.id_img_front[0].url:''"  style="margin-top: 20rpx;width: 300rpx;height:340rpx;"></image>
			</view>
			<view class="">
				<view class="ll" style="color: #666;margin-top: 20rpx;">上传身份证反面</view>
				<view @click="upLoadImgTwo('2')" v-if="submitData.id_img_back.length==0"  style="margin-top: 20rpx;width: 300rpx;height:340rpx;background: #f5f5f5;line-height: 340rpx;text-align: center;font-size: 40px;">
					+
				</view>
				<image v-else :src="submitData.id_img_back[0]?submitData.id_img_back[0].url:''"  style="margin-top: 20rpx;width: 300rpx;height:340rpx;"></image>
			</view>
		</view>
		
		<view class="submitbtn" style="margin: 200rpx auto">
			<button type="submit" style="margin-bottom: 20rpx;" 
			@click="Utils.stopMultiClick(submit)">注册</button>
			<view class="agreeSel">
				<view class="selt" @click="agree">
					<image :src="isAgree?'../../static/images/about-address-icon1.png':'../../static/images/about-address-icon4.png'" mode=""></image>
				</view>
				<view class="text"  @click="xieyiAlert" style="margin-left: 10rpx;">同意《能工小匠》入驻协议</view>
			</view>
		</view>
		<!-- 入驻协议 -->
		<view class="xieyiAlert" v-if="is_show">
			<view class="infor">
				<view class="colseBtn"  @click="xieyiAlert" style="top: auto;bottom: 60rpx;">×</view>
				<view class="cont">
					<view class="tit">{{artData.title}}</view>
					<view class="content ql-editor" v-html="artData.content">
					</view>
				</view>
			</view>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		         @="" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/common/city.data.js';
	export default {
		components: {	
			mpvueCityPicker
		},
		data() {
			return {
				Router:this.$Router,
				Utils:this.$Utils,
				submitData:{
					name:'',
					address:'',
					phone:'',
					code:'',	
					user_type:1,
					thirdapp_id:2,
					longitude:'',
					latitude:'',
					id_img_front:[],
					id_img_back:[],
					smsCode:'',
					password:''
				},
				index: 0,
				numb: 0,
				is_show:false,
				workArray:[],
				workStyleArray:[],		
				designStyleArray:[],
				type:'',
				searchItem:{},
				workIndex:'',
				workStyleIndex:'',
				designStyleIndex:'',
				isAgree:false,
				artData:{},
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				currentTime:61,
				text:'获取验证码',
				hasSend:false,
			}
		},
		onLoad(options) {
			const self = this;
			self.type=options.type;	
			console.log('self.type',self.type)
			if(self.type=='worker'){
				self.searchItem.type=2;
				self.submitData.identity=1
			}else if(self.type=='designer'){
				self.searchItem.type=3;
				self.submitData.identity=2
			}else if(self.type=='supervision'){
				self.submitData.identity=0;
				self.submitData.user_type = 2
			}
			self.$Utils.loadAll(['getMainData','getArtData'], self);
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
			
			upLoadImgTwo(type) {
				const self = this;			
				wx.showLoading({
					mask: true,
					title: '上传中',
				});
				const callback = (res) => {
					console.log('res', res)
					if (res.solely_code == 100000) {
						if(type=='1'){
							self.submitData.id_img_front.push({url:res.info.url,type:'image'})
						}else if(type==2){
							self.submitData.id_img_back.push({url:res.info.url,type:'image'})
						};
						console.log(self.submitData)
						wx.hideLoading()
					} else {
						self.$Utils.showToast('网络故障', 'none')
					}
				};				
				wx.chooseImage({
					count: 1,
					success: function(res) {
						console.log(res);
						var tempFilePaths = res.tempFilePaths[0];
						console.log(callback)
						self.$Utils.uploadFile(tempFilePaths, 'file', {
							tokenFuncName: 'getProjectToken',
							type:'image'
						}, callback)
					},
					fail: function(err) {
						wx.hideLoading();
					},			
				})			
			},
			
			chooseAddress(e) {
				const self = this;
				uni.authorize({
				    scope: 'scope.userLocation',
				    success() {
				        uni.chooseLocation({
				        	success: (res) => {
				        		console.log(res)
				        		self.submitData.address = res.address;
				        		self.submitData.longitude = res.longitude;
				        		self.submitData.latitude  = res.latitude;
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
				        							self.submitData.address = res.address;
				        							self.submitData.longitude = res.longitude;
				        							self.submitData.latitude  = res.latitude;
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
			
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			
			onConfirm(e) {
				const self = this;
				console.log(e)
				self.submitData.address = e.label
			},
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);
				var phone = self.submitData.phone;
				var newObject = self.$Utils.cloneForm(self.submitData);
				delete newObject.code;
				const pass = self.$Utils.checkComplete(newObject);
				console.log('pass', pass);
				console.log('self.submitData',self.submitData)
				if (pass) {
					if(!self.isAgree){
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('请阅读协议并同意', 'none')	
						return
					};
					if((self.type=='worker'||self.type=='designer')&&!self.submitData.type){
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('请选择工种或类别', 'none')	
						return
					};
					if(self.type=='worker'){
						if(!self.submitData.work){
							uni.setStorageSync('canClick', true);
							self.$Utils.showToast('请选择工种类别', 'none')	
							return
						};
					};					
					if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('手机格式不正确', 'none')			
					}else {					
						self.register();					
					}
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息', 'none')
				};
			},
			
			register() {
				const self = this;
				const postData = {};
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				if(postData.data.code==''){
					delete postData.data.code
				};
				postData.smsAuth = {
					phone:self.submitData.phone,						
					code:self.submitData.smsCode
				};
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('注册成功', 'none');
						setTimeout(function() {
							self.Router.redirectTo({route:{path:'/pages/user/user'}})
						}, 800);
						
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.register(postData, callback);
			},
			
			/* registerTwo() {
				const self = this;
				const postData = {};
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('注册成功', 'none');
						setTimeout(function() {
							self.Router.switchTab({route:{path:'/pages/user/user'}})
						}, 800);
						
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.registerS(postData, callback);
			}, */
			
			agree(){
				const self = this;
				self.isAgree = !self.isAgree
			},
			
			getArtData() {
				const self = this;			
				const postData = {};
			
				postData.searchItem = {
					thirdapp_id:2,
				};
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['入驻协议']],
						},
						middleKey: 'menu_id',
						key: 'id',
						condition: 'in',
					},
				};
				if(self.type=='supervision'){
					postData.getBefore.caseData.searchItem.title[1][0]='监理入驻规则'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.artData = res.info.data[0];
						const regex = new RegExp('<img', 'gi');
						self.artData.content = self.artData.content.replace(regex, `<img style="max-width: 100%;"`);
					}
					console.log('self.artData',self.artData)
					self.$Utils.finishFunc('getArtData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
			workChange(e) {
				const self = this;
				self.workStyleArray = [];
				console.log(e);
				console.log('picker发送选择改变，携带值为', e.target.value)
				self.submitData.type=self.workArray[e.target.value].id
				self.workIndex = e.target.value;
				self.getWorkStyleData()
			},
			
			getWorkStyleData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.searchItem = {
					parentid:self.submitData.type
				};
				postData.order ={
					create_time:'asc'
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.workStyleArray = res.info.data
					}
				};
				self.$apis.labelGet(postData, callback);
			},
			
			workStyleChange(e) {
				const self = this;
				console.log('picker发送选择改变，携带值为', e.target.value)
				self.submitData.work=self.workStyleArray[e.target.value].id
				self.workStyleIndex = e.target.value;
			},
			
			designStyleChange(e) {
				const self = this;
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				self.submitData.type=self.designStyleArray[e.target.value].id
				self.designStyleIndex = e.target.value;
			},
			
			xieyiAlert(){
				const self = this;
				self.is_show=!self.is_show;
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
	/* @import "../../assets/style/user.css"; */
	@import "../../assets/style/login.css";
	@import "../../assets/style/xieyiAlert.css";

</style> 
