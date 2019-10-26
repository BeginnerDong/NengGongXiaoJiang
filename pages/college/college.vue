<template>
	<view>
		<view style="background: #fff;padding-bottom: 30rpx;">
			<cNavList></cNavList>
			<c-swiper></c-swiper>
		</view>
		
		<view class="f5H10" style="margin-top: 20rpx;"></view>
		
		<view class="fabubtn" @click=" Router.navigateTo({route:{path:'/pages/addStudent/addStudent'}})">
			<view class="icon">
				<image src="../../static/images/home-interactive-icon1.png" mode=""></image>
			</view>
			<view class="tit">成为学员</view>
		</view>
		
		<view class="college_idexLis pdlr4 flexRowBetween">
			<view class="child"  v-for="(item,index) in mainData" :key="index"  
			@click=" Router.navigateTo({route:{path:'/pages/collegeDetail/collegeDetail?id='+item.id}})">
				<image class="pic" :src="item.mainImg[0].url" mode=""></image>
				<view class="tit avoidOverflow">{{item.title}}</view>
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
				<view class="text">需求</view>
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
				collegeDate:[
					{},{},{},{},{},{}
				],
				mainData:[]
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
				postData.searchItem = {
					thirdapp_id:2,
				};
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['学院']],
						},
						middleKey: 'menu_id',
						key: 'id',
						condition: 'in',
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					} else {
						self.$Utils.showToast('没有更多了', 'none');
					};
					console.log('self.mainData',self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
		},
	};
</script>

<style>
	@import "../../assets/style/navbar.css";
	page {
		padding-bottom: 140rpx;
	}
	
	/* 学员 */
	.college_idexLis{display: flex;flex-wrap: wrap; align-items: normal;padding-top: 30rpx;}
	.college_idexLis .child{width: 330rpx; height: 220rpx;border-radius: 10rpx;overflow: hidden; position: relative;overflow: hidden; margin-bottom: 30rpx;}
	.college_idexLis .child .pic{width: 100%; height: 100%;}
	.college_idexLis .child .tit{line-height: 60rpx;width: 100%;height: 60rpx;background: rgba(0,0,0,0.5); color: #fff;padding: 0 20rpx;box-sizing: border-box;font-size: 26rpx; position: absolute;left: 0;bottom: 0;}

</style>
