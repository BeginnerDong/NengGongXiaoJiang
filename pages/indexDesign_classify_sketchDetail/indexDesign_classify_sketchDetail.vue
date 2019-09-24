<template>
	<view class="">
		<view class="sketchXq">
			<swiper class="swiper-box" indicator-dots="indicatorDots" autoplay="autoplay" interval="interval" duration="duration" indicator-active-color="#FFCB1E">
				<block v-for="(item,index) in labelData" :key="index">
					<swiper-item class="swiper-item">
						<image :src="item" class="slide-image"/>
						<view class="labele">简约风</view>
						<view class="font14 title">标题标题标题标题标题标题标题标题标题标题标题标题</view>
						<view class="name">张三</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currIndex: 0,
				Router:this.$Router,
				labelData: [
					"../../static/images/home-banenr.png",
					"../../static/images/details-img1.png",
				]
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';

				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data;
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMainData');

				};
				self.$apis.orderGet(postData, callback);

			},

		},
	};
</script>
<style>
	@import "../../assets/style/index.css";
	page{background: #292929;}
	.sketchXq{position: fixed;top: 0;left: 0;right: 0;bottom: 0;}
	.swiper-box {
		height:1040rpx;
		width: 600rpx;
		box-sizing: border-box;
		overflow: hidden;
		position: absolute;
		top: 50%;
		left: 50%;
		transform:translate(-50%,-50%);
		color: #fff;
	}
	
	.swiper-box swiper-item {
		width: 100%;
	}
	
	.swiper-box image {
		width: 100%;
		height: 800rpx;
	}
	.swiper-box .title{margin: 40rpx 0 10px 0;line-height: 48rpx;}

	.labele{position: absolute; top: 20rpx;right: 0;background: #22ac38;padding: 0 20rpx; line-height: 44rpx;font-size: 26rpx; color: #fff;border-radius: 30rpx 0 0 30rpx;}
</style>

 
