<template>
	<view class="fabuCont">
		<view class="">
			<textarea value="" placeholder="这一刻你的想法···" v-model="submitData.content"/>
		</view>
		<view style="display: flex;flex-wrap: wrap;">
			<view class="uploadBtn"  v-for="item in submitData.bannerImg" v-if="submitData.bannerImg.length>0">
				
				<image :src="item" mode=""></image>
				
				
			</view>
			<view class="uploadBtn" @click="upLoadImg()" v-if="submitData.bannerImg.length<3">
				
				
				<image   src="../../static/images/release-icon1.png" mode=""></image>
				
			</view>
		</view>
		
		<view class="submitbtn" style="margin-top: 200rpx;">
			<button type="submit" open-type="getUserInfo"  @getuserinfo="Utils.stopMultiClick(submit)">发布</button>
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
					/* title:'',
					mainImg:'', */
					content:'',
					type:3,
					bannerImg:[],
					relation_table:'message'
				}
			}
		},
		
		onLoad() {
			const self = this;
			uni.setStorageSync('canClick', true);
			
			//self.$Utils.loadAll(['getLocation'], self);
		},
		
		methods: {
			
			
			
			
			upLoadImg(type) {
				const self = this;			
				wx.showLoading({
					mask: true,
					title: '上传中',
				});
				const callback = (res) => {
					console.log('res', res)
					if (res.solely_code == 100000) {
						
						self.submitData.bannerImg.push(res.info.url)
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

				if (pass) {								
					const callback = (user, res) => {
						self.submitData.mainImg = [];
						self.submitData.title = user.nickName;
						self.submitData.mainImg.push(user.avatarUrl);
						self.messageAdd();
						console.log('user',user)
						console.log('res',res)
					};
					self.$Utils.getAuthSetting(callback);
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
				console.log('postData',postData)
				
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('发布成功', 'none');
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
	.fabuCont{ padding: 30rpx 4%;}
	.fabuCont textarea{ width: 100%;height: 200rpx; display: block; box-sizing: border-box; font-size: 28rpx; line-height: 44rpx; margin-bottom: 20rpx;}
	.uploadBtn{width: 150rpx; height: 150rpx; margin-right: 20rpx;}
	.uploadBtn image{width: 100%; height: 100%; display: block;}
</style>

 
