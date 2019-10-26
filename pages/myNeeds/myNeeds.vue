<template>
	<view>
		<view class="myNeed_ind pdlr4">
			<view class="item boxShaow flexRowBetween" v-for="item in mainData"
			@click=" Router.navigateTo({route:{path:'/pages/myNeedsDetail/myNeedsDetail?id='+item.id}})">
				<view class="cont">
					<view class="lis flex">
						<image class="icon" src="../../static/images/home-housing-icon1.png" mode=""></image>
						<view class="name">所在城市</view>
						<view class="tex">{{item.passage1}}</view>
					</view>
					<view class="lis flex">
						<image class="icon" src="../../static/images/home-housing-icon1.png" mode=""></image>
						<view class="name">房屋面积</view>
						<view class="tex">{{item.keywords}}㎡</view>
					</view>
				</view>
				<view class="arrow"><image src="../../static/images/arrow-icon1.png" mode=""></image></view>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				Router: this.$Router,



				mainData:[],
				is_show: false,
				num: 1,
				zizhiData: [{}, {}]
			}
		},

		onLoad() {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getMainData'], self);
		},
		
		onShow() {
			const self = this;
			
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
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = {
					thirdapp_id: 2,
					type:2,
					user_no:uni.getStorageSync('user_info').user_no
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
		}
	}
</script>

<style>
	
	@import "../../assets/style/myNeed_ind.css";
	
	page{background: #f5f5f5; padding-bottom: 80rpx;}

	
</style>
