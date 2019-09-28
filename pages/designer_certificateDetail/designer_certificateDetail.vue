<template>
	<view>
		<view class="caseSbmit">
			<view class="eidt-line">
				<view class="ll">证书名称：</view>
				<input class="rr" placeholder="请输入证书名称" v-model="submitData.title"></input>
			</view>
			<view class="eidt-line">
				<view class="ll">获奖时间：</view>
				<input class="rr" placeholder="请输入获奖时间"  v-model="submitData.keywords"></input>
			</view>
			<view class="eidt-line" style="border: none;">
				<view class="ll">上传证书：</view>
				<view class="rr upBook">
					<image class="bookPic" @click="upLoadImg()" v-if="submitData.mainImg.length==0" src="../../static/images/release-icon1.png" mode=""></image>
					<image class="bookPic" v-if="submitData.mainImg.length>0" :src="submitData.mainImg[0].url" mode=""></image>
				</view>
			</view>
			
		</view>
		<view class="submitbtn" style="margin: 200rpx auto">
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
				submitData:{
					title:'',
					keywords:'',
					mainImg:[],
					type:6
				}
			}
		},
		onLoad(options) {
			const self = this;
			if(options.id){
				self.id = options.id;
				self.$Utils.loadAll(['getMainData'], self);
			}
			
		},
		
		methods: {
			
			getMainData() {
				const self = this;
			
				const postData = {};
				postData.tokenFuncName = 'getThreeToken';
		
				postData.searchItem = {
					thirdapp_id: 2,
					type:6,
					id:self.id
				};		
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						self.submitData.title = self.mainData.title;
						self.submitData.keywords = self.mainData.keywords;
						self.submitData.mainImg = self.mainData.mainImg;
					} 
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.messageGet(postData, callback);
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
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);	
				const pass = self.$Utils.checkComplete(self.submitData);
				console.log('pass', pass);
				console.log('self.submitData',self.submitData)
				if (pass) {		
					if(self.id){
						self.messageUpdate();
					}else{
						self.messageAdd();	
					}
					
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息', 'none')
				};
			},
			
			messageUpdate() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getThreeToken';
				postData.searchItem = {
					id:self.id
				};
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('修改成功', 'none');
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
				self.$apis.messageUpdate(postData, callback);
			},
			
			messageAdd() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getThreeToken';
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('添加成功', 'none');
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
				self.$apis.messageAdd(postData, callback);
			},

		},
	};
</script>

<style>
	@import "../../assets/style/user.css";
	.caseSbmit .eidt-line .rr{text-align: right;}
	.upBook{ display: flex;justify-content: flex-start; flex-wrap: wrap;}
	.upBook image{width: 150rpx; height: 150rpx; margin-right: 20rpx;}
	.bookPic{width: 150rpx; height: 150rpx; }
</style> 
