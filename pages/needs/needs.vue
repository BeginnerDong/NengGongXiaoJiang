<template>
	<view>
		<view class="caseSbmit">
			<form action="">
				<view class="eidt-line">
					<view class="ll">所在城市：</view>
					<view class="rr" @click="showMulLinkageThreePicker">
						<input disabled="true" type="text" placeholder="请选择" :value="submitData.passage1">
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">面积：</view>
					<view class="rr">
						<input type="number" placeholder="请输入项目面积(㎡)" v-model="submitData.keywords">
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">用工类型：</view>
					<view class="rr styleLis">
						<view class="item" v-for="(item,index) in styleLis" :key="index">
							<view class="icon" @click="chooseStyle(item)">
								<image :src="submitData.title==item?'../../static/images/about-address-icon1.png':'../../static/images/about-address-icon4.png'" alt=""/>
							</view>
							<view class="tit">{{item}}</view>
						</view>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">地址：</view>
					<view class="rr" @click="chooseAddress()">
						<input type="text" disabled="true" placeholder="请选择详细地址" v-model="submitData.description">
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">手机号码：</view>
					<view class="rr">
						<input type="number" v-model="submitData.phone" placeholder="请输入手机号码" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" >
					</view>
				</view>
				<view class="submitbtn" style="margin: 200rpx auto 60rpx auto">
					<button type="submit" style="margin-bottom: 20rpx;"  open-type="getUserInfo"  @getuserinfo="Utils.stopMultiClick(submit)">立即发布</button>
					<view class="agreeSel">
						<view class="selt" @click="agree">
							<image :src="isAgree?'../../static/images/about-address-icon1.png':'../../static/images/about-address-icon4.png'" mode=""></image>
						</view>
						<view class="text"  @click="xieyiAlert">《同意服务须知协议》</view>
					</view>
				</view>
			</form>
		</view>
		<view class="xieyiAlert" v-if="is_show">
			<view class="infor">
				<view class="colseBtn"  @click="xieyiAlert" style="top: auto;bottom: 60rpx;">×</view>
				<view class="cont">
					<view class="tit">{{mainData.title}}</view>
					<view class="content ql-editor" v-html="mainData.content">
					</view>
				</view>
			</view>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		         @="" @onConfirm="onConfirm"></mpvue-city-picker>
				 
		
		<!--底部tab键-->
		<view class="navbar">
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/index/index'}})">
				<view class="nav_img">
					<image src="../../static/images/nabar1.png" />
				</view>
				<view class="text">首页</view>
			</view>
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/needs/needs'}})" >
				<view class="nav_img">
					<image src="../../static/images/nabar2-a.png" />
				</view>
				<view class="text this-text">发需求</view>
			</view>
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/car/car'}})" >
				<view class="nav_img">
					<image src="../../static/images/nabar3.png" />
				</view>
				<view class="text">购物车</view>
			</view>
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/user/user'}})">
				<view class="nav_img">
					<image src="../../static/images/nabar4.png" />
				</view>
				<view class="text">我的</view>
			</view>
		</view>
		<!--底部tab键 end-->
		
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
					passage1:'',
					title:'',
					description:'',
					keywords:'',
					phone:'',
					type:2
				},
				mainData:{},
				is_show:false,
				isAgree:false,
				styleLis:['建筑工','装修工','维修工','园林工','市政工','安装工','其他'],
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[]
			}
		},
		
		onLoad() {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self);
		},
		
		methods: {
			
			chooseAddress(e) {
				const self = this;
				uni.authorize({
				    scope: 'scope.userLocation',
				    success() {
				        uni.chooseLocation({
				        	success: (res) => {
				        		console.log(111)
				        		self.submitData.description = res.address
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
				        							self.submitData.description = res.address
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
						self.submitData.description = res.address
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
						      		self.submitData.description = res.address

						          },
								})
						    }
						})
					}
				});
			},
			
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			
			onConfirm(e) {
				const self = this;
				console.log(e)
				self.submitData.passage1 = e.label
			},
			
			chooseStyle(item){
				const self = this;
				self.submitData.title = item
			},
			
			xieyiAlert(){
				const self = this;
				self.is_show=!self.is_show;
			},
			
			agree(){
				const self = this;
				self.isAgree = !self.isAgree
			},
			
			getMainData() {
				const self = this;			
				const postData = {};
			
				postData.searchItem = {
					thirdapp_id:2,
				};
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['同意服务须知协议']],
						},
						middleKey: 'menu_id',
						key: 'id',
						condition: 'in',
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						const regex = new RegExp('<img', 'gi');
						self.mainData.content = self.mainData.content.replace(regex, `<img style="max-width: 100%;"`);
					}
					console.log('self.mainData',self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);
				var phone = self.submitData.phone;
				
				const pass = self.$Utils.checkComplete(self.submitData);
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
						const callback = (user, res) => {
							self.messageAdd();
						};
						self.$Utils.getAuthSetting(callback);					
					}
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息', 'none')
				};
			},
			
			messageAdd() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				if(!wx.getStorageSync('user_info')||!wx.getStorageSync('user_info').headImgUrl){
				  postData.refreshToken = true;
				};
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('提交成功', 'none');
						self.submitData = {
							class:'',
							title:'',
							description:'',
							keywords:'',
							phone:''
						}
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.messageAdd(postData, callback);
			},

		},
	};
</script>

<style>
	/* @import "../../assets/style/user.css"; */
	@import "../../assets/style/xieyiAlert.css";
	@import "../../assets/style/caseSbmit.css";
	@import "../../assets/style/navbar.css";
	page{padding-bottom: 140rpx;}
	
	
	.styleLis{ width: 100%; display: flex; flex-wrap: wrap;justify-content: flex-end;}
	.styleLis .item{padding:0rpx 0 10rpx 30rpx;display: flex;justify-content: flex-end; align-items: center;}
	.styleLis .item .icon{  width: 36rpx;height: 36rpx; margin-right: 10rpx;font-size: 26rpx;}
	.styleLis .item .icon image{width: 100%;height: 100%; display: block;}
	

</style> 
