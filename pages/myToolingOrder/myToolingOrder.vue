<template>
	<view>
		<view class="tooling_indNav">
			<view class="list">
				<view class="item" :class="currentType==1?'on':''" @click="changeone('1')">工人订单</view>
				<view class="item" :class="currentType==2?'on':''" @click="changeone('2')">设计订单</view>
				<view class="item" :class="currentType==3?'on':''" @click="changeone('3')">定制订单</view>
			</view>
		</view>
		<view class="orderNav">
			<view class="tt" :class="currentStatus==1?'on':''" @click="change('1')">全部</view>
			<view class="tt" :class="currentStatus==2?'on':''" @click="change('2')">待确认</view>
			<view class="tt" :class="currentStatus==3?'on':''" @click="change('3')">进行中</view>
			<view class="tt" :class="currentStatus==4?'on':''" @click="change('4')">已完成</view>
		</view>
		<view class="prolisbox pdlr4">
			<view class="prolis boxShaow" v-for="(item,index) in mainData" v-if="currentType==1||currentType==2">
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
					<view class="btn" v-if="item.type==2&&item.transport_status==2&&item.products[0].isremark==0"  :data-id="item.id" @click=" Router.navigateTo({route:{path:'/pages/myToolingOrderComment/myToolingOrderComment?id='+$event.currentTarget.dataset.id}})">去评价</view>
					<view class="btn"  :data-id="item.id"
					@click="Router.navigateTo({route:{path:'/pages/designerOrderDetail/designerOrderDetail?id='+$event.currentTarget.dataset.id+'&type=0'}})">查看详情</view>
				</view>
			</view>
			
			
			
			<view class="prolis prolis3 boxShaow" v-for="(item,index) in mainData"  v-if="currentType==3">
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
						<image :src="item.products&&item.products[0]&&item.products[0].snap_product&&item.products[0].snap_product.mainImg&&item.products[0].snap_product.mainImg[0]?item.products[0].snap_product.mainImg[0].url:''"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow">{{item.products&&item.products[0]?item.products[0].snap_product.title:''}}</view>
						<view class="tex font12 color2 avoidOverflow">
							类型：{{item.products&&item.products[0]&&item.products[0].snap_product&&item.products[0].snap_product.label&&item.products[0].snap_product.label[item.products[0].snap_product.category_id]?item.products[0].snap_product.label[item.products[0].snap_product.category_id].title:''}}
						</view>
						<view class="tex font12 color2 avoidOverflow">风格：{{item.products&&item.products[0]?item.products[0].snap_product.description:''}}</view>
					</view>
				</view>
				<view class="bBtn">
					<view class="btn" :data-id="item.id"  @click="Router.navigateTo({route:{path:'/pages/myTooling_madeDetail/myTooling_madeDetail?id='+$event.currentTarget.dataset.id}})">查看详情</view>
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
					type:1
				},
				currentStatus:1,
				currentType:1
			}
		},
		
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			//self.$Utils.loadAll(['getMainData'], self)
			
		},
		
		onShow() {
			const self = this;
			self.mainData = [];
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
			change(currentStatus) {
				const self = this;
				if(currentStatus!=self.currentStatus){
					self.currentStatus = currentStatus
					if(self.currentStatus==1){
						delete self.searchItem.transport_status 
					}else{
						self.searchItem.transport_status=self.currentStatus-2
					}
					self.getMainData(true)
				}
			},
			
			changeone(currentType){
				const self=this;
				if(currentType!=self.currentType){
					delete self.searchItem.transport_status;
					self.currentStatus = 1;
					self.currentType = currentType;
					self.searchItem.type=self.currentType;
					self.getMainData(true);
				};
				
			},

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
				postData.tokenFuncName = 'getProjectToken';
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
	@import "../../assets/style/tooling_indNav.css";
	@import "../../assets/style/user.css";
	
	page{padding-bottom: 80rpx;}

	.prolis3 .cont{padding: 20rpx 0;box-sizing: border-box;}
	.prolis3 .tex{margin-top: 20rpx;}
</style>
