<template>
	<view>
		
		<view class="pdlr4">
			<view class="inforOne">
				<view class="font15 tit">{{mainData.create_time}} {{mainData.description}}</view>
				<view class="flexRowBetween time">
					<view class="left">{{now}}</view>
					<view class="btn">下班</view>
				</view>
			</view>
			
			<view class="inforOne">
				<view class="upPhoto">
					<view class="name">下班拍照</view>
					<view class="phto">
						
						<image  v-for="(item,index) in submitData.mainImg" :key="index"   v-if="submitData.mainImg.length>0" :src="item.url" mode=""></image>
						
						<image @click="upLoadImg()" src="../../static/images/daka-icon3.png" 
						v-if="submitData.mainImg.length==0" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="submitbtn" style="margin-top: 300rpx;">
			<button type="button" @click="Utils.stopMultiClick(processUpdate)">确定</button>
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
				now:'',
				submitData:{
					off_time:'',
					mainImg:[]
				}
			}
		},
		
		onLoad(options) {
			const self = this;
			var now = Date.parse(new Date());
			self.now = self.$Utils.timeto(now,"hms");
			self.submitData.off_time = now;
			self.id = options.id;
			self.$Utils.loadAll(['getMainData'], self);
		},
		
		methods: {
			
			processUpdate() {
				const self = this;
				const postData = {};				
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				postData.searchItem ={
					id:self.id
				};
				postData.tokenFuncName = 'getThreeToken';	
				const callback = (data) => {				
					if (data.solely_code == 100000) {				
						self.$Utils.showToast('打卡成功', 'none', 1000)
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
				self.$apis.processUpdate(postData, callback);
			},
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					id:self.id,
					type:7
				};	
				postData.tokenFuncName = 'getThreeToken';						
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData= res.info.data[0];
						self.mainData.create_time = self.mainData.create_time.substr(0,10)
					}
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.processGet(postData, callback);
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
	page{padding-bottom: 60rpx; background: #f5f5f5;}
	.inforOne{background: #fff;border-radius: 10rpx; margin-top: 30rpx;padding: 30rpx;box-sizing: border-box; }
	.time{ margin-top: 20rpx;}
	.time .left{font-size: 40rpx;}
	.time .btn{width: 100rpx;height: 100rpx; line-height: 100rpx;text-align: center;font-size: 28rpx;background: #FFCB1E;border-radius: 50%;}
	.upPhoto{ display: flex; justify-content: flex-start;}
	.upPhoto .name{ margin-right: 10rpx; width: 140rpx;}
	.phto{width:460rpx;}
	.phto image{width: 150rpx; height: 150rpx; display: block;margin-right: 30rpx;}
</style>

 
