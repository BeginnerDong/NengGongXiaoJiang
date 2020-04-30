<template>
	<view>
		<cNavList></cNavList>
		
		<c-swiper></c-swiper>
		
		<view class="ind-cont4 flexCenter">
			<scroll-view class="list" scroll-x>
				<view class="item"
				@click=" Router.navigateTo({route:{path:'/pages/indexDesign_classify/indexDesign_classify?name=个人设计师'}})">
					<image src="../../static/images/home-design-icon1.png" mode=""></image>
					<view>个人设计师</view>
				</view>
				<view class="item" 
				@click=" Router.navigateTo({route:{path:'/pages/indexDesign_classify/indexDesign_classify?name=团队设计师'}})">
					<image src="../../static/images/home-design-icon2.png" mode=""></image>
					<view>团队设计</view>
				</view>
				<view class="item" @click=" Router.navigateTo({route:{path:'/pages/indexDesign_classify_sketch/indexDesign_classify_sketch'}})">
					<image src="../../static/images/home-design-icon3.png" mode=""></image>
					<view>效果图</view>
				</view>
				<view class="item" @click=" Router.navigateTo({route:{path:'/pages/indexDesign_classify_VR/indexDesign_classify_VR'}})">
					<image src="../../static/images/home-design-icon4.png" mode=""></image>
					<view>视频</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="f5H10"></view>
		
		<view style="padding: 30rpx 0;">
			<img :src="labelData.mainImg&&labelData.mainImg[0]?labelData.mainImg[0].url:''"  
			@click="Router.navigateTo({route:{path:labelData.url}})" style="width: 100%;height: 300rpx;" alt="">
		</view>
		<view class="f5H10"></view>
		
		<view class="fabubtn" @click=" Router.navigateTo({route:{path:'/pages/designer_login/designer_login?type=designer'}})" style="width: 140rpx;">
			<view class="icon">
				<image src="../../static/images/home-interactive-icon1.png" mode=""></image>
			</view>
			<view class="tit font13">注册设计师</view>
		</view>

		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">推荐设计师</view>
		</view>
		<view class="designIndex pdlr4">
			<view class="items flexRowBetween" v-for="(item,index) in mainData" :key="index" :data-user_no="item.user_no"
			@click=" Router.navigateTo({route:{path:'/pages/indexDesign_index/indexDesign_index?user_no='+$event.currentTarget.dataset.user_no}})">
				<view class="pic">
					<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" alt="" />
				</view>
				<view class="infor">
					<view class="title flex">
						<view>{{item.name}}</view>
						<view class="flexRowBetween starClass">
							<view class="starBox">
								<image v-for="c_item in stars" :src="item.level/2 > c_item ?(item.level/2-c_item == 0.5?halfSrc:selectedSrc) : normalSrc" mode="">							
								</image>
							</view>
							<view>{{item.level}}分</view>
						</view>
					</view>
					
					<view class="text2 avoidOverflow2">{{item.introduce}}</view>
					<view class="flexRowBetween saleB">
						
						<view class="color3 font12">成交量：{{item.volume}}</view>
					</view>
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
				
				showView: false,
				score:'',
				Router:this.$Router,
				wx_info:{},
				produtList: [
					{},{},{},{}
				],
				mainData:[],
				stars: [0, 1, 2, 3, 4],
				normalSrc: '../../static/images/home-supervision-icon3.png',
				selectedSrc: '../../static/images/home-supervision-icon1.png',
				halfSrc: '../../static/images/home-supervision-icon2.png',
				labelData:{}
			}
		},
		
		onLoad() {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getMainData','getLabelData'], self);
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
			
			getLabelData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id:2,
					title:'设计师广告图'
				};
				
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.labelData = res.info.data[0]
					}
					self.$Utils.finishFunc('getLabelData');
				};
				self.$apis.labelGet(postData, callback);
			},
			
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
				postData.getBefore = {
					user: {
						tableName: 'User',
						searchItem: {
							identity: ['in', [2]],
						},
						middleKey: 'user_no',
						key: 'user_no',
						condition: 'in',
					},
				};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id:2,
					user_type:1,
					on_shelf:1
				};
				postData.order = {
					volume:'desc'
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
	@import "../../assets/style/designIndex.css";
	@import "../../assets/style/index.css";
	@import "../../assets/style/navbar.css";

	page {
		padding-bottom: 140rpx;
	}
	.ind-cont4 .item{width: 25%;}
</style>
