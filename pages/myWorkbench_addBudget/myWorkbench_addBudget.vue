<template>
	<view>
		<view class="flexRowBetween money">
			<view>当前余额</view>
			<view class="price">566.23</view>
		</view>
		<view class="f5H5"></view>
		
		<view class="pdlr4" style="padding-top: 40rpx;">
			<view class="font15 title">申请原因</view>
			<view class="">
				<textarea v-model="submitData.description"  placeholder="请输入申请原因" />
			</view>
		</view>
		<view class="f5H5"></view>
		<view class="flexRowBetween money">
			<view>申请金额</view>
			<view class="">
				<input type="number" value=""  style="text-align: right;" placeholder="请输入金额" v-model="submitData.price"/>
			</view>
		</view>
		<view class="f5H5"></view>
		
		
		<view class="submitbtn" style="margin-top: 200rpx;">
			<button type="submit">确认</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				submitData:{
					description:'',
					price:'',
					type:5
				},
				Utils:this.$Utils
			}
		},
		
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.type=options.type;
			console.log('options',options)
		},
		
		methods: {
			
			
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
					postData.data.title = '工人发起申请追加预算'
				}
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

		},
	};
</script>
<style>
	.title{padding-bottom: 30rpx;}
	.tex{padding-bottom: 20rpx;}
	.money{padding: 30rpx 4%;}
	textarea{ width: 100%;height: 300rpx; display: block; box-sizing: border-box; font-size: 28rpx; line-height: 44rpx; margin-bottom:30rpx;padding: 20rpx;background: #F5F5F5;}
	input{ width: 300rpx; height: 60rpx; line-height: 60rpx; text-align: right; display: block;}
</style>

 
