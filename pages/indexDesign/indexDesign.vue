<template>
	<view>
		<cNavList></cNavList>
		
		<c-swiper></c-swiper>
		
		<view class="ind-cont4 flexCenter">
			<scroll-view class="list" scroll-x>
				<view class="item"@click=" Router.navigateTo({route:{path:'/pages/indexDesign_classify/indexDesign_classify'}})">
					<image src="../../static/images/home-design-icon1.png" mode=""></image>
					<view>个人设计师</view>
				</view>
				<view class="item" @click=" Router.navigateTo({route:{path:'/pages/indexDesign_classify/indexDesign_classify'}})">
					<image src="../../static/images/home-design-icon2.png" mode=""></image>
					<view>团队设计</view>
				</view>
				<view class="item" @click=" Router.navigateTo({route:{path:'/pages/indexDesign_classify_sketch/indexDesign_classify_sketch'}})">
					<image src="../../static/images/home-design-icon3.png" mode=""></image>
					<view>效果图</view>
				</view>
				<view class="item" @click=" Router.navigateTo({route:{path:'/pages/indexDesign_classify_VR/indexDesign_classify_VR'}})">
					<image src="../../static/images/home-design-icon4.png" mode=""></image>
					<view>VR视频</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="f5H10"></view>
		
		<view style="padding: 30rpx 0;">
			<img src="../../static/images/home-design-img1.png" style="width: 100%;height: 300rpx;" alt="">
		</view>
		<view class="f5H10"></view>

		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">推荐设计师</view>
		</view>
		<view class="designIndex pdlr4">
			<view class="items flexRowBetween" v-for="(item,index) in produtList" :key="index" @click=" Router.navigateTo({route:{path:'/pages/indexDesignDetail/indexDesignDetail'}})">
				<view class="pic">
					<image src="../../static/images/home-img3.png" alt="" />
				</view>
				<view class="infor">
					<view class="title flex">
						<view>张大嘴</view>
						<view class="flexRowBetween starClass">
							<view class="starBox">
								<image src="../../static/images/home-supervision-icon1.png" mode=""></image>
								<image src="../../static/images/home-supervision-icon1.png" mode=""></image>
								<image src="../../static/images/home-supervision-icon1.png" mode=""></image>
								<image src="../../static/images/home-supervision-icon2.png" mode=""></image>
								<image src="../../static/images/home-supervision-icon3.png" mode=""></image>
							</view>
							<view>9.5分</view>
						</view>
					</view>
					<view class="text2 avoidOverflow2">擅长风格：欧式风、简约风、北美风、田园风</view>
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
	import cSwiper from "@/components/swiper/swiper.vue";
	import cNavList from "@/components/navList/navList.vue"
	
	export default {
		components: {
			cSwiper,
			cNavList
		},
		data() {
			return {
				
				showView: false,
				score:'',
				Router:this.$Router,
				wx_info:{},
				produtList: [
					{},{},{},{}
				]
			}
		},
		
		onLoad() {
			const self = this;
			// self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			activeNav:function(index){
				const self = this;
				
			},
			bindPickerChange(e) {
				// 搜索选择分类
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
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

	page {
		padding-bottom: 30rpx;
	}
	.ind-cont4 .item{width: 25%;}
</style>
