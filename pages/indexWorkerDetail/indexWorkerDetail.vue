<template>
	<view>
		<view class="detailxqBan">
			<image :src="mainData.label&&mainData.label[mainData.category_id]&&mainData.label[mainData.category_id].mainImg&&mainData.label[mainData.category_id].mainImg[0]?mainData.label[mainData.category_id].mainImg[0].url:''" mode=""></image>
		</view>
		
		<view class="designXq_name pdlr4" style="margin-top: 0;padding: 30rpx 4%;">
			<view class="lis1">
				<view class="photo" 
				@click=" Router.navigateTo({route:{path:'/pages/indexWorker_index/indexWorker_index?user_no='+mainData.userInfo[0].user_no}})">
					<image :src="mainData.userInfo[0].mainImg[0].url" mode=""></image>
				</view>
				<view class="cont">
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
					<view class="text2 avoidOverflow2 color3 font13">{{mainData.userInfo[0].introduce}}</view>
					<view class="flexRowBetween saleB">
						<view class="priceM font14">{{mainData.price}}</view>
						<view class="color3 font12">成交量：{{mainData.sale_count}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">工艺内容</view>
		</view>
		<view class="xqInfor">
			<view class="cont">
				<view>{{mainData.label[mainData.category_id].passage1}}</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">工人介绍</view>
		</view>
		<view class="xqInfor">
			<view class="cont">
				<view>{{mainData.userInfo[0].introduce}}</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">服务案例</view>
		</view>
		
		<view class="proLis flexRowBetween xqProlis">
			<view class="item-lis" v-for="(item,index) in mainData.message" :key="index" :data-id="item.id" :data-user_no="item.user_no"
			@click=" Router.navigateTo({route:{path:'/pages/indexWorkerDetailTwo/indexWorkerDetailTwo?user_no='+$event.currentTarget.dataset.user_no+'&id='+$event.currentTarget.dataset.id}})">
				<image class="img" :src="item.mainImg[0].url" alt="" />
				<view class="tit avoidOverflow2">{{item.title}}</view>
			</view>
		</view>
		
		
		<!-- 底部菜单按钮 -->
		<view class="xqbotomBar">
			<view class="left">
				<view class="ite" @click=" Router.redirectTo({route:{path:'/pages/index/index'}})">
					<image src="../../static/images/details-icon2.png" mode=""></image>
					<view>返回首页</view>
				</view>
				<view class="ite" @click="collect()">
					<image :src="isCollect?'../../static/images/details-icon6.png':'../../static/images/details-icon3.png'" mode=""></image>
					<view>收藏</view>
				</view>
				<button class="ite" open-type="contact">
					<image src="../../static/images/details-icon4.png" mode=""></image>
					<view>客服</view>
				</button>
			</view>
			<view class="payBtn" @click="goBuy">立即预约</view>
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
				isCollect:false,
				stars: [0, 1, 2, 3, 4],
				normalSrc: '../../static/images/home-supervision-icon3.png',
				selectedSrc: '../../static/images/home-supervision-icon1.png',
				halfSrc: '../../static/images/home-supervision-icon2.png',
			}
		},

		onLoad(options) {
			const self = this;
			self.id = options.id;
			var collectData = self.$Utils.getStorageArray('collectWorker');
			console.log('5456',collectData)
			for (var i = 0; i < collectData.length; i++) {
				if(collectData[i].id==self.id){
					self.isCollect = true
				}
			};
			self.$Utils.loadAll(['getUserInfoData'], self);
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
					type:1,
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
					var res = self.$Utils.delStorageArray('collectWorker',self.mainData,'id');
					if (res) {
						self.isCollect = false;
						self.$Utils.showToast('取消成功', 'none');
					};
				}else{
					var res = self.$Utils.setStorageArray('collectWorker', self.mainData, 'id', 999);
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
					message:{
						token:uni.getStorageSync('user_token'),
						tableName:'Message',
						middleKey:'user_no',
						key:'user_no',
						searchItem:{
							status:1,
							type:5
						},
						condition:'='
					},
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data[0];
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getUserInfoData');
			
				};
				self.$apis.productGet(postData, callback);
			
			}
		}
	}
</script>

<style>
	@import "../../assets/style/index.css";
	@import "../../assets/style/xqbotomBar.css";
	button{
		background: none;
		line-height: 1.5;
	}
	button::after{
		border: none;
	}
	.button-hover{
		color: #000000;
		background: none;
	}
	page{padding-bottom: 140rpx!important;}
	.xqbotomBar .left .ite{ width: 33.3%;}
</style>
