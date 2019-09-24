<template>
	<view>
		<view class="myNeed_ind pdlr4">
			<view class="item boxShaow flexRowBetween" @click=" Router.navigateTo({route:{path:'/pages/myNeedsDetail/myNeedsDetail'}})">
				<view class="cont">
					<view class="lis flex">
						<image class="icon" src="../../static/images/home-housing-icon1.png" mode=""></image>
						<view class="name">所在城市</view>
						<view class="tex">西安市</view>
					</view>
					<view class="lis flex">
						<image class="icon" src="../../static/images/home-housing-icon1.png" mode=""></image>
						<view class="name">房屋面积</view>
						<view class="tex">200㎡</view>
					</view>
				</view>
				<view class="arrow"><image src="../../static/images/arrow-icon1.png" mode=""></image></view>
			</view>
			<view class="item boxShaow flexRowBetween"  @click=" Router.navigateTo({route:{path:'/pages/myNeedsDetail/myNeedsDetail'}})">
				<view class="cont">
					<view class="lis flex">
						<image class="icon" src="../../static/images/home-housing-icon1.png" mode=""></image>
						<view class="name">所在城市</view>
						<view class="tex">西安市</view>
					</view>
					<view class="lis flex">
						<image class="icon" src="../../static/images/home-housing-icon1.png" mode=""></image>
						<view class="name">房屋面积</view>
						<view class="tex">200㎡</view>
					</view>
				</view>
				<view class="arrow"><image src="../../static/images/arrow-icon1.png" mode=""></image></view>
			</view>
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
