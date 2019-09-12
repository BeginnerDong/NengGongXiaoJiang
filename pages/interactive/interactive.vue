<template>
	<view>
		<view style="background: #fff;padding-bottom: 30rpx;">
			<cNavList></cNavList>
			<c-swiper></c-swiper>
		</view>
		
		<view class="f5H10" style="margin-top: 20rpx;"></view>
		
		<view class="fabubtn" @click="webSelf.$Router.navigateTo({route:{path:'/pages/interactive_release/interactive_release'}})">
			<view class="icon">
				<image src="../../static/images/home-interactive-icon1.png" mode=""></image>
			</view>
			<view class="tit">发布</view>
		</view>
		
		<view class="interct_idexLis mglr4 boxShaow">
			<view class="child" @click="webSelf.$Router.navigateTo({route:{path:'/pages/interactiveDetail/interactiveDetail'}})">
				<view class="flex">
					<view class="photo"><image src="../../static/images/home-interactive-img.png" mode=""></image></view>
					<view class="name">
						<view class="font13">快乐的猫</view>
						<view class="time">2019年6月28日</view>
					</view>
				</view>
				<view class="text font13">互动内容互动内容互动内容互动内容互动内容互动内容互动内容互动内容</view>
				<view class="imgbox">
					<view class="lisThree">
						<image src="../../static/images/home-interactive-img1.png" mode=""></image>
					</view>
					<view class="lisThree">
						<image src="../../static/images/home-interactive-img1.png" mode=""></image>
					</view>
					<view class="lisThree">
						<image src="../../static/images/home-interactive-img1.png" mode=""></image>
					</view>
				</view>
				<view class="label">
					<view class="lis">
						<image src="../../static/images/home-interactive-icon3.png" mode=""></image>
						<view>21165</view>
					</view>
					<view class="lis">
						<image src="../../static/images/home-interactive-icon2.png" mode=""></image>
						<view>565</view>
					</view>
					<view class="lis">
						<image src="../../static/images/home-interactive-icon4.png" mode=""></image>
						<view>2015</view>
					</view>
				</view>
			</view>
			
			<view class="child"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/interactiveDetail/interactiveDetail'}})">
				<view class="flex">
					<view class="photo"><image src="../../static/images/home-interactive-img.png" mode=""></image></view>
					<view class="name">
						<view class="font13">快乐的猫</view>
						<view class="time">2019年6月28日</view>
					</view>
				</view>
				<view class="text font13">互动内容互动内容互动内容互动内容互动内容互动内容互动内容互动内容</view>
				<view class="imgbox">
					<view class="lisTwo">
						<image src="../../static/images/home-interactive-img1.png" mode=""></image>
					</view>
					<view class="lisTwo">
						<image src="../../static/images/home-interactive-img1.png" mode=""></image>
					</view>
				</view>
				<view class="label">
					<view class="lis">
						<image src="../../static/images/home-interactive-icon3.png" mode=""></image>
						<view>21165</view>
					</view>
					<view class="lis">
						<image src="../../static/images/home-interactive-icon2.png" mode=""></image>
						<view>565</view>
					</view>
					<view class="lis">
						<image src="../../static/images/home-interactive-icon4.png" mode=""></image>
						<view>2015</view>
					</view>
				</view>
			</view>
			
			<view class="child"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/interactiveDetail/interactiveDetail'}})">
				<view class="flex">
					<view class="photo"><image src="../../static/images/home-interactive-img.png" mode=""></image></view>
					<view class="name">
						<view class="font13">快乐的猫</view>
						<view class="time">2019年6月28日</view>
					</view>
				</view>
				<view class="text font13">互动内容互动内容互动内容互动内容互动内容互动内容互动内容互动内容</view>
				<view class="imgbox">
					<view class="lisOne">
						<image src="../../static/images/home-interactive-img1.png" mode=""></image>
					</view>
				</view>
				<view class="label">
					<view class="lis">
						<image src="../../static/images/home-interactive-icon3.png" mode=""></image>
						<view>21165</view>
					</view>
					<view class="lis">
						<image src="../../static/images/home-interactive-icon2.png" mode=""></image>
						<view>565</view>
					</view>
					<view class="lis">
						<image src="../../static/images/home-interactive-icon4.png" mode=""></image>
						<view>2015</view>
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
				webSelf: this,
				showView: false,
				score:'',
				Router:this.$Router,
				wx_info:{},
				scrollTop: 100,
				currt:0,
				index: 0
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
		padding-bottom: 60rpx;
		background: #f5f5f5;
	}
	.ind-cont4 .item{width: 33.3%;}
	

</style>
