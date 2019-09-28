<template>
	<view class="banner-box pdlr4">
		<view class="banner">
			<swiper class="swiper-box" indicator-dots="true" autoplay="true" interval="3000" duration="1000" indicator-active-color="#FFCB1E">
				<block v-for="(item,index) in swiperData.mainImg" :key="index">
					<swiper-item class="swiper-item">
						<image :src="item.url" class="slide-image" />
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array
		},
		data() {
			return {
				currIndex: 0,
				
				labelData: [
					"../../static/images/home-banenr.png",
					"../../static/images/details-img1.png",
				],
				swiperData:{}
			};
		},
		mounted() {
			// 导航当前项
			const self = this;
			var pages = getCurrentPages();
			var page = pages[pages.length - 1].route;
			console.log('222',page)
			if(page=='pages/index/index'){
				self.title='首页'
			}else if(page=='pages/indexDesign/indexDesign'){
				self.title='设计'
			}else if(page=='pages/indexWorker/indexWorker'){
				self.title='工人'
			}else if(page=='pages/material/material'){
				self.title='材料'
			}else if(page=='pages/houseShow/houseShow'){
				self.title='房源展示'
			}else if(page=='pages/interactive/interactive'){
				self.title='互动'
			}else if(page=='pages/supervision/supervision'){
				self.title='监理'
			}else if(page=='pages/college/college'){
				self.title='学院'
			}
			self.getMainData()
		},
		methods: {
			change(s) {
				this.currIndex = s.detail.current;
			},
			
			getMainData() {
				const self = this;
				
				const postData = {};
			
				postData.searchItem = {
					thirdapp_id:2,
					title:self.title+'轮播'
				};
				
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.swiperData = res.info.data[0];
					} else {
						self.$Utils.showToast('没有更多了', 'none');
					};
					console.log('self.swiperData',self.swiperData)
					
				};
				self.$apis.labelGet(postData, callback);
			},
		}
	}
</script>
<style>
	.swiper-box{border-radius:10rpx;overflow: hidden;}
</style>

