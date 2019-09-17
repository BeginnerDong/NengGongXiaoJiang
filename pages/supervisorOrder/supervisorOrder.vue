<template>
	<view>
		<view class="topSeachBox">
			<view class="cont flexRowBetween">
				<image class="icon" src="../../static/images/home-icon2.png" mode=""></image>
				<view class="input"><input type="text" value="" placeholder="搜索订单" placeholder-style="color:#999;font-size:24rpx" /></view>
				<view class="btn">搜索</view>
			</view>
		</view>
		
		<view class="prolisbox pdlr4">
			<view class="prolis boxShaow">
				<view class="datt">
					<view class="left">
						<view class="color2" style="margin-bottom: 10rpx;">订单编号：123356885555</view>
						<view class="color3">交易时间：2018-08-30</view>
					</view>
					<view class="state">等待确认</view>
				</view>
				<view class="twoCt">
					<view class="leftbox">
						<image src="../../static/images/shopping-img1.png"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
						<view class="text avoidOverflow2">服务内容：欧式风、简约风、北美风、田园风</view>
						<view class="price priceM">59</view>
					</view>
				</view>
				<view class="bBtn">
					<view class="btn"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/supervisorOrderDetail/supervisorOrderDetail'}})">查看详情</view>
				</view>
			</view>
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
	page{padding-bottom: 80rpx;}
	.topSeachBox{background: #f5f5f5; padding: 30rpx 4%;box-sizing: border-box;}
	.topSeachBox .cont{ border: 2rpx solid #e7e7e7;background: #fff;border-radius: 10rpx; box-sizing: border-box;position: relative;padding-left: 68rpx; height: 68rpx;overflow: hidden;}
	.topSeachBox .cont .icon{ position: absolute; top: 50%;left: 20rpx;transform: translateY(-50%); width: 30rpx; height: 30rpx; display: block; }
	.topSeachBox .cont .input{ width: 75%;padding-right: 2%;}
	.topSeachBox .cont .input input{ display: block; width: 100%; height: 60rpx; line-height: 60rpx; font-size: 28rpx;}
	.topSeachBox .cont .btn{width: 120rpx; position: absolute; top: 0;right: 0; bottom: 0;background: #FFCB1E;text-align: center;line-height: 62rpx;}
	.prolis3 .cont{padding: 20rpx 0;box-sizing: border-box;}
	.prolis3 .tex{margin-top: 20rpx;}
	.bBtn .btn.yellow{ border: 2rpx solid #FFCB1E;color: #FFCB1E;}
</style>
