<template>
	<view>
		
		<cNavList></cNavList>
		
		<c-swiper></c-swiper>
		
		<view class="ind-cont4">
			<scroll-view class="list" scroll-x>
				<view class="item" v-for="(item,index) in classLis" :key="index"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/classify/classify'}})">
					<image :src="item.iconUrl" mode=""></image>
					<view>{{item.name}}</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="f5H10"></view>

		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">优秀建筑工</view>
		</view>
		<view class="designIndex pdlr4">
			<view class="items flexRowBetween" v-for="(item,index) in produtList" :key="index" @click="webSelf.$Router.navigateTo({route:{path:'/pages/indexWorkerDetail/indexWorkerDetail'}})">
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
					<view class="text2">擅长风格：欧式风、简约风、北美风、田园风</view>
					<view class="flexRowBetween saleB">
						<view class="priceM font14">6</view>
						<view class="color3 font12">成交量：500</view>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">优秀装修工</view>
		</view>
		<view class="designIndex pdlr4">
			<view class="items flexRowBetween" v-for="(item,index) in produtList" :key="index"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/indexWorkerDetail/indexWorkerDetail'}})">
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
					<view class="text2">擅长风格：欧式风、简约风、北美风、田园风</view>
					<view class="flexRowBetween saleB">
						<view class="priceM font14">6</view>
						<view class="color3 font12">成交量：500</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">优秀安装工</view>
		</view>
		<view class="designIndex pdlr4">
			<view class="items flexRowBetween" v-for="(item,index) in produtList" :key="index"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/indexWorkerDetail/indexWorkerDetail'}})">
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
				classLis:[
					{iconUrl:"../../static/images/home-icon3.png",name:"建筑工"},
					{iconUrl:"../../static/images/home-icon4.png",name:"装修工"},
					{iconUrl:"../../static/images/home-icon5.png",name:"维修工"},
					{iconUrl:"../../static/images/home-icon6.png",name:"园林工"},
					{iconUrl:"../../static/images/home-icon7.png",name:"市政工"},
					{iconUrl:"../../static/images/home-icon8.png",name:"安装工"},
					{iconUrl:"../../static/images/home-icon9.png",name:"其他"}
				],
				produtList: [
					{},{},{}
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
</style>
