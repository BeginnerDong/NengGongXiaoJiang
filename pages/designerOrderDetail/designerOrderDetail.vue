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
						:src="mainData.userInfo&&mainData.userInfo[0]&&mainData.userInfo[0].mainImg&&mainData.userInfo[0].mainImg[0]?mainData.userInfo[0].mainImg[0].url:''"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow">{{mainData.products&&mainData.products[0]&&mainData.products[0].snap_product?mainData.products[0].snap_product.title:''}}</view>
						<view class="text avoidOverflow2">{{mainData.userInfo&&mainData.userInfo[0]?mainData.userInfo[0].introduce:''}}</view>
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
		
		<view class="infor-title flexRowBetween" style="padding-bottom: 50rpx;">
			<view class="xian"></view>
			<view class="tt">订单状态</view>
		</view>
		
		<!-- 无数据时显示 -->
		<view class="noDataBox" v-if="mainData.comfirm==0">
			<image src="../../static/images/img.png" mode=""></image>
			<view class="submitbtn" style="margin-top: 80rpx;" v-if="type==1">
				<button type="button"  
				@click=" Router.navigateTo({route:{path:'/pages/myToolingOrderDetail_startReceipt/myToolingOrderDetail_startReceipt?id='+mainData.id}})">接单</button>
			</view>
		</view>
		
		<!-- 无数据时显示 end -->
		
		<view class="tooling_detail mglr4" v-if="mainData.comfirm>0">
			<view class="infor" v-if="mainData.comfirm>=1">
				<image class="dian" src="../../static/images/about-order-details-icon2.png" mode=""></image>
				<view class="data color2">{{processData&&processData[0]?processData[0].create_time:''}}</view>
				<view class="title">{{processData&&processData[0]?processData[0].title:''}}</view>
				<view class="list">
					<view class="lname">工程内容：</view>
					<view class="rCont">
						<view class="yy flexRowBetween" v-for="(item,index) in skillOneData">
							<view class="xx flex">
								<view>{{item.title}}</view>
								<view class="price priceM">{{item.price}}</view>
								<view>{{item.count}}{{item.snap_product&&item.snap_product.label&&item.snap_product.label[item.snap_product.category_id]?item.snap_product.label[item.snap_product.category_id].description:''}}</view>
							</view>
							<view class="deltBtn" v-if="mainData.comfirm==1&&type==0" 
							@click="item.status==1?deleteItem(item.id):''">{{item.status==1?'删除':'已删除'}}</view>
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
							<view class="deltBtn" v-if="mainData.comfirm==1&&type==0"
							 @click="item.status==1?deleteItem(item.id):''">{{item.status==1?'删除':'已删除'}}</view>
						</view>

					</view>
				</view>
			</view>
			<view class="infor"  v-if="mainData.comfirm>=2">
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
			<view class="allMoney" v-if="type==0&&mainData.comfirm==1">
				总价：<text class="price">{{mainData.price}}</text><view class="btn" @click="orderUpdate">确认</view>
			</view>
			<view class="" v-if="mainData.comfirm==2&&type==0">
				<view class="okBtn" 
				@click="Router.navigateTo({route:{path:'/pages/myToolingOrder_contract/myToolingOrder_contract?id='+mainData.id+'&type='+type}})">确认合同</view>
			</view>
			<view class="" v-if="mainData.comfirm==3&&type==1">
				<view class="okBtn" 
				@click="Router.navigateTo({route:{path:'/pages/myToolingOrder_contract/myToolingOrder_contract?id='+mainData.id+'&type='+type}})">确认合同</view>
			</view>
			<view v-if="mainData.transport_status ==1">
				<view class="WorkbenchBtn" @click=" Router.navigateTo({route:{path:'/pages/myWorkbench/myWorkbench?id='+mainData.id+'&type='+type}})">工作台</view>
			</view>
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
			
			orderUpdate() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					order_no: self.mainData.order_no,
					user_type: 0
				};
				postData.data = {
					comfirm: 2
				};
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
				}else{
					postData.tokenFuncName = 'getProjectToken';
				}	
				postData.saveAfter = [
					{
						tableName: 'Process',
						FuncName: 'add',
						data: {
							type: 1,
							order_no: self.mainData.order_no,
							title:'用户已确认'
						}
					}
				];	
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.$Utils.showToast(res.msg, 'none');
						self.orderItemOneData=[],
						self.orderItemTwoData=[],
						self.skillOneData=[],
						self.skillTwoData=[],
						self.materialOneData=[],
						self.materialTwoData=[],
						self.processData=[]
						self.getMainData()
					} else {
						self.$Utils.showToast(res.msg, 'none');
					}
				};
				self.$apis.orderUpdate(postData, callback);
			},
			
			deleteItem(id) {
				const self = this;
				const postData = {};	
				postData.searchItem = {
					id:id
				};
				postData.data ={
					status:-1
				};
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
				}else{
					postData.tokenFuncName = 'getProjectToken';
				}	
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.orderItemOneData=[],
						self.orderItemTwoData=[],
						self.skillOneData=[],
						self.skillTwoData=[],
						self.materialOneData=[],
						self.materialTwoData=[],
						self.processData=[]
						self.getMainData()
					} else {
						self.$Utils.showToast(res.msg,'none');
					};					
					console.log(self.mainData)					
				};
				self.$apis.orderItemUpdate(postData, callback);
			},
			
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
					order_no:self.mainData.order_no
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
					userInfo:{
						tableName:'UserInfo',
						middleKey:'shop_no',
						key:'user_no',
						condition:'=',
						searchItem:{
							status:1
						}
					},
					/* process:{
						tableName:'Process',
						middleKey:'order_no',
						key:'order_no',
						condition:'=',
						searchItem:{
							status:1,
							user_no:['in',[0,1]]
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
	.WorkbenchBtn{width: 90%; margin: 20rpx auto; height:70rpx; line-height: 70rpx;text-align: center; background: #FFCB1E;border-radius: 10rpx;}
</style>
