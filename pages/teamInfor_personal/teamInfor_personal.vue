<template>
	<view>
		<view class="caseSbmit">
			<form action="">
				<view class="eidt-line flexRowBetween">
					<view class="ll">个人头像</view>
					<view class="rr">
						<image @click="upLoadImg()" style="width: 80rpx;height: 80rpx;border-radius: 50%; display: block;" 
						:src="submitData.mainImg&&submitData.mainImg.length>0?submitData.mainImg[0].url:'../../static/images/qiyexinxi-icon2.png'" mode=""></image>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">昵称</view>
					<view class="rr">
						<input type="text" v-model="submitData.name" />
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">性别</view>
					<view class="rr pr" style="padding-right: 10rpx;">
						<image @click="choose('1')" style="width: 30rpx; height: 30rpx; display: block; margin-right: 10rpx;" 
						:src="submitData.gender==1?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode=""></image>
						<!-- <picker :value="index" :range="array"  @change="bindPickerChange">
							<view class="uni-input">{{array[index]}}</view>
						</picker> -->
						<view>男</view>
						<image @click="choose('2')" style="width: 30rpx; height: 30rpx; display: block; margin-right: 10rpx;margin-left: 10px;" 
						:src="submitData.gender==2?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode=""></image>
						<!-- <picker :value="index" :range="array"  @change="bindPickerChange">
							<view class="uni-input">{{array[index]}}</view>
						</picker> -->
						<view>女</view>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">地址</view>
					<view class="rr" @click="chooseAddress()">
						<input type="text" disabled="true" v-model="submitData.address" />
					</view>
				</view>
				<view class="eidt-column">
					<view class="ll">个人介绍</view>
					<view class="">
						<textarea value="" placeholder="请简单的介绍下一下自己" v-model="submitData.introduce"/>
					</view>
				</view>
				<view class="eidt-column">
					<view class="ll">上传身份证正面</view>
					<view @click="upLoadImgTwo('1')" v-if="submitData.id_img_front.length==0" style="width: 300rpx;height:340rpx;background: #f5f5f5;line-height: 340rpx;text-align: center;font-size: 40px;">
						+
					</view>
					<image v-else :src="submitData.id_img_front[0]?submitData.id_img_front[0].url:''"  style="width: 300rpx;height:340rpx;"></image>
				</view>
				<view class="eidt-column">
					<view class="ll">上传身份证反面</view>
					<view @click="upLoadImgTwo('2')" v-if="submitData.id_img_back.length==0"  style="width: 300rpx;height:340rpx;background: #f5f5f5;line-height: 340rpx;text-align: center;font-size: 40px;">
						+
					</view>
					<image v-else :src="submitData.id_img_back[0]?submitData.id_img_back[0].url:''"  style="width: 300rpx;height:340rpx;"></image>
				</view>
				<view class="eidt-column">
					<view class="ll">工作经历</view>
					<view class="">
						<textarea value="" placeholder="请简单的描述一下自己的工作经历" v-model="submitData.experience"/>
					</view>
				</view>
			</form>
		</view>
		<view class="submitbtn" style="margin: 100rpx auto">
			<button type="submit" @click="Utils.stopMultiClick(submit)">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				Utils:this.$Utils,
				mainData:{},
				submitData:{
					name:'',
					mainImg:[],
					gender:'',
					introduce:'',
					experience:'',
					address:'',
					longitude:'',
					latitude:'',
					id_img_front:[],
					id_img_back:[]
				}
			}
		},
		onLoad() {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			
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
			
			submit() {
				const self = this;
				
				uni.setStorageSync('canClick', false);
				const pass = self.$Utils.checkComplete(self.submitData);
				console.log('pass', pass);
				console.log('self.submitData',self.submitData)
				if (pass) {	
					if(self.submitData.gender==0){
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('请选择性别', 'none');
						return
					};
					self.userInfoUpdate();	
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息', 'none')
				};
			},
			
			userInfoUpdate() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getThreeToken';
				postData.searchItem = {
					user_no:uni.getStorageSync('threeInfo').user_no
				};
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				if(uni.getStorageSync('threeInfo').identity==2){
					 postData.saveAfter = [{
						tableName: 'User',
						FuncName: 'update',
						searchItem: {
							user_no:uni.getStorageSync('threeInfo').user_no
						},
						data: {
							behavior:1
						}
					}]; 
				};
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('保存成功', 'none');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 800)
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.userInfoUpdate(postData, callback);
			},
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getThreeToken';
				postData.searchItem = {
					user_no:uni.getStorageSync('threeInfo').user_no
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data[0];
						self.submitData.name = self.mainData.name;
						self.submitData.mainImg = self.mainData.mainImg;
						self.submitData.gender = self.mainData.gender;
						self.submitData.introduce = self.mainData.introduce;
						self.submitData.experience = self.mainData.experience;
						self.submitData.address = self.mainData.address;
						self.submitData.longitude = self.mainData.longitude;
						self.submitData.latitude = self.mainData.latitude;
					} else {
						self.$Utils.showToast(res.msg, 'none');
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			choose(gender){
				const self = this;
				self.submitData.gender = gender
			},
			
			upLoadImg() {
				const self = this;			
				wx.showLoading({
					mask: true,
					title: '上传中',
				});
				const callback = (res) => {
					console.log('res', res)
					if (res.solely_code == 100000) {
						self.submitData.mainImg = [];
						self.submitData.mainImg.push({
							url:res.info.url,
							type:'image'
						})
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

		},
	};
</script>

<style>
	/* @import "../../assets/style/user.css"; */
	@import "../../assets/style/caseSbmit.css";
	
	.rr{ justify-content:flex-end; display:flex ; text-align: right; align-items: center; }
	.eidt-column{padding: 30rpx 4% ; border-bottom: 1px solid #e7e7e7;}
	.eidt-column .ll{padding-bottom: 20rpx;}
	textarea{ width: 100%;height: 300rpx; display: block; box-sizing: border-box; font-size: 26rpx; line-height: 44rpx;padding: 20rpx;background: #F5F5F5;}
</style> 
