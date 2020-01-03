<template>
	<view>
		<view class="topSeachBox">
			<view class="cont flexRowBetween">
				<image class="icon" src="../../static/images/home-icon2.png" mode=""></image>
				<view class="input"><input type="text" value="" placeholder="搜索订单" placeholder-style="color:#999;font-size:24rpx" /></view>
				<view class="btn">搜索</view>
			</view>
		</view>
		
		<view class="prolisbox pdlr4">
			<view class="prolis boxShaow" v-for="(item,index) in mainData">
				<view class="datt">
					<view class="left">
						<view class="color2" style="margin-bottom: 10rpx;">订单编号：{{item.order_no}}</view>
						<view class="color3">交易时间：{{item.create_time}}</view>
					</view>
					<view class="state" v-if="item.transport_status==0">待确认</view>
					<view class="state" v-if="item.transport_status==1">进行中</view>
					<view class="state" v-if="item.transport_status==2">已完成</view>
				</view>
				<view class="twoCt">
					<view class="leftbox">
						<image 
						:src="item.userInfo&&item.userInfo[0]&&item.userInfo[0].mainImg&&item.userInfo[0].mainImg[0]?item.userInfo[0].mainImg[0].url:''"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow">{{item.products&&item.products[0]&&item.products[0].snap_product?item.products[0].snap_product.title:''}}</view>
						<view class="text avoidOverflow2">{{item.userInfo&&item.userInfo[0]?item.userInfo[0].introduce:''}}</view>
						<view class="price priceM">{{item.parentOrder&&item.parentOrder[0]?item.parentOrder[0].price:''}}</view>
					</view>
				</view>
				<view class="bBtn">
					<view class="btn"  :data-id="item.id"
					
					@click=" Router.navigateTo({route:{path:'/pages/designerOrderDetail/designerOrderDetail?id='+$event.currentTarget.dataset.id+'&type=1'}})">查看详情</view>
					<view class="btn yellow"  v-if="item.comfirm==0" :data-id="item.id"
					 @click=" Router.navigateTo({route:{path:'/pages/designerOrderDetail/designerOrderDetail?id='+$event.currentTarget.dataset.id+'&type=1'}})">确认接单</view>
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
				mainData:[],
				searchItem:{
					type:'',
					user_type:0,
					
				},
				
			}
		},
		
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.searchItem.type=uni.getStorageSync('threeInfo').identity;
			self.$Utils.loadAll(['getMainData'], self)
			
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
				if(isNew){
					self.mainData = [];
					self.paginate={
						count: 0,
						currentPage:1,
						pagesize:5,
						is_page:true,
					};
				};
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.searchItem.shop_no = uni.getStorageSync('threeInfo').user_no;
				postData.tokenFuncName = 'getThreeToken';
				postData.getAfter = {
					userInfo:{
						tableName:'UserInfo',
						middleKey:'shop_no',
						key:'user_no',
						condition:'=',
						searchItem:{
							status:1
						}
					},
					parentOrder:{
						tableName:'Order',
						middleKey:'parent_no',
						key:'order_no',
						condition:'=',
						searchItem:{
							status:1,
							user_type:0
						}
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					} else {
						self.$Utils.showToast('没有更多了','none');
					};
					console.log(self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	page{padding-bottom: 80rpx;}
	.topSeachBox{background: #f5f5f5; padding: 30rpx 4%;box-sizing: border-box;}
	.topSeachBox .cont{ border: 2rpx solid #e7e7e7;background: #fff;border-radius: 10rpx; box-sizing: border-box;position: relative;padding-left: 68rpx; height: 68rpx;overflow: hidden;}
	.topSeachBox .cont .icon{ position: absolute; top: 50%;left: 20rpx;transform: translateY(-50%); width: 30rpx; height: 30rpx; display: block; }
	.topSeachBox .cont .input{ width: 75%;padding-right: 2%;}
	.topSeachBox .cont .input input{ display: block; width: 100%; height: 60rpx; line-height: 60rpx; font-size: 28rpx;}
	.topSeachBox .cont .btn{width: 120rpx; position: absolute; top: 0;right: 0; bottom: 0;background: #FFCB1E;text-align: center;line-height: 62rpx;}
	.prolis3 .cont{padding: 20rpx 0;box-sizing: border-box;}
	.prolis3 .tex{margin-top: 20rpx;}
	.bBtn .btn.yellow{ border: 2rpx solid #FFCB1E;color: #FFCB1E;}
</style>
