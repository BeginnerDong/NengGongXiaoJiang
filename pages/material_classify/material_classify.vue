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
						@click=" Router.navigateTo({route:{path:'/pages/pageDetail/pageDetail?id='+$event.currentTarget.dataset.id+'&type='+type}})">
							<view class="pic">
								<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" alt="" />
							</view>
							<view class="infor">
								<view class="title flex">
									<view class="avoidOverflow2">{{item.title}}</view>
								</view>
								<view class="flexRowBetween saleB">
									<view class="price font14">{{item.price}}</view>
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
				
				idTwo:'',
				idThree:'',
				indexTwo:0,
				indexThree:0,
				mainData:[],
				productData:[],
				type:'',
				order:{}
			}
		},
		
		onLoad(options) {
			const self = this;
			wx.setNavigationBarTitle({
				title: options.name,
			});
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.type = parseInt(options.type);
			self.$Utils.loadAll(['getMainData','getLocation'], self);
		},
		
		methods: {
			
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
			
			change(id,index){
				const self = this;
				self.productData=[];
				if(id!=self.idTwo){
					self.idTwo = id;
					self.indexTwo = index;
					if(self.mainData[index].child&&self.mainData[index].child[0]){
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
			
			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {};
				
				postData.searchItem = {
					parentid:self.id,
					type:self.type+1
				};
				if(self.type==4){
					postData.searchItem.title = ['not in',['特价辅料']]
				}
				/* postData.getAfter ={
					child:{
						order:{
							create_time:'asc'
						},
						tableName:'Label',
						middleKey:'id',
						key:'parentid',
						condition:'=',
						searchItem:{
							status:1,
							type:self.type
						}
					}
				}; */
				postData.order={
					create_time:'asc'
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data;
						
						self.idTwo = self.mainData[0].id;
						self.indexTwo = 0;
						if(self.mainData[0].child){
							self.idThree = self.mainData[0].child[0].id;
							self.indexThree = 0;
							self.productGet()
						}
						
						
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
					type:self.type,
					category_id:self.idThree
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.productData.push.apply(self.productData, res.info.data);
					} else {
						self.$Utils.showToast('没有更多了', 'none');
					};
					console.log('self.productData',self.productData)
					self.$Utils.finishFunc('getMainData');
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
	
	.class_infor .designIndex .items{padding: 0 20rpx 0 0;}
	.class_infor .designIndex .items .pic{ width: 200rpx; height: 200rpx;}
	.class_infor .designIndex .items .infor{width:290rpx;height: 200rpx;box-sizing: border-box;padding: 16rpx 0;}
	.designIndex .items .infor .saleB{bottom: 20rpx;}
</style>

 
