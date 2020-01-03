<template>
	<view>
		
		<cNavList></cNavList>
		
		<c-swiper></c-swiper>
		
		<view class="ind-cont4">
			<scroll-view class="list" scroll-x>
				<view class="item" v-for="(item,index) in classLis" :key="index"  :data-id="item.id" :data-name="item.name"
				@click="Router.navigateTo({route:{path:'/pages/classify/classify?id='+$event.currentTarget.dataset.id+'&name='+$event.currentTarget.dataset.name}})">
					<image :src="item.iconUrl" mode=""></image>
					<view>{{item.name}}</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="fabubtn" @click=" Router.navigateTo({route:{path:'/pages/designer_login/designer_login?type=worker'}})">
			<view class="icon">
				<image src="../../static/images/home-interactive-icon1.png" mode=""></image>
			</view>
			<view class="tit">注册工人</view>
		</view>

		<view class="infor-title flexRowBetween" v-if="workerOneData.length>0">
			<view class="xian"></view>
			<view class="tt">优秀建筑工</view>
		</view>
		<view class="designIndex pdlr4" v-if="workerOneData.length>0">
			<view class="items flexRowBetween" v-for="(item,index) in workerOneData" :key="index" :data-user_no="item.user_no"
			@click="Router.navigateTo({route:{path:'/pages/indexWorker_index/indexWorker_index?user_no='+$event.currentTarget.dataset.user_no}})">
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
					<view class="text2">{{item.introduce}}</view>
					<view class="flexRowBetween saleB">
						
						<view class="color3 font12">成交量：{{item.volume}}</view>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="infor-title flexRowBetween" v-if="workerTwoData.length>0">
			<view class="xian"></view>
			<view class="tt">优秀装修工</view>
		</view>
		<view class="designIndex pdlr4" v-if="workerTwoData.length>0">
			<view class="items flexRowBetween" v-for="(item,index) in workerTwoData" :key="index" :data-user_no="item.user_no"
			@click="Router.navigateTo({route:{path:'/pages/indexWorker_index/indexWorker_index?user_no='+$event.currentTarget.dataset.user_no}})">
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
					<view class="text2">{{item.introduce}}</view>
					<view class="flexRowBetween saleB">
						
						<view class="color3 font12">成交量：{{item.volume}}</view>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="infor-title flexRowBetween" v-if="workerThreeData.length>0">
			<view class="xian"></view>
			<view class="tt">优秀安装工</view>
		</view>
		<view class="designIndex pdlr4" v-if="workerThreeData.length>0">
			<view class="items flexRowBetween" v-for="(item,index) in workerThreeData" :key="index" :data-user_no="item.user_no"
			@click="Router.navigateTo({route:{path:'/pages/indexWorker_index/indexWorker_index?user_no='+$event.currentTarget.dataset.user_no}})">
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
					<view class="text2 avoidOverflow2" >{{item.introduce}}</view>
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
				classLis:[
					{iconUrl:"../../static/images/home-icon3.png",name:"建筑工",id:4},
					{iconUrl:"../../static/images/home-icon4.png",name:"装修工",id:5},
					{iconUrl:"../../static/images/home-icon5.png",name:"维修工",id:6},
					{iconUrl:"../../static/images/home-icon8.png",name:"安装工",id:10},
					{iconUrl:"../../static/images/home-icon6.png",name:"园林工",id:8},
					{iconUrl:"../../static/images/home-icon7.png",name:"市政工",id:9},
					{iconUrl:"../../static/images/home-icon9.png",name:"其他",id:11}
				],
				produtList: [
					{},{},{}
				],
				workerOneData:[],
				workerTwoData:[],
				workerThreeData:[],
				stars: [0, 1, 2, 3, 4],
				normalSrc: '../../static/images/home-supervision-icon3.png',
				selectedSrc: '../../static/images/home-supervision-icon1.png',
				halfSrc: '../../static/images/home-supervision-icon2.png',
			}
		},
		
		onLoad() {
			const self = this;
			self.getBefore =  {
				user: {
					tableName: 'User',
					searchItem: {
						identity: ['in', [1]],
					},
					middleKey: 'user_no',
					key: 'user_no',
					condition: 'in',
				},
			};
			self.$Utils.loadAll(['getWorkerOneData','getWorkerTwoData','getWorkerThreeData'], self);
		},
		methods: {
			
			getWorkerOneData() {
				const self = this;
				const postData = {};
				postData.paginate = {
					count: 0,
					currentPage: 1,
					is_page: true,
					pagesize: 3
				};
				postData.getBefore = self.getBefore;
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id:2,
					type:4,
					user_type:1
				};
				postData.order = {
					volume:'desc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.workerOneData.push.apply(self.workerOneData, res.info.data);
					}
					console.log('self.workOneData',self.workerOneData)
					self.$Utils.finishFunc('getWorkerOneData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			getWorkerTwoData() {
				const self = this;
				const postData = {};
				postData.paginate = {
					count: 0,
					currentPage: 1,
					is_page: true,
					pagesize: 3
				};
				postData.getBefore = self.getBefore;
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id:2,
					type:5,
					user_type:1
				};
				postData.order = {
					volume:'desc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.workerTwoData.push.apply(self.workerTwoData, res.info.data);
					}
					console.log('self.workTwoData',self.workerTwoData)
					self.$Utils.finishFunc('getWorkerTwoData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			getWorkerThreeData() {
				const self = this;
				const postData = {};
				postData.paginate = {
					count: 0,
					currentPage: 1,
					is_page: true,
					pagesize: 3
				};
				postData.getBefore = self.getBefore;
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id:2,
					type:10,
					user_type:1
				};
				postData.order = {
					volume:'desc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.workerThreeData.push.apply(self.workerThreeData, res.info.data);
					}
					self.$Utils.finishFunc('getWorkerThreeData');
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
		padding-bottom: 110rpx;
	}
</style>
