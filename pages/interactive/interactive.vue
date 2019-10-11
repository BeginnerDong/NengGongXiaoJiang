<template>
	<view>
		<view style="background: #fff;padding-bottom: 30rpx;">
			<cNavList></cNavList>
			<c-swiper></c-swiper>
		</view>

		<view class="f5H10" style="margin-top: 20rpx;"></view>

		<view class="fabubtn" @click=" Router.navigateTo({route:{path:'/pages/interactive_release/interactive_release'}})">
			<view class="icon">
				<image src="../../static/images/home-interactive-icon1.png" mode=""></image>
			</view>
			<view class="tit">发布</view>
		</view>

		<view class="interct_idexLis mglr4 boxShaow">
			<view class="child" v-for="item in mainData" 
			@click="Router.navigateTo({route:{path:'/pages/interactiveDetail/interactiveDetail?id='+item.id}})">
				<view class="flex">
					<view class="photo">
						<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0]:''" mode=""></image>
					</view>
					<view class="name">
						<view class="font13">{{item.title}}</view>
						<view class="time">{{item.create_time}}</view>
					</view>
				</view>
				<view class="text font13">{{item.content}}</view>
				<view class="imgbox">
					<view v-for="c_item in item.bannerImg" :class="item.bannerImg.length==1?'lisOne':(item.bannerImg.length==2?'lisTwo':'lisThree')">
						<image :src="c_item" mode=""></image>
					</view>
					<!--  -->
				</view>
				<view class="label">
					<view class="lis">
						<image src="../../static/images/home-interactive-icon3.png" mode=""></image>
						<view>{{item.view_count}}</view>
					</view>
					<view class="lis">
						<image src="../../static/images/home-interactive-icon2.png" mode=""></image>
						<view>{{item.reply.count}}</view>
					</view>
					<view class="lis">
						<image src="../../static/images/home-interactive-icon4.png" mode=""></image>
						<view>{{item.like.count}}</view>
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
				mainData: [],

				Router: this.$Router,

			}
		},

		onLoad() {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			
		},
		
		onShow() {
			const self = this;
			self.getMainData(true)
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
					thirdapp_id: 2,
					user_type:0,
					type:3,
					relation_id:0,
					relation_table:'message'
				};
				postData.getAfter = {
					like: {
						tableName: 'Log',
						searchItem: {
							status:1,
							type:1
						},
						middleKey: 'id',
						key: 'relation_id',
						condition: 'in',
						compute:{
						  
						  count:[
						    'count',
						    'count',
						    {
						      status:1,
						    }
						  ]
						},
					},
					reply: {
						tableName: 'Message',
						searchItem: {
							status:1,
							type:3
						},
						middleKey: 'id',
						key: 'relation_id',
						condition: 'in',
						compute:{
						  
						  count:[
						    'count',
						    'count',
						    {
						      status:1,
						    }
						  ]
						},
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					} else {
						self.$Utils.showToast('没有更多了', 'none');
					};
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.messageGet(postData, callback);
			},
		},
	};
</script>

<style>
	/* @import "../../assets/style/index.css"; */
	@import "../../assets/style/interct_idexLis.css";

	page {
		padding-bottom: 60rpx;
		background: #f5f5f5;
	}

	.ind-cont4 .item {
		width: 33.3%;
	}
</style>
