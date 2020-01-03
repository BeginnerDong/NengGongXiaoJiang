<template>
	<view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">纠纷类型</view>
		</view>
		<view class="flexRowBetween r-selt mglr4" style="padding-bottom: 30rpx;">
			<view class="selt" @click="change('1')">
				<image :src="curr==1?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode="">
					
				</image>维权退款
			</view>
			<view class="selt" @click="change('2')">
				<image :src="curr==2?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode="">
					
				</image>余额退款
			</view>
		</view>
		<view class="f5H10"></view>

		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">维权说明</view>
		</view>
		<view class="pdlr4">
			<textarea value="" placeholder="请编辑原因···" v-model="submitData.content"/>
			</view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">添加附件</view>
		</view>
		<view class="pdlr4">
			<view class="uploadBtn">
				<image  v-for="(item,index) in submitData.mainImg" :key="index"   v-if="submitData.mainImg.length>0" :src="item.url" mode=""></image>
				
				<image @click="upLoadImg()" src="../../static/images/about-hetongbuchong-icon1.png" 
				v-if="submitData.mainImg.length==0" mode=""></image>
			</view>
		</view>
		
		<view class="submitbtn" style="margin-top: 100rpx;">
			<button type="submit" @click="Utils.stopMultiClick(submit)">确认提交</button>
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
					description:1,
					mainImg:[],
					type:3,
					content:''
				},
				curr:1
			}
		},
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.type=options.type;
			console.log('options',options)
			self.$Utils.loadAll(['getMainData'], self)
		},
				
		methods: {
			
			change(curr){
				const self = this;
				if(curr!=self.curr){
					self.curr = curr;
					if(self.curr==1){
						self.submitData.description = '无理要求、无法完成'
					}else{
						self.submitData.description = '不讲诚信、拒付赏金'
					}
				}
			},
				
				
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);	
				const pass = self.$Utils.checkComplete(self.submitData);
				console.log('pass', pass);
				console.log('self.submitData',self.submitData)
				if (pass) {			
					self.processAdd();	
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息', 'none')
				};
			},
			
			processAdd() {
				const self = this;
				const postData = {};
				
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
					postData.data.title = '工人发起维权争议'
				}else{
					postData.tokenFuncName = 'getProjectToken';
					postData.data.title = '用户发起维权争议'
				};
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
				self.$apis.processAdd(postData, callback);
			},
					
			getMainData() {
				const self = this;
				const postData = {};		
				postData.searchItem = {
					id:self.id,
					user_type:0
				};
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
				}else{
					postData.tokenFuncName = 'getProjectToken';
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData=res.info.data[0];
						self.submitData.order_no = self.mainData.order_no
					} else {
						self.$Utils.showToast(res.msg,'none');
					};
					
					console.log(self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
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
	.infor-title{margin-bottom: 30rpx;}
	.fabuCont{ padding: 30rpx 4%;}
	textarea{ width: 100%;height: 700rpx; display: block; box-sizing: border-box; font-size: 28rpx; line-height: 44rpx; margin-bottom: 20rpx;padding: 20rpx;background: #F5F5F5;}
	.uploadBtn{width: 200rpx; height: 200rpx; margin-right: 20rpx;}
	.uploadBtn image{width: 100%; height: 100%; display: block;}
	
	.r-selt .selt{ width: 50%; justify-content: flex-start;}
</style>
