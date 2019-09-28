<template>
	<view>
		
		<cNavList></cNavList>
		<c-swiper></c-swiper>
		
		<view class="f5H10" style="margin-top: 20rpx;"></view>
		
		<view class="house_idexLis pdlr4">
			<view class="item boxShaow" v-for="(item,index) in mainData" :key="index" 
			@click=" Router.navigateTo({route:{path:'/pages/houseShowDetail/houseShowDetail?id='+item.id}})">
				<view class="img">
					<image :src="item.mainImg[0].url" alt=""></image>
				</view>
				<view class="infor">
					<view class="tit avoidOverflow2">{{item.title}}</view>
					<view class="adrs pr avoidOverflow">
						<image class="icon" src="../../static/images/home-housing-icon1.png" mode=""></image>
						{{item.address}}
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
				scrollTop: 100,
				currt:0,
				index: 0,
				houseDate:[
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
							title: ['=', ['房源展示']],
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
	@import "../../assets/style/index.css";

	page {
		padding-bottom: 60rpx;
	}
	.ind-cont4 .item{width: 33.3%;}
	

</style>
