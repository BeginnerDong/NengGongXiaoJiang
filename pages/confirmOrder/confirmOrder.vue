<template>
	<view class="" >

		<view>
			<view class="flexRowBetween cfmSetAdrs"  @click=" Router.navigateTo({route:{path:'/pages/myAddress/myAddress'}})">
				<view class="yy-title">收货地址</view>
				<view class="yy-adrs flexRowBetween">
					<view class="cont">
						<view class="name" >张三&nbsp;&nbsp;&nbsp;&nbsp;15689795323</view>
						<view class="" >陕西省西安市雁塔区高新大都荟</view>
					</view>
					<image class="arrow" src="../../static/images/arrow-icon1.png" alt=""/>
				</view>
			</view>
			
			<view class="mainbox">
				<view class="twoCt" v-for="(item,index) in proLisDate" :key="index">
					<view class="leftbox">
						<image src="../../static/images/home-interactive-img1.png"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
						<view class="price">56.00</view>
						<view class="numBox" style="position: absolute; right: 0; bottom: 0;">
							<view >-</view>
							<view class="num">{{count}}</view>
							<view >+</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="underFix">
			合计： <view class="price">56.00</view>
			<view class="btn" @click=" Utils.stopMultiClick(submit)">立即购买</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				count:1,
				proLisDate:[
					{},
					{}
				]
			}
		},

		onLoad(options) {
			uni.setStorageSync('canClick', true);
		},

		

		methods: {
			change(){
				const self = this;
			},

			getMainData() {
				const self = this;
				self.$apis.userGet(postData, callback);
			}
		}
	}
</script>

<style>
	@import "../../assets/style/car.css";
	
	page{background: #f5f5f5;}
	.mainbox .twoCt{width: 100%; justify-content: space-between;border-bottom: 2rpx solid #e7e7e7;padding: 40rpx 0;}
	.twoCt .cont{width: 476rpx;}
	
	.mainbox{padding: 0 4%;border-bottom: 2rpx solid #e7e7e7;background: #fff;}
	.mainbox:last-child{border-bottom: none;}
	.cfmSetAdrs{padding:40rpx 4%; background: #fff; justify-content: flex-start;position:relative; border-bottom: 20rpx solid #f5f5f5; align-items: normal;}
	.yy-title{width: 20%;}
	.yy-adrs{width: 80%;font-size: 28rpx;color: #666; flex-wrap: wrap;}
	.yy-adrs .cont{ width: 88%;}
	.yy-adrs .arrow{ width: 15rpx;height: 30rpx;;}
	.yy-adrs .name{ width: 70%; margin-bottom: 10rpx;}
	
	
	.underFix{ width: 100%; padding: 0 4%;box-sizing: border-box; line-height: 100rpx; box-shadow: 0 -4rpx 6rpx rgba(0,0,0,0.1); display: flex; justify-content: flex-end; font-size: 28rpx; align-items: center; position: fixed; bottom: 0; left: 0;}
	.underFix .price{ font-size: 28rpx; color: #FF3B3B;}
	.underFix .price::before{content: "￥"; font-weight: normal;}
	.underFix .btn{ width: 200rpx; height: 70rpx; text-align: center; line-height: 70rpx; color: #222; background: #FFCB1E; border-radius: 50rpx; margin-left: 20rpx;font-size: 30rpx;}
</style>
