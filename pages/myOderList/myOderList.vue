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
					<view class="btn" @click="refundAlert">退款</view>
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
					<view class="btn" @click="refundAlert">退款</view>
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

		<view class="refundAlert" v-if="is_show">
			<view class="refundExplain">
				<view>
					<textarea class="textMsg" value="" placeholder="请填写退款原因" placeholder-style="color:#999" />
				</view>
				<view class="submitbtn">
					<button type="button" style="width: 100%; margin:80rpx 0 20rpx 0;">提交</button>
				</view>
				<view class="colseBtn"  @click="refundAlert" style="top: auto;bottom: -120rpx;">×</view>
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
				current:1,
				is_show:false
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
			refundAlert(){
				const self = this;
				self.is_show = !self.is_show
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
