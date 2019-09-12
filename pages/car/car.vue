<template>
	<view>
		<view class="pdlr4">
			<view class="caiLis flexRowBetween boxShaow">
				<view class="itemL">
					<view><image src="../../static/images/about-address-icon4.png" mode=""></image></view>
				</view>
				<view class="twoCt flexRowBetween">
					<view class="leftbox">
						<image src="../../static/images/home-interactive-img1.png"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
						<view class="price">59.00</view>
						<view class="numBox">
							<view @click="plus">+</view>
							<view class="num">{{proNum}}</view>
							<view @click="reduce">-</view>
						</view>
					</view>
				</view>
			</view>
			<view class="caiLis flexRowBetween boxShaow">
				<view class="itemL">
					<view><image src="../../static/images/about-address-icon4.png" mode=""></image></view>
				</view>
				<view class="twoCt flexRowBetween">
					<view class="leftbox">
						<image src="../../static/images/shopping-img1.png"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
						<view class="price">59.00</view>
						<view class="numBox">
							<view>+</view>
							<view class="num">{{proNum}}</view>
							<view>-</view>
						</view>
					</view>
				</view>
			</view>
			</view>
		<view class="allPrice flexRowBetween">
			<view class="ll">
				<image src="../../static/images/about-address-icon1.png" ></image>
				<image src="../../static/images/about-address-icon4.png" ></image>
				全选
			</view>
			<view class="rr">
				合计：<view class="mny">0.00</view>
				<span class="jsBtn" @click="webSelf.$Router.navigateTo({route:{path:'/pages/confirmOrder/confirmOrder'}})">结算</span>
			</view>
		</view>	
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				webSelf: this,
				is_show:false,
				score: '',
				proNum:0,
				wx_info: {}
			}
		},

		onLoad(options) {
			uni.setStorageSync('canClick', true);
		},

		onShow() {
			const self = this;
			document.title = '购物车'
		},

		methods: {
			change() {
				const self = this;
			},

			getMainData() {
				const self = this;
				self.$apis.userGet(postData, callback);
			},
			plus(){
				const self = this;
				self.proNum = proNum++
			}
		}
	}
</script>

<style>
	@import "../../assets/style/car.css";
	page{padding-bottom: 160rpx; background: #f5f5f5;}
	

</style>
