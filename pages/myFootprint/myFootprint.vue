<template>
	<view>
		<view class="designIndex pdlr4" style="padding-top: 10rpx;">
			<view class="items flexRowBetween" v-for="(item,index) in produtList" :key="index"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/indexDesignDetail/indexDesignDetail'}})">
				<view class="pic">
					<image src="../../static/images/home-img3.png" alt="" />
				</view>
				<view class="infor">
					<view class="title flex">
						<view class="avoidOverflow">名称名称名称名称名称名称名称名称名称</view>
					</view>
					<view class="text2">擅长风格：欧式风、简约风、北美风、田园风</view>
					<view class="flexRowBetween saleB">
						<view class="priceM font14">6</view>
						<view class="color3 font12">成交量：500</view>
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
				current:1,
				produtList:[
					{},{}
				]
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
	@import "../../assets/style/index.css";
	page{padding-bottom: 80rpx;}
</style>
