<template>
	<view>
		<view style="background: #fff;padding-bottom: 30rpx;">
			<cNavList></cNavList>
			<c-swiper></c-swiper>
		</view>
		
		<view class="f5H10" style="margin-top: 20rpx;"></view>
		
		<view class="fabubtn">
			<view class="icon"   @click=" Router.navigateTo({route:{path:'/pages/designer_login/designer_login?type=supervision'}})">
				<image src="../../static/images/home-supervision-icon4.png" mode=""></image>
			</view>
			<view class="tit">申请监理</view>
		</view>
		<view class="f5H10"></view>
		
		<view class="supervst_idexLis pdlr4 flexRowBetween">
			<view class="child boxShaow" v-for="(item,index) in mainData" :key="index" 
			 @click=" Router.navigateTo({route:{path:'/pages/supervisionDetail/supervisionDetail?user_no='+item.user_no}})">
				<view class="photo">
					<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" mode=""></image>
				</view>
				<view class="name avoidOverflow">{{item.name}}</view>
				<view class="flexRowBetween starClass">
					<view class="starBox">
						<image v-for="c_item in stars" :src="item.level/2 > c_item ?(item.level/2-c_item == 0.5?halfSrc:selectedSrc) : normalSrc" mode="">							
						</image>
					</view>
					<view>{{item.level}}分</view>
				</view>
			</view>
		</view>

		<!--底部tab键-->
		<view class="navbar">
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/index/index'}})">
				<view class="nav_img">
					<image src="../../static/images/nabar1-a.png" />
				</view>
				<view class="text this-text">首页</view>
			</view>
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/needs/needs'}})" >
				<view class="nav_img">
					<image src="../../static/images/nabar2.png" />
				</view>
				<view class="text">发需求</view>
			</view>
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/car/car'}})" >
				<view class="nav_img">
					<image src="../../static/images/nabar3.png" />
				</view>
				<view class="text">购物车</view>
			</view>
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/user/user'}})">
				<view class="nav_img">
					<image src="../../static/images/nabar4.png" />
				</view>
				<view class="text">我的</view>
			</view>
		</view>
		<!--底部tab键 end-->	

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
				Router:this.$Router,
				
				supervisionDate:[
					{},{},{},{},{},{}
				],
				mainData:[],
				stars: [0, 1, 2, 3, 4],
				normalSrc: '../../static/images/home-supervision-icon3.png',
				selectedSrc: '../../static/images/home-supervision-icon1.png',
				halfSrc: '../../static/images/home-supervision-icon2.png',
			}
		},
		
		onLoad() {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getMainData'], self);
		},
		
		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},
		methods: {
			
			getMainData(isNew) {
				const self = this;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						is_page: true,
						pagesize: 5
					}
				};
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id:2,
					user_type:2,
					level:['>',0]
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					}
					console.log('self.workOneData',self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
		},
	};
</script>

<style>
	/* @import "../../assets/style/index.css"; */
	@import "../../assets/style/navbar.css";

	page {
		padding-bottom: 140rpx;
	}
	
/* 监理 */
.supervst_idexLis{ display: flex; align-items: normal; flex-wrap: wrap;padding-top: 30rpx;}
.supervst_idexLis .child{width: 330rpx;padding: 40rpx 30rpx; box-sizing: border-box; text-align: center;border-radius: 10rpx; margin-bottom: 30rpx;}
.supervst_idexLis .child .photo{ width: 220rpx; height: 220rpx;margin: 0 auto;border-radius: 50%;}
.supervst_idexLis .child .photo image{width: 100%; height: 100%; display: block;}
.supervst_idexLis .child .name{ font-size: 28rpx; margin: 20rpx 0;}

</style>
