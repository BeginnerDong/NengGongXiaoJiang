<template>
	<view>
		<view class="caseSbmit">
			<form action="">
				<view class="eidt-line flexRowBetween">
					<view class="ll">公司Logo</view>
					<view class="rr">
						<image @click="upLoadImg()" style="width: 80rpx;height: 80rpx;border-radius: 50%; display: block;" 
						:src="submitData.mainImg&&submitData.mainImg.length>0?submitData.mainImg[0].url:'../../static/images/qiyexinxi-icon2.png'" mode=""></image>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">公司名称：</view>
					<view class="rr">
						<input type="text" placeholder="请输入公司名称" v-model="submitData.company">
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">成立时间：</view>
					<view class="rr pr" style="padding-right: 20rpx;">
						<view style="width: 50%;">
							<picker mode="date" @change="timeChange">
								{{submitData.establish_time!=''?submitData.establish_time:'请选择'}}
							</picker>
							
						</view>
						<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">公司规模：</view>
					<view class="rr">
						<input type="text" placeholder="请输入公司规模" v-model="submitData.scale">
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">所在地：</view>
					<view class="rr pr" style="padding-right: 20rpx;">
						<view style="width: 50%;" @click="showMulLinkageThreePicker">
							<input type="text" placeholder="请选择地址" v-model="submitData.location" disabled="true">
						</view>
						<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">联系电话：</view>
					<view class="rr">
						<input type="number" v-model="submitData.contact" placeholder="请输入联系电话" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" >
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">邮箱：</view>
					<view class="rr">
						<input type="text" placeholder="请输入邮箱" v-model="submitData.email">
					</view>
				</view>
				<view class="submitbtn" style="margin: 200rpx auto">
					<button type="submit" style="margin-bottom: 20rpx;" @click="Utils.stopMultiClick(submit)">保存</button>
				</view>
			</form>
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
				mainData:{},
				submitData:{
					company :'',
					establish_time:'',
					scale:'',
					location:'',
					contact:'',
					email:'',
					mainImg:[]
				},
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
			
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			
			onConfirm(e) {
				const self = this;
				console.log(e)
				self.submitData.location  = e.label
			},
			
			timeChange(e){
				const self = this;
				console.log(e)
				self.submitData.establish_time = e.detail.value
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
				postData.saveAfter = [{
					tableName: 'User',
					FuncName: 'update',
					searchItem: {
						user_no:uni.getStorageSync('threeInfo').user_no
					},
					data: {
						behavior:2
					}
				}]; 
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
						self.submitData.company = self.mainData.company;
						self.submitData.establish_time = self.mainData.establish_time;
						self.submitData.scale = self.mainData.scale;
						self.submitData.location = self.mainData.location;
						self.submitData.contact = self.mainData.contact;
						self.submitData.email = self.mainData.email;
						self.submitData.mainImg = self.mainData.mainImg;	
					} else {
						self.$Utils.showToast(res.msg, 'none');
					};
					self.$Utils.finishFunc('getMainData');
			
				};
				self.$apis.userInfoGet(postData, callback);
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
</style> 
