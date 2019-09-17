<template>
	<view>
		<view class="pdlr4 ">
			<view class="pr topInput">
				<view style="width: 80%; position: relative;z-index: 0;">
					<input class="" type="text" value="200" placeholder="">
				</view>
				<view class="delt" style="right: auto;left: 20%;">×</view>
			</view>
		</view>
		
		<view class="pdlr4">辅料</view>
		<view class="ind_seach" style="border-bottom: 2rpx solid #f5f5f5;">
			<view class="child">
				<view class="sqr_name">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="index" :range="array">
									<view class="uni-input">{{array[index]}}</view>
								</picker>
							</view>
						</view>
					</view>
					<image class="arrow" src="../../static/images/home-icon1.png"></image>
				</view>
				<view class="editNum pr">
					<view class="input">
						<input type="number" value="24" placeholder="请输入数量">
					</view>
					<view class="delt">×</view>
				</view>
			</view>
			<view class="child">
				<view class="sqr_name">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="PickerChangeTwo" :value="indexTwo" :range="arrayTwo">
									<view class="uni-input">{{arrayTwo[indexTwo]}}</view>
								</picker>
							</view>
						</view>
					</view>
					<image class="arrow" src="../../static/images/home-icon1.png"></image>
				</view>
				<view class="editNum pr">
					<view class="input">
						<input type="number" value="24" placeholder="请输入数量">
					</view>
					<view class="delt">×</view>
				</view>
			</view>
		</view>
		
		
		<view class="submitbtn" style="margin-top: 300rpx;">
			<button type="button">确认</button>
		</view>
		
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				webSelf: this,
				showView: false,
				score: '',
				wx_info: {},
				index: 0,
				array:['鞋柜','门规','衣柜','床头柜','其他'],
				indexTwo: 0,
				arrayTwo:['水泥','沙子','钢筋','其他']
			}
		},

		methods: {
			bindPickerChange(e) {
				// 搜索选择分类
				const self = this;
				console.log('picker发送选择改变，携带值为', e.target.value)
				self.index = e.target.value
			},
			PickerChangeTwo(e) {
				// 搜索选择分类
				const self = this;
				console.log('picker发送选择改变，携带值为', e.target.value)
				self.indexTwo = e.target.value
			},
			getMainData() {
				const self = this;
				self.$apis.userGet(postData, callback);
			}
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
	.ind_seach .sqr_name .uni-input{font-size: 26rpx; color: #666;}
	.ind_seach .sqr_name,.ind_seach .editNum{width: 48%;}
	.ind_seach .editNum .input{position: relative;z-index: 0;}
	.ind_seach .editNum input{ width: 100%; height: 60rpx; line-height: 60rpx;border-radius:8rpx;border: 2rpx solid #cecece; padding: 0 10rpx;box-sizing: border-box; font-size: 13rpx;text-align: center; display: block;}
	
	.delt{ width: 26rpx;height: 26rpx;line-height: 26rpx; border-radius: 50%;color: #fff;font-size: 20rpx;background:#bbb;text-align: center;position: absolute; top: 10rpx;right: 20rpx; z-index: 66; }
	
</style>
