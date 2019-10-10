<template>
	<view>
		<view class="prolisbox">
			<view class="prolis" style="margin-top: 0;">
				
				<view class="datt">
					<view class="left">
						<view class="color2" style="margin-bottom: 10rpx;">订单编号：{{mainData.order_no}}</view>
						<view class="color3">交易时间：{{mainData.create_time}}</view>
					</view>
					<view class="state" v-if="mainData.transport_status==0">待确认</view>
					<view class="state" v-if="mainData.transport_status==1">进行中</view>
					<view class="state" v-if="mainData.transport_status==2">已完成</view>
				</view>
				<view class="twoCt">
					<view class="leftbox">
						<image 
						:src="mainData.shopInfo&&mainData.shopInfo[0]&&mainData.shopInfo[0].mainImg&&mainData.shopInfo[0].mainImg[0]?mainData.shopInfo[0].mainImg[0].url:''"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow">{{mainData.products&&mainData.products[0]&&mainData.products[0].snap_product?mainData.products[0].snap_product.title:''}}</view>
						<view class="text avoidOverflow2">{{mainData.shopInfo&&mainData.shopInfo[0]?mainData.shopInfo[0].introduce:''}}</view>
						<view class="price priceM">{{mainData.price}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="f5H5"></view>
		
		<view class="fabubtn" style="top: 460rpx;right:20rpx">
			<view class="icon">
				<image src="../../static/images/about-order-details-icon1.png" mode=""></image>
			</view>
			<view class="tit">联系客服</view>
		</view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">客户信息</view>
		</view>
		<view class="caseSbmit">
			<view class="eidt-line flexRowBetween">
				<view class="ll">姓名：</view>
				<view class="rr">{{mainData.name}}</view>
			</view>
			<view class="eidt-line">
				<view class="ll">电话：</view>
				<view class="rr">{{mainData.phone}}</view>
			</view>
		</view>
		
		<view class="f5H5"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">工人信息</view>
		</view>
		<view class="caseSbmit">
			<view class="eidt-line flexRowBetween">
				<view class="ll">姓名：</view>
				<view class="rr">{{mainData.shopInfo&&mainData.shopInfo[0]?mainData.shopInfo[0].name:''}}</view>
			</view>
			<view class="eidt-line">
				<view class="ll">电话：</view>
				<view class="rr">{{mainData.shopInfo&&mainData.shopInfo[0]?mainData.shopInfo[0].phone:''}}</view>
			</view>
		</view>
		
		<view class="f5H5"></view>
		<view class="infor-title flexRowBetween" style="padding-bottom: 50rpx;">
			<view class="xian"></view>
			<view class="tt">订单状态</view>
		</view>
		
		
		<view class="tooling_detail mglr4">
			<view class="infor" v-if="mainData.comfirm==1">
				<image class="dian" src="../../static/images/about-order-details-icon2.png" mode=""></image>
				<view class="data color2">{{processData&&processData[0]?processData[0].create_time:''}}</view>
				<view class="title">{{processData&&processData[0]?processData[0].title:''}}</view>
				<view class="list">
					<view class="lname">工程：</view>
					<view class="rCont">
						<view class="yy flexRowBetween" v-for="(item,index) in skillOneData">
							<view class="xx flex">
								<view>{{item.title}}</view>
								<view class="price priceM">{{item.price}}</view>
								<view>{{item.count}}{{item.snap_product&&item.snap_product.label&&item.snap_product.label[item.snap_product.category_id]?item.snap_product.label[item.snap_product.category_id].description:''}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="list">
					<view class="lname">辅料：</view>
					<view class="rCont">
						<view class="yy flexRowBetween" v-for="(item,index) in materialOneData">
							<view class="xx flex">
								<view>{{item.title}}</view>
								<view class="price priceM">{{item.price}}</view>
								<view>{{item.count}}{{item.snap_product&&item.snap_product.label&&item.snap_product.label[item.snap_product.category_id]?item.snap_product.label[item.snap_product.category_id].description:''}}</view>
							</view>
						</view>
						
					</view>
				</view>
			</view>
			<view class="infor" v-if="mainData.comfirm==2">
				<image class="dian" src="../../static/images/about-order-details-icon2.png" mode=""></image>
				<view class="data color2">{{processData&&processData[1]?processData[1].create_time:''}}</view>
				<view class="title">{{processData&&processData[1]?processData[1].title:''}}</view>
				<view class="list">
					<view class="lname">工程内容：</view>
					<view class="rCont">
						<view class="yy flexRowBetween" v-for="(item,index) in skillTwoData">
							<view class="xx flex">
								<view>{{item.title}}</view>
								<view class="price priceM">{{item.price}}</view>
								<view>{{item.count}}{{item.snap_product&&item.snap_product.label&&item.snap_product.label[item.snap_product.category_id]?item.snap_product.label[item.snap_product.category_id].description:''}}</view>
							</view>
							
						</view>
					</view>
				</view>
				<view class="list">
					<view class="lname">辅料：</view>
					<view class="rCont">
						<view class="yy flexRowBetween" v-for="(item,index) in materialTwoData">
							<view class="xx flex">
								<view>{{item.title}}</view>
								<view class="price priceM">{{item.price}}</view>
								<view>{{item.count}}{{item.snap_product&&item.snap_product.label&&item.snap_product.label[item.snap_product.category_id]?item.snap_product.label[item.snap_product.category_id].description:''}}</view>
							</view>
							
						</view>
					</view>
				</view>
			</view>
			<view class="infor" v-for="(item,index) in processData" v-if="index>1">
				<image class="dian" src="../../static/images/about-order-details-icon2.png" mode=""></image>
				<view class="data color2">{{item.create_time}}</view>
				<view class="title">{{item.title}}</view>
			</view>
			
		</view>
		
		<view class="threeBtn flexRowBetween">
			<view class="itm" v-if="mainData.comfirm==1" 
			@click="Router.navigateTo({route:{path:'/pages/supervisorOrderDetail_unit/supervisorOrderDetail_unit?id='+id}})">面积及辅料</view>
			<view class="itm" @click="Router.navigateTo({route:{path:'/pages/myWorkbench_daka/myWorkbench_daka?id='+id+'&type=0'}})">打卡</view>
			<view class="itm" @click="Router.navigateTo({route:{path:'/pages/myWorkbench_database/myWorkbench_database?id='+id+'&type=1'}})">资料库</view>
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				mainData:{},
				type:"",
				orderItemOneData:[],
				orderItemTwoData:[],
				skillOneData:[],
				skillTwoData:[],
				materialOneData:[],
				materialTwoData:[],
				processData:[]
			}
		},
		
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.type=options.type;
			console.log('options',options)
			
		},
		
		onShow() {
			const self = this;
			self.orderItemOneData=[];
			self.orderItemTwoData=[];
			self.skillOneData=[];
			self.skillTwoData=[];
			self.materialOneData=[];
			self.materialTwoData=[];
			self.processData=[];
			self.$Utils.loadAll(['getMainData'], self)		
		},

		methods: {
			
			
			
			
			
			orderItemOne() {
				const self = this;
				const postData = {};	
				postData.searchItem = {
					order_no:self.mainData.order_no,
					user_type:0,
					status:['in',[1,-1]]
				};
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
				}else{
					postData.tokenFuncName = 'getProjectToken';
				}	
				postData.order = {
					id:'asc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.orderItemOneData.push.apply(self.orderItemOneData,res.info.data);
						for (var i = 0; i < self.orderItemOneData.length; i++) {
							if(self.orderItemOneData[i].behavior==1){
								self.skillOneData.push(self.orderItemOneData[i])
							}else if(self.orderItemOneData[i].behavior==2){
								self.materialOneData.push(self.orderItemOneData[i])
							}
						}
						console.log('skillOneData',self.skillOneData)
						console.log('materialOneData',self.materialOneData)
					} else {
						self.$Utils.showToast(res.msg,'none');
					};					
					console.log(self.mainData)					
				};
				self.$apis.orderItemGet(postData, callback);
			},
			
			orderItemTwo() {
				const self = this;
				const postData = {};	
				postData.searchItem = {
					order_no:self.mainData.order_no,
					user_type:0,
				};
				postData.order = {
					id:'asc'
				};
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
				}else{
					postData.tokenFuncName = 'getProjectToken';
				}	
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.orderItemTwoData.push.apply(self.orderItemTwoData,res.info.data);
						for (var i = 0; i < self.orderItemTwoData.length; i++) {
							if(self.orderItemTwoData[i].behavior==1){
								self.skillTwoData.push(self.orderItemTwoData[i])
							}else if(self.orderItemTwoData[i].behavior==2){
								self.materialTwoData.push(self.orderItemTwoData[i])
							}
						}
						console.log('skillTwoData',self.skillOneData)
						console.log('materialTwoData',self.materialOneData)
					} else {
						self.$Utils.showToast(res.msg,'none');
					};					
									
				};
				self.$apis.orderItemGet(postData, callback);
			},
			
			processGet() {
				const self = this;
				const postData = {};	
				postData.searchItem = {
					user_no:['in',[self.mainData.user_no,self.mainData.shop_no]],
					order_no:self.mainData.order_no,
					type:['not in',[7]]
				};
				postData.order = {
					create_time:'asc'
				};
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
				}else{
					postData.tokenFuncName = 'getProjectToken';
				}	
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.processData = res.info.data
					} else {
						self.$Utils.showToast(res.msg,'none');
					};					
					console.log(self.processData)					
				};
				self.$apis.processGet(postData, callback);
			},
			

			getMainData() {
				const self = this;
				const postData = {};
				
				postData.searchItem = {
					id:self.id,
					user_type:0
				};
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
				}else{
					postData.tokenFuncName = 'getProjectToken';
				}	
				postData.getAfter = {
					shopInfo:{
						tableName:'UserInfo',
						middleKey:'shop_no',
						key:'user_no',
						condition:'=',
						searchItem:{
							status:1
						}
					},
					/* userInfo:{
						tableName:'UserInfo',
						middleKey:'user_no',
						key:'user_no',
						condition:'=',
						searchItem:{
							status:1,	
						}
					} */
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData=res.info.data[0];
						self.orderItemOne();
						self.orderItemTwo();
						self.processGet();
					} else {
						self.$Utils.showToast(res.msg,'none');
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
	.tooling_detail{padding-bottom: 60rpx;}
	
	.caseSbmit .eidt-line{justify-content: flex-start;}
	.caseSbmit .eidt-line .ll{width: 120rpx;}
	.caseSbmit .eidt-line:last-child{border-bottom: 0rpx;}
	.threeBtn{ padding: 60rpx 4%;}
	.threeBtn .itm{width: 31%; line-height: 70rpx;text-align: center;background: #FFCB1E; border-radius: 10rpx;font-size: 26rpx;}
</style>
