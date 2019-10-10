<template>
	<view>
		<!-- <view class="pdlr4 ">
			<view class="pr topInput">
				<view style="width: 80%; position: relative;z-index: 0;">
					<input class="" type="text" value="200" placeholder="">
				</view>
				<view class="delt" style="right: auto;left: 20%;">×</view>
			</view>
		</view> -->
		
		<view class="pdlr4">内容</view>
		<view class="ind_seach" style="border-bottom: 2rpx solid #f5f5f5;">
			<view class="child" v-for="(item,index) in countArray">
				<view class="sqr_name">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<!-- <picker @change="bindPickerChange" :value="index" :range="array">
									<view class="uni-input">{{array[index]}}</view>
								</picker> -->
								<view>{{item.snap_product&&item.snap_product.title?item.snap_product.title:''}}</view>
							</view>
						</view>
					</view>
					<!-- <image class="arrow" src="../../static/images/home-icon1.png"></image> -->
				</view>
				<view class="editNum pr">
					<view class="input">
						<input type="number"  placeholder="请输入数量" v-model="item.count">
					</view>
					<view class="delt">×</view>
				</view>
			</view>
		</view>
		
		
		<view class="submitbtn" style="margin-top: 300rpx;">
			<button type="button" @click="submit">确认</button>
		</view>
		
		
	</view>

</template>

<script>
	export default {
		data() {
			
			return {
				Router:this.$Router,			
				countArray:[],
				saveAfter:[]
			}
		},
		
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.$Utils.loadAll(['getMainData'], self)
		},

		methods: {
			
			
			submit(){
				const self = this;
				
					for (var j = 0; j < self.countArray.length; j++) {
						
						self.saveAfter.push(
							{
								tableName: 'OrderItem',
								FuncName: 'update',
								data: {
									count: self.countArray[j].count
								},
								searchItem: {
									id: self.countArray[j].id,
									user_type: 0
								}
							}
						)		
					}
				console.log('self.saveAfter',self.saveAfter)
				self.orderUpdate()
			},
			
			orderUpdate() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					order_no: self.mainData.order_no,
					user_type: 0
				};
				postData.data = {
					update_time: Date.parse(new Date())/1000
				};
				postData.tokenFuncName = 'getThreeToken';
				postData.saveAfter = self.$Utils.cloneForm(self.saveAfter)
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.$Utils.showToast(res.msg, 'none');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 800);
					} else {
						self.$Utils.showToast(res.msg, 'none');
					}
				};
				self.$apis.orderUpdate(postData, callback);
			},
			
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					id:self.id,
					user_type:0
				};	
				postData.tokenFuncName = 'getThreeToken';
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData=res.info.data[0];
						for (var i = 0; i < self.mainData.products.length; i++) {
							self.countArray.push(self.mainData.products[i])
						}
					} else {
						self.$Utils.showToast(res.msg,'none');
					};	
					console.log('self.countArray',self.countArray)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/index.css";
	
	.topInput{margin: 30rpx auto;border:2rpx solid #e7e7e7; border-radius: 10rpx;display: block;width: 100%;box-sizing: border-box;padding: 0 60rpx  0 20rpx;height: 62rpx;line-height: 62rpx;font-size: 26rpx;position: relative;}
	.topInput input{width: 100%; line-height: 60rpx; height: 60rpx; display: block;}
	.topInput::after{content: "m";color: #999;position: absolute; top: -2rpx;right: 20rpx;}
	.ind_seach .child{ display: flex;justify-content:space-between;padding-bottom: 30rpx;}
	.ind_seach .child:last-child{padding-bottom: 0;}
	.ind_seach .sqr_name .uni-input{font-size: 26px; color: #666;}
	.ind_seach .sqr_name,.ind_seach .editNum{width: 48%;}
	.ind_seach .editNum .input{position: relative;z-index: 0;}
	.ind_seach .editNum input{ width: 100%; height: 60rpx; line-height: 60rpx;border-radius:8rpx;border: 2rpx solid #cecece; padding: 0 10rpx;box-sizing: border-box; font-size: 26rpx;text-align: center; display: block;}
	
	.delt{ width: 26rpx;height: 26rpx;line-height: 26rpx; border-radius: 50%;color: #fff;font-size: 20rpx;background:#bbb;text-align: center;position: absolute; top: 10rpx;right: 20rpx; z-index: 66; }
	
</style>
