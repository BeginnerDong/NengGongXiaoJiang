<template>
	<view>
		<view class="detailxqBan">
			<image src="../../static/images/details-img1.png" mode=""></image>
		</view>
		
		<view class="designXq_name pdlr4" style="margin-top: -60rpx;">
			<view class="lis1">
				
				<view class="photo"
				@click=" Router.navigateTo({route:{path:'/pages/indexDesign_index/indexDesign_index?user_no='+mainData.userInfo[0].user_no}})">
					<image :src="mainData.userInfo[0].mainImg[0].url" mode=""></image>
				</view>
				<view class="cont"  style=" margin-top: 70rpx;">
					<view class="flex namebox">
						<view class="font13">{{mainData.userInfo[0].name}}</view>
						<view class="flexRowBetween starClass">
							<view class="starBox">
								<image v-for="item in stars" :src="mainData.userInfo[0].level/2 > item ?(mainData.userInfo[0].level/2-item == 0.5?halfSrc:selectedSrc) : normalSrc" mode="">							
								</image>
							</view>
							<view>{{mainData.userInfo[0].level}}分</view>
						</view>
					</view>
					<view class="flexRowBetween saleB">
						<view class="priceM font14">{{mainData.price}}</view>
						<view class="color3 font12">成交量：{{mainData.sale_count}}</view>
					</view>
				</view>
			</view>
			<view class="lis2 flexRowBetween">
				<view class="adrs font13 avoidOverflow">{{mainData.userInfo[0].address}}</view>
				<view class="icon">
					<image src="../../static/images/details-icon1.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">设计师介绍</view>
		</view>
		<view class="xqInfor">
			<view class="cont">
				<view>{{mainData.userInfo[0].introduce}}</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">设计师评价</view>
		</view>
		
		<view class="designXq_pjLis pdlr4">
			<view class="item" v-for="(item,index) in messageData" :key="index">
				<view class="photo"><image :src="item.mainImg[0]" mode=""></image></view>
				<view class="cont">
					<view class="name color2 font14">{{item.title}}</view>
					<view class="time font12 color3">{{item.create_time}}</view>
					<view class="text">
						{{item.content}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="openMore" v-if="!isLoadAll">展开更多<image class="icon" src="../../static/images/workers-icon2.png"></image></view>
		
		
		<!-- 底部菜单按钮 -->
		<view class="xqbotomBar">
			<view class="left">
				<view class="ite" @click=" Router.switchTab({route:{path:'/pages/index/index'}})">
					<image src="../../static/images/details-icon2.png" mode=""></image>
					<view>返回首页</view>
				</view>
				<view class="ite" @click="collect()">
					<image :src="isCollect?'../../static/images/details-icon6.png':'../../static/images/details-icon3.png'" mode=""></image>
					<view>收藏</view>
				</view>
				<view class="ite">
					<image src="../../static/images/details-icon4.png" mode=""></image>
					<view>客服</view>
				</view>
			</view>
			<view class="payBtn" @click="goBuy">立即下单</view>
		</view>
	</view>

</template>


<script>
	export default {
		data() {
			return {
				Router:this.$Router,
			
				produtList: [
					{},{},{},{}
				],
				mainData:{},
				isLoadAll:false,
				isCollect:false,
				isFoot:false,
				stars: [0, 1, 2, 3, 4],
				normalSrc: '../../static/images/home-supervision-icon3.png',
				selectedSrc: '../../static/images/home-supervision-icon1.png',
				halfSrc: '../../static/images/home-supervision-icon2.png',
				messageData:[]
			}
		},

		onLoad(options) {
			const self = this;
			self.id = options.id;
			var collectData = self.$Utils.getStorageArray('collectDesign');
			var footData = self.$Utils.getStorageArray('footData')
			console.log('5456',collectData)
			for (var i = 0; i < footData.length; i++) {
				if(footData[i].id==self.id){
					self.isFoot = true
				}
			};
			
			for (var i = 0; i < collectData.length; i++) {
				if(collectData[i].id==self.id){
					self.isCollect = true
				}
			};
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getUserInfoData'], self);
		},
		
		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMessageData()
			};
		},

		methods: {
			
			goBuy() {
				const self = this;
				if (JSON.stringify(self.mainData) == '{}') {
					api.showToast('商品错误', 'none', 1000);
					return;
				};
				var orderList = {
					product: [{
						id: self.mainData.id,
						count: 1,
						product: self.mainData
					}],
					type:2,
				};
				uni.setStorageSync('order', orderList);
				self.$Router.navigateTo({
					route: {
						path: '/pages/yuyue/yuyue'
					}
				})
			},
			
			collect() {
				const self = this;	
				if (JSON.stringify(self.mainData) == '{}') {		
					self.$Utils.showToast('信息错误', 'none');
					return;
				};
				if(self.isCollect){
					var res = self.$Utils.delStorageArray('collectDesign',self.mainData,'id');
					if (res) {
						self.isCollect = false;
						self.$Utils.showToast('取消成功', 'none');
					};
				}else{
					var res = self.$Utils.setStorageArray('collectDesign', self.mainData, 'id', 999);
					if (res) {
						self.isCollect = true;
						self.$Utils.showToast('收藏成功', 'none');
					};
				}
				
			},
			
			getUserInfoData(){
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					user_no:uni.getStorageSync('user_info').user_no
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.userInfoData = res.info.data[0];
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.getMainData();						
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					id:self.id,
					user_type:1
				};
				postData.getAfter ={
					userInfo:{
						token:uni.getStorageSync('user_token'),
						tableName:'UserInfo',
						middleKey:'user_no',
						key:'user_no',
						condition:'=',
						searchItem:{
							status:1,
						}
					},
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data[0];
						if(!self.isFoot){
							self.$Utils.setStorageArray('footData', self.mainData, 'id', 999)
						};
						self.getMessageData()
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					
			
				};
				self.$apis.productGet(postData, callback);
			},
			
			getMessageData(isNew) {
				const self = this;
				if (isNew) {
					self.messageData = [];
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
					thirdapp_id:2,
					type:1,
					relation_table:'product',
					relation_id:self.mainData.id,
					user_type:0
				};
				
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.messageData.push.apply(self.messageData, res.info.data);
					} else {
						self.isLoadAll = true;
						
					};
					console.log('self.messageData',self.messageData)
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.messageGet(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/index.css";
	
	page{padding-bottom: 140rpx!important;}
	.xqbotomBar .left .ite{ width: 33.3%;}
</style>
