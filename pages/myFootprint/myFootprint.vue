<template>
	<view>
		<view class="designIndex pdlr4" style="padding-top: 10rpx;">
			<view class="items flexRowBetween" v-for="(item,index) in footData" :key="index"  
			@click=" Router.navigateTo({route:{path:'/pages/indexDesignDetail/indexDesignDetail?id='+item.id}})">
				<view class="pic">
					<image :src="item.userInfo[0].mainImg[0].url" alt="" />
				</view>
				<view class="infor">
					<view class="title flex">
						<view class="avoidOverflow">{{item.userInfo[0].name}}</view>
					</view>
					<view class="text2">{{item.userInfo[0].introduce}}</view>
					<view class="flexRowBetween saleB">
						<view class="priceM font14">{{item.price}}</view>
						<view class="color3 font12">成交量：{{item.sale_count}}</view>
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
				Router:this.$Router,
				footData:[]
			}
		},

		onLoad(options) {
			const self = this;
			self.footData = self.$Utils.getStorageArray('footData');
			uni.setStorageSync('canClick', true);
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
