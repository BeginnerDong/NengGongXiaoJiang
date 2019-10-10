<template>
	<view>
		<view class="detailxqBan">
			<image :src="mainData.mainImg[0].url" mode=""></image>
		</view>
		<view class="detailTit">
			<view class="tit">{{mainData.title}}</view>
			<view class="flexRowBetween">
				<view class="pric">{{mainData.price}}</view>
				<view class="font12 color3">销量：{{mainData.sale_count}}</view>
			</view>
		</view>
		<view class="f5H10"></view>

		<view class="infor-title flexRowBetween" v-if="type!=4">
			<view class="xian"></view>
			<view class="tt">商家</view>
		</view>
		<view class="busnsName palr4 flexRowBetween" v-if="type!=4">
			<view class="flexRowAround">
				<view class="leftImg" @click=" Router.navigateTo({route:{path:'/pages/business_index/business_index?user_no='+mainData.userInfo[0].user_no+'&type='+type}})">
					<image :src="mainData.userInfo[0].mainImg&&mainData.userInfo[0].mainImg[0]?mainData.userInfo[0].mainImg[0].url:'../../static/images/qiyexinxi-icon2.png'"></image>
				</view>
				<view class="cont">
					<view class="tit avoidOverflow">{{mainData.userInfo[0].name}}</view>
					<view class="adrs avoidOverflow">{{mainData.userInfo[0].address}}</view>
				</view>
			</view>
			<view class="icon">
				<image src="../../static/images/details-icon1.png" mode=""></image>
			</view>
		</view>
		<view class="f5H10" v-if="type!=4"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">详情介绍</view>
		</view>
		<view class="xqInfor">
			<view class="cont">
				<view class="content ql-editor" v-html="mainData.content">
				</view>
			</view>

		</view>

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
				<view class="ite" @click="addCart()" v-if="type!=3">
					<image src="../../static/images/details-icon5.png" mode=""></image>
					<view>购物车</view>
				</view>
			</view>
			<view class="payBtn" @click="goBuy()">立即下单</view>
		</view>
	</view>

</template>
<script>
	export default {
		data() {
			return {
				Router: this.$Router,

				produtList: [{}, {}, {}, {}],
				mainData: {},
				type: '',
				isCollect:false
			}
		},

		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.type = options.type;
			var collectData = self.$Utils.getStorageArray('collectProduct');
			
			for (var i = 0; i < collectData.length; i++) {
				if(collectData[i].id==self.id){
					self.isCollect = true
				}
			};
			console.log(self.type)
			self.$Utils.loadAll(['getUserInfoData'], self);
		},

		methods: {
			
			collect() {
				const self = this;	
				if (JSON.stringify(self.mainData) == '{}') {		
					self.$Utils.showToast('商品信息错误', 'none');
					return;
				};
				if(self.isCollect){
					var res = self.$Utils.delStorageArray('collectProduct',self.mainData,'id');
					if (res) {
						self.isCollect = false;
						self.$Utils.showToast('取消成功', 'none');
					};
				}else{
					var res = self.$Utils.setStorageArray('collectProduct', self.mainData, 'id', 999);
					if (res) {
						self.isCollect = true;
						self.$Utils.showToast('收藏成功', 'none');
					};
				}
				
			},

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
					type:self.type,
				};
				
				if(self.type!=3){
					uni.setStorageSync('payPro', orderList);
					self.$Router.navigateTo({
						route: {
							path: '/pages/confirmOrder/confirmOrder?type='+self.type
						}
					})
				}else{
					uni.setStorageSync('order', orderList);
					self.$Router.navigateTo({
						route: {
							path: '/pages/yuyue/yuyue'
						}
					})
				}
				
			},

			getUserInfoData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					user_no: uni.getStorageSync('user_info').user_no
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
					id: self.id,
				};
				if (self.type != 4) {
					postData.getAfter = {
						userInfo: {
							token: uni.getStorageSync('user_token'),
							tableName: 'UserInfo',
							middleKey: 'user_no',
							key: 'user_no',
							condition: '=',
							searchItem: {
								status: 1,
							}
						},
					};
				}

				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data[0];
						const regex = new RegExp('<img', 'gi');
						self.mainData.content = self.mainData.content.replace(regex, `<img style="max-width: 100%;"`);
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.productGet(postData, callback);
			},

			addCart() {
				const self = this;

				if (JSON.stringify(self.mainData) == '{}') {

					self.$Utils.showToast('商品信息错误', 'none');
					return;
				};
				self.mainData.count = 1;
				self.mainData.isSelect = true;

				var res = self.$Utils.setStorageArray('cartData', self.mainData, 'id', 999);
				if (res) {
					self.$Utils.showToast('加入成功', 'none');
				};
			},
		}
	}
</script>



<style>
	@import "../../assets/style/index.css";
	@import "../../assets/style/quill.css";

	page {
		padding-bottom: 140rpx;
	}
</style>
