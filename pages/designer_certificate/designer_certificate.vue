<template>
	<view>
		<view class="fabubtn" @click=" Router.navigateTo({route:{path:'/pages/designer_certificateDetail/designer_certificateDetail'}})">
			<view class="icon">
				<image src="../../static/images/certificate-icon1.png" mode=""></image>
			</view>
			<view class="tit" >添加证书</view>
		</view>
		<view class="myNeed_ind pdlr4">
			<view class="zizhiline boxShaow" v-for="(item,index) in mainData" :key="index" >
				<view class="item_delt pdlr4">
					<view class="deltBtn" @click="deleteOne(index)">
						<image class="deltIcon" src="../../static/images/certificate-icon2.png" mode=""></image>删除
					</view>
				</view>
				<view class="item flexRowBetween" 
				@click=" Router.navigateTo({route:{path:'/pages/designer_certificateDetail/designer_certificateDetail?id='+item.id}})">
					<view class="cont">
						<view class="lis flex">
							<image class="icon" src="../../static/images/certificate-icon3.png" mode=""></image>
							<view class="name">证书名称</view>
							<view class="tex">{{item.title}}</view>
						</view>
						<view class="lis flex">
							<image class="icon" src="../../static/images/certificate-icon4.png" mode=""></image>
							<view class="name">获奖时间</view>
							<view class="tex">{{item.keywords}}</view>
						</view>
					</view>
					<view class="arrow"><image src="../../static/images/arrow-icon1.png" mode=""></image></view>
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
			}
		},

		onLoad() {
			const self = this;
			
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			//self.$Utils.loadAll(['getMainData'], self);
		},

		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},

		onShow() {
			const self = this;
			self.mainData = [];
			self.$Utils.loadAll(['getMainData'], self);
		},

		methods: {
			
			deleteOne(index) {
				const self = this;
				const postData = {};
				postData.searchItem = {};
				postData.searchItem.id = self.mainData[index].id;
				postData.tokenFuncName = 'getThreeToken';
				postData.data = {
					status:-1
				};
				const callback = (res) => {
					if (res.solely_code==100000) {
						self.$Utils.showToast('删除成功', 'none');
						setTimeout(function() {
							self.getMainData(true);
						}, 500);
						
					}else{
						self.$Utils.showToast(res.msg, 'none');
					}
				};
				self.$apis.messageUpdate(postData, callback)
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
				postData.tokenFuncName = 'getThreeToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = {
					thirdapp_id: 2,
					type:6,
					user_no:uni.getStorageSync('threeInfo').user_no
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
	@import "../../assets/style/myNeed_ind.css";
	
	page{background: #f5f5f5; padding-bottom: 80rpx;}
	.item_delt{ display: flex;justify-content: flex-end; color: #999;}
	.deltIcon{ width: 30rpx; height: 30rpx;margin-right: 10rpx;}
	.myNeed_ind .item{margin-top: 20rpx; padding-top: 0rpx;}
	.zizhiline{background: #fff; margin-top: 30rpx;padding-top: 30rpx;border-radius: 10rpx; overflow: hidden;}
	.item_delt,.deltBtn{display: flex;justify-content: flex-end; align-items: center; font-size: 26rpx;}
	.deltIcon{ width:22rpx ; height: 27rpx; display: block;}
	
</style>
