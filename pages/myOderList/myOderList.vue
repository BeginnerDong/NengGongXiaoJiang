<template>
	<view>
		<view class="orderNav">
			<view class="tt" :class="current==1?'on':''" @click="change('1')">全部</view>
			<view class="tt" :class="current==2?'on':''" @click="change('2')">待支付</view>
			<view class="tt" :class="current==3?'on':''" @click="change('3')">待发货</view>
			<view class="tt" :class="current==4?'on':''" @click="change('4')">待收货</view>
			<view class="tt" :class="current==5?'on':''" @click="change('5')">已完成</view>
		</view>
		<view class="prolisbox pdlr4">
			<view class="prolis boxShaow">
				<view class="datt">
					<view class="left">交易时间：2018-08-30</view>
					<view class="state">等待支付</view>
				</view>
				<view class="twoCt">
					<view class="leftbox">
						<image src="../../static/images/shopping-img1.png"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
						<view class="price">59.00</view>
					</view>
				</view>
				<view class="bBtn">
					<view class="btn gopay">去支付</view>
					<view class="btn selt">取消订单</view>
				</view>
			</view>
			<view class="prolis boxShaow">
				<view class="datt">
					<view class="left">交易时间：2018-08-30</view>
					<view class="state">等待发货</view>
				</view>
				<view class="twoCt">
					<view class="leftbox">
						<image src="../../static/images/shopping-img1.png"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
						<view class="price">59.00</view>
					</view>
				</view>
				<view class="bBtn">
					<view class="btn">退款</view>
				</view>
			</view>
			
			<view class="prolis boxShaow">
				<view class="datt">
					<view class="left">交易时间：2018-08-30</view>
					<view class="state">等待收货</view>
				</view>
				<view class="twoCt">
					<view class="leftbox">
						<image src="../../static/images/shopping-img1.png"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
						<view class="price">59.00</view>
					</view>
				</view>
				<view class="bBtn">
					<view class="btn">退款</view>
					<view class="btn">确认收货</view>
				</view>
			</view>
			
			<view class="prolis boxShaow">
				<view class="datt">
					<view class="left">交易时间：2018-08-30</view>
					<view class="state">已完成</view>
				</view>
				<view class="twoCt">
					<view class="leftbox">
						<image src="../../static/images/shopping-img1.png"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
						<view class="price">59.00</view>
					</view>
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
				wx_info: {},
				current:1
			}
		},

		onLoad(options) {
			uni.setStorageSync('canClick', true);
		},

		onShow() {
			const self = this;
			document.title = ''
		},

		methods: {
			change(current) {
				const self = this;
				if(current!=self.current){
					self.current = current
				}
			},

			getMainData() {
				const self = this;
				self.$apis.userGet(postData, callback);
			}
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	page{background: #f5f5f5; padding-bottom: 80rpx;}
</style>
