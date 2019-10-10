<template>
	<view>
		<view class="pdlr4 myEvaluate" >
			<view class="designXq_pjLis">
				<view class="infor" v-for="item in mainData">
					<view class="item">
						<view class="photo"><image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0]:''" mode=""></image></view>
						<view class="cont">
							<view class="name color2 font14">{{item.title}}</view>
							<view class="time font12 color3">{{item.create_time}}</view>
							<view class="text">{{item.content}}</view>
						</view>
					</view>
					<view class="prolisbox">
						<view class="prolis">
							<view class="datt">
								<view class="left">交易时间：{{item.order&&item.order[0]?item.order[0].createt_time:''}}</view>
								<view class="state">已经完成</view>
							</view>
							<view class="twoCt">
								<view class="leftbox">
									<image 
									:src="item.userInfo&&item.userInfo[0]&&item.userInfo[0].mainImg&&item.userInfo[0].mainImg[0]?item.userInfo[0].mainImg[0].url:''"></image>
								</view>
								<view class="cont">
									<view class="title avoidOverflow2">{{item.order&&item.order[0]&&item.order[0].products&&item.order[0].products[0]&&item.order[0].products[0].snap_product?item.order[0].products[0].snap_product.title:''}}</view>
									<view class="price">{{item.order&&item.order[0]?item.order[0].price:''}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
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
					type:1,
					user_no:uni.getStorageSync('user_info').user_no
				};	
				postData.getAfter = {
					
					order:{
						tableName:'Order',
						middleKey:'order_no',
						key:'order_no',
						searchItem:{
							status:1,
							
						},
						condition:'='
					},
					userInfo:{
						tableName:'UserInfo',
						middleKey:['order',0,'shop_no'],
						key:'user_no',
						searchItem:{
							status:1,		
						},
						condition:'='
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
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	@import "../../assets/style/index.css";
	page{padding-bottom: 80rpx;background: #F5F5F5;}
	.designXq_pjLis .infor{background: #fff;padding: 0rpx 20rpx 30rpx 20rpx; margin-top: 30rpx;border-radius: 10rpx;}
	.designXq_pjLis .item{border-bottom: none;}
	.designXq_pjLis .cont{width: 85%;}
	
</style>
