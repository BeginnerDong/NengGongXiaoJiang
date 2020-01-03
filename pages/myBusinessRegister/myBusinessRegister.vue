<template>
	<view class="pub_editInfor">
		<view class="item">
			<view class="name">姓名</view>
			<view class="rr">
				<input type="text" placeholder="请输入姓名" v-model="submitData.name"/>
			</view>
		</view>
		<view class="item">
			<view class="name">登录手机号</view>
			<view class="rr">
				<input type="number" maxlength="11" placeholder="请输入手机号" v-model="submitData.phone"/>
			</view>
		</view>
		<view class="item">
			<view class="name">登录密码</view>
			<view class="rr">
				<input type="password"  placeholder="请输入登录密码" v-model="submitData.password"/>
			</view>
		</view>
		<view class="item">
			<view class="name">验证码</view>
			<view class="rr pr">
				<input type="number" placeholder="请输入验证码" v-model="submitData.smsCode"/>
				<view class="yzmBtn" @click="sendCode()" v-if="!hasSend">{{text}}</view>
				<view class="yzmBtn"  v-else>{{text}}</view>
			</view>
		</view>
		<view class="item">
			<view class="name">商家类别</view>
			<view class="rr flexRowBetween pr">
				<view style="width: 100%; color: grey;">
					<picker @change="styleChange" :value="index" :range="styleArray" 
					range-key="title" style="width: 100%;padding: 0 10rpx;">
						<view class="uni-input">{{styleArray[styleIndex]&&styleArray[styleIndex].title?styleArray[styleIndex].title:'请选择'}}</view>
					</picker>
				</view>
				<view class="arrow" style="position: absolute;top: 50%;right:20rpx; transform: translateY(-50%);">
					<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="item">
			<view class="name">主营商品</view>
			<view class="rr">
				<input type="text" placeholder="请输入主营商品" v-model="submitData.description"/>
			</view>
		</view>
		<view class="item">
			<view class="name">选择地址</view>
			<view class="rr pr" @click="chooseAddress()">
				<view style="width: 80%;">
					<input type="text" placeholder="请选择地址" :value="submitData.address" disabled="true">
				</view>
				<view class="arrow"><image src="../../static/images/case-icon1.png" mode=""></image></view>
			</view>
		</view>
		<view class="item">
			<view class="name">星级兑换码</view>
			<view class="rr">
				<input type="text" placeholder="请输入提升星级兑换码" v-model="submitData.code"/>
			</view>
		</view>
		<view class="item">
			<view class="name">上传身份证正面</view>
			<view @click="upLoadImgTwo('1')" v-if="submitData.id_img_front.length==0" style="width: 300rpx;height:340rpx;background: #f5f5f5;line-height: 340rpx;text-align: center;font-size: 40px;">
				+
			</view>
			<image v-else :src="submitData.id_img_front[0]?submitData.id_img_front[0].url:''"  style="width: 300rpx;height:340rpx;"></image>
		</view>
		<view class="item">
			<view class="name" >上传身份证反面</view>
			<view @click="upLoadImgTwo('2')" v-if="submitData.id_img_back.length==0"  style="width: 300rpx;height:340rpx;background: #f5f5f5;line-height: 340rpx;text-align: center;font-size: 40px;">
				+
			</view>
			<image v-else :src="submitData.id_img_back[0]?submitData.id_img_back[0].url:''"  style="width: 300rpx;height:340rpx;"></image>
		</view>
		<view class="submitbtn" style="margin: 200rpx auto">
			<button type="submit" style="margin-bottom: 20rpx;" @click="Utils.stopMultiClick(submit)">确定</button>
			<view class="agreeSel">
				<view class="selt" @click="agree">
					<image :src="isAgree?'../../static/images/about-address-icon1.png':'../../static/images/about-address-icon4.png'" mode=""></image>
				</view>
				<view class="text"  @click="xieyiAlert"> 同意《能工小匠》入驻协议</view>
			</view>
		</view>
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
					password:'',
					code:'',	
					user_type:1,
					thirdapp_id:2,
					identity:3,
					description:'',
					behavior:'',
					longitude:'',
					latitude:'',
					id_img_front:[],
					id_img_back:[],
					smsCode:''
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
				styleArray:[{title:'定制商家',id:3},{title:'材料商家',id:4}],
				styleIndex:-1,
				currentTime:61,
				text:'获取验证码',
				hasSend:false,
			}
		},
		onLoad(options) {
			const self = this;
			self.type=options.type;	
			
			self.$Utils.loadAll(['getArtData'], self);
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
						phone:self.submitData.phone,
						type:1
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
			
			styleChange(e) {
				const self = this;
				console.log('picker发送选择改变，携带值为', e.target.value)
				self.submitData.behavior=self.styleArray[e.target.value].id
				self.styleIndex = e.target.value;
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
									
					if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('手机格式不正确', 'none')			
					} else {					
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
				postData.smsAuth = {
					phone:self.submitData.phone,						
					code:self.submitData.smsCode
				};
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('注册成功', 'none');
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
				self.$apis.register(postData, callback);
			},
			
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
			
			
			
			xieyiAlert(){
				const self = this;
				self.is_show=!self.is_show;
			},
			
			
		},
	};
</script>
<style>
	@import "../../assets/style/xieyiAlert.css";
	@import "../../assets/style/login.css";
</style>

 
