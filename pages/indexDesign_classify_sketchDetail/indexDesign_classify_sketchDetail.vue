<template>
	<view class="">
		<view class="sketchXq">
			<swiper class="swiper-box" :autoplay="autoplay" :indicator-dots="indicatorDots"  interval="3000" duration="1000" indicator-active-color="#FFCB1E">
				<block v-for="(item,index) in mainData.bannerImg" :key="index">
					<swiper-item class="swiper-item">
						<image :src="item.url" class="slide-image"/>
						<view class="labele">{{mainData.label[mainData.menu_id].title}}</view>
						<view class="font14 title">{{mainData.title}}</view>
						<view class="name">{{mainData.description}}</view>
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
				],
				mainData:{},
				autoplay:false,
				indicatorDots:false
			}
		},
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			
			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {};
				
				postData.searchItem = {
					id:self.id
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data[0];
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
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

 
