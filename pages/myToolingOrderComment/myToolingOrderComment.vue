<template>
	<view>
		<view class="prolisbox pdlr4">
			<view class="prolis">
				<view class="datt">
					<view class="left">
						<view class="color3">交易时间：2019-08-30</view>
					</view>
					<view class="state">已经完成</view>
				</view>
				<view class="twoCt">
					<view class="leftbox">
						<image src="../../static/images/shopping-img1.png"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow3">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
						<view class="price priceM">59</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="pdlr4">
			<view class="pjEdit">
				<view class="fon14">填写评价</view>
				<view>
					<textarea value="" placeholder="请写下您的宝贵意见" />
				</view>
			</view>
		</view>
		
		<view class="submitbtn" style="margin-top: 160rpx;">
			<button type="button">确定</button>
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				showView: false,
				score: '',
				wx_info: {}
			}
		},

		methods: {
			
			getMainData() {
				const self = this;
				self.$apis.userGet(postData, callback);
			}
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	page{padding-bottom: 80rpx; background: #F5F5F5;}
	.pjEdit{ margin-top: 30rpx;padding: 30rpx;background: #fff; border-radius: 10rpx;}
	textarea{width: 100%; height: 300rpx;background: #F5F5F5; display: block;padding: 30rpx; box-sizing: border-box; font-size: 26rpx; margin-top:20rpx;}
</style>
