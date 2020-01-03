<template>
	<view class="classifyBox">
		<view>
			<scroll-view class="navLisBox" scroll-x>
				<view class="nav-item" v-for="(item,index) in mainData" :class="item.id==idTwo?'active':''"
				@click="change(item.id,index)">
					{{item.title}}
				</view>
			</scroll-view>
		</view>
		<view class="classifyCont">
			<view class="class_leftNav">
				<view class="cont">
					<view class="child" v-for="item in mainData[indexTwo].child" :class="item.id==idThree?'on':''" 
					@click="changeTwo(item.id)">
						{{item.title}}
					</view>
				</view>
			</view>
			<view class="class_rightCont">
				<view class="class_sort">
					<view class="child"  @click="orderChange('price')">
						<view :style="order.price?'color:#FFCB1E':''">价格</view>
						<image 
						:src="order.price&&orderType=='asc'?'../../static/images/asc.png':'../../static/images/workers-icon2.png'" 
						mode=""></image>
					</view>
					<view class="child"  @click="orderChange('sale_count')">
						<view :style="order.sale_count?'color:#FFCB1E':''">销量</view>
						<image
						:src="order.sale_count&&orderType=='asc'?'../../static/images/asc.png':'../../static/images/workers-icon2.png'" 
						mode=""></image>
					</view>
					<view class="child" @click="orderChange('distance')">
						<view :style="order.distance?'color:#FFCB1E':''">距离</view>
						<image
						:src="order.distance&&orderType=='asc'?'../../static/images/asc.png':'../../static/images/workers-icon2.png'" 
						mode=""></image>
					</view>
				</view>
				<view class="class_infor">
					<view class="designIndex">					
						<view class="items flexRowBetween" v-for="(item,index) in productData" :key="index" :data-id="item.id"
						@click=" Router.navigateTo({route:{path:'/pages/indexDesignDetail/indexDesignDetail?id='+$event.currentTarget.dataset.id}})">
							<view class="pic">
								<image :src="item.userInfo[0].mainImg[0].url" alt="" />
							</view>
							<view class="infor">
								<view class="title flex">
									<view>{{item.userInfo[0].name}}</view>
								</view>
								<view class="text2 avoidOverflow2">{{item.userInfo[0].introduce}}</view>
								<view class="flexRowBetween saleB">
									<view class="priceM font14">{{item.price}}/{{item.label[item.category_id].description}}</view>
									<view class="color3 font12">成交量：{{item.sale_count}}</view>
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
				currIndex: 0,
				Router:this.$Router,
				num:1,
				curr:1,
				produtList: [
					{},{},{},{}
				],
				idTwo:'',
				idThree:'',
				indexTwo:0,
				indexThree:0,
				mainData:[],
				productData:[],
				order:{},
				orderType:'desc'
			}
		},
		
		onLoad(options) {
			const self = this;
			wx.setNavigationBarTitle({
				title: options.name,
			});
			if(options.name=='个人设计师'){
				self.bahavior = 1
			}else{
				self.bahavior = 2
			};
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			
			self.$Utils.loadAll(['getUserData','getMainData','getLocation'], self);
		},
		
		methods: {
			
			orderChange(item){
				const self = this;
				self.order = {};
				if(self.orderType=='desc'){
					self.orderType='asc'
				}else{
					self.orderType='desc'
				};
				self.order = {
					[item]:self.orderType
				};
				if(item=='distance'){
					self.order.longitude = self.lng;
					self.order.latitude = self.lat;
				};
				console.log('self.order',self.order)
				self.productGet(true)
			},
			
			getUserData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						
					} else {
						
					};
					self.$Utils.finishFunc('getUserData');
			
				};
				self.$apis.userGet(postData, callback);
			},
			
			change(id,index){
				const self = this;
				self.productData=[];
				if(id!=self.idTwo){
					self.idTwo = id;
					self.indexTwo = index;
					if(self.mainData[index].child[0]){
						self.idThree = self.mainData[index].child[0].id;
						self.indexThree = 0;
						self.order = {};
						self.productGet()
					}
					
						
				}
			},
			
			changeTwo(id){
				const self = this;
				self.productData=[];
				if(id!=self.idThree){
					self.idThree = id;
					self.productGet()		
				}
			},
			
			getLocation() {
				const self = this;
				const callback = (res) => {
					if (res) {
						console.log('res', res)
						if(res.authSetting){
							console.log(232)
							return
						}
						self.content = res.address;
						self.lng = res.location.lng;
						self.lat = res.location.lat
					};
				};
				self.$Utils.getLocation('reverseGeocoder', callback);
				self.$Utils.finishFunc('getLocation');
			},
			
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					type:3
				};
				postData.order={
					create_time:'asc'
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data;
						self.idTwo = self.mainData[0].id;
						self.indexTwo = 0;
						self.idThree = self.mainData[0].child[0].id;
						self.indexThree = 0;
						self.productGet()
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMainData');

				};
				self.$apis.labelGet(postData, callback);
			},
			
			productGet(isNew) {
				const self = this;
				if (isNew) {
					self.productData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						is_page: true,
						pagesize: 5
					}
				};
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				if (JSON.stringify(self.order) != '{}') {
					postData.order = self.$Utils.cloneForm(self.order);
				};
				postData.searchItem = {
					thirdapp_id:2,
					type:2,
					category_id:self.idThree
				};
				postData.getBefore = {
					caseData: {
						tableName: 'User',
						searchItem: {
							behavior:['in',[self.bahavior]]
						},
						middleKey: 'user_no',
						key: 'user_no',
						condition: 'in',
					},
				};
				postData.getAfter = {
					userInfo:{
						token:uni.getStorageSync('user_token'),
						tableName:'UserInfo',
						middleKey:'user_no',
						key:'user_no',
						condition:'=',
						searchItem:{
							status:1
						}
					}
				};
				
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.productData.push.apply(self.productData, res.info.data);
					} else {
						self.$Utils.showToast('没有更多了', 'none');
					};
					console.log('self.productData',self.productData)
					self.$Utils.finishFunc('productGet');
				};
				self.$apis.productGet(postData, callback);
			},

		},
	};
</script>
<style>
	@import "../../assets/style/designIndex.css";
	@import "../../assets/style/index.css";
	@import "../../assets/style/navList.css";
	page{padding-bottom: 100rpx;background: #f5f5f5;}
</style>

 
