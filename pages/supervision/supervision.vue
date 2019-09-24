<template>
	<view>
		<view style="background: #fff;padding-bottom: 30rpx;">
			<cNavList></cNavList>
			<c-swiper></c-swiper>
		</view>
		
		<view class="f5H10" style="margin-top: 20rpx;"></view>
		
		<view class="fabubtn">
			<view class="icon"  @click=" Router.navigateTo({route:{path:'/pages/supervision_add/supervision_add'}})">
				<image src="../../static/images/home-supervision-icon4.png" mode=""></image>
			</view>
			<view class="tit">申请监理</view>
		</view>
		<view class="f5H10"></view>
		
		<view class="supervst_idexLis pdlr4 flexRowBetween">
			<view class="child boxShaow" v-for="(item,index) in supervisionDate" :key="index"  @click=" Router.navigateTo({route:{path:'/pages/supervisionDetail/supervisionDetail'}})">
				<view class="photo">
					<image src="../../static/images/home-supervision-img1.png" mode=""></image>
				</view>
				<view class="name avoidOverflow">李绍兰</view>
				<view class="flexCenter starClass">
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
				scrollTop: 100,
				currt:0,
				index: 0,
				supervisionDate:[
					{},{},{},{},{},{}
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
		padding-bottom: 60rpx;
	}
	

</style>
