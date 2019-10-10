<template>
	<view>
		<view class="designIndex pdlr4">
			<view class="items flexRowBetween boxShaow" v-for="(item,index) in mainData" :key="index" 
			 @click=" Router.navigateTo({route:{path:'/pages/indexWorkerDetail/indexWorkerDetail?id='+item.id}})">
				<view class="pic">
					<image :src="item.UserInfo.mainImg[0].url" alt="" />
				</view>
				<view class="infor">
					<view class="title flex">
						<view>{{item.UserInfo.name}}</view>
					</view>
					<view class="text2 avoidOverflow">{{item.UserInfo.introduce}}</view>
					<view class="flex saleB">
						<view class="priceM font14">{{item.price}}/{{item.label[item.category_id].description}}</view>
						<view class="color3 font12">成交量：{{item.sale_count}}</view>
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
				
				
				Router:this.$Router,
				mainData:[]
			}
		},
		
		onLoad(options) {
			const self = this;
			self.parent_id = options.parent_id;
			self.title = options.title;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			
			self.$Utils.loadAll(['getMainData'], self);
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
					title:self.title,
					
					parentid:self.parent_id
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
				self.$apis.search(postData, callback);
			},
		},
	};
</script>

<style>
	@import "../../assets/style/index.css";

	page {
		padding-bottom: 30rpx;
	}
	.designIndex .items{ margin-top: 30rpx;border-radius: 10rpx;padding: 30rpx;box-sizing: border-box;}
	.designIndex .items .pic{width: 160rpx; height: 160rpx;}
	.designIndex .items .infor{height: 160rpx; width: 70%;}
	.designIndex .items .infor .text2{margin-top: 20rpx;}
	.priceM{margin-right: 40rpx;}
</style>
