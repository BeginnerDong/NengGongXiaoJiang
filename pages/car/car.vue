<template>
	<view>
		<view class="pdlr4">
			<view class="caiLis flexRowBetween boxShaow" v-for="(item,index) in mainData" :key="index">
				<view class="itemL">
					<view><image src="../../static/images/about-address-icon1.png" v-if="item.isSelect" @click="choose(index)"></image>
					<image src="../../static/images/about-address-icon4.png" v-if="!item.isSelect" @click="choose(index)"></image></view>
					
				</view>
				<view class="twoCt flexRowBetween">
					<view class="leftbox">
						<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow2">{{item.title}}</view>
						<view class="price">{{item.price}}</view>
						<view class="numBox">
							<view @click="counter(index,'-')">-</view>
							<view class="num">{{item.count}}</view>
							<view @click="counter(index,'+')">+</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="allPrice flexRowBetween" style="bottom: 110rpx;">
			<view class="ll">
				<image @click="chooseAll" v-show="isChooseAll" src="../../static/images/about-address-icon1.png" ></image>
				<image @click="chooseAll" v-show="!isChooseAll" src="../../static/images/about-address-icon4.png" ></image>
				全选
				<view style="margin-left: 10px;" @click="deleteAll()">删除</view>
			</view>
			<view class="rr">
				合计：<view class="mny">{{totalPrice}}</view>
				<span class="jsBtn" @click="pay">结算</span>
			</view>
		</view>	
		
		<!--底部tab键-->
		<view class="navbar">
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/index/index'}})">
				<view class="nav_img">
					<image src="../../static/images/nabar1.png" />
				</view>
				<view class="text">首页</view>
			</view>
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/needs/needs'}})" >
				<view class="nav_img">
					<image src="../../static/images/nabar2.png" />
				</view>
				<view class="text">需求</view>
			</view>
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/car/car'}})" >
				<view class="nav_img">
					<image src="../../static/images/nabar3-a.png" />
				</view>
				<view class="text this-text">购物车</view>
			</view>
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/user/user'}})">
				<view class="nav_img">
					<image src="../../static/images/nabar4.png" />
				</view>
				<view class="text">我的</view>
			</view>
		</view>
		<!--底部tab键 end-->	
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				totalPrice:0,
				mainData:[],
				isChooseAll:false
			}
		},

		onLoad(options) {
			uni.setStorageSync('canClick', true);
		},

		onShow() {
			const self = this;
			self.mainData = self.$Utils.getStorageArray('cartData');
			
			console.log('self.mainData',self.mainData)
			self.checkChooseAll();
			self.countTotalPrice();
		},

		methods: {
			
			deleteAll() {
				const self = this;
				uni.showModal({
					title: '提示',
					content: '确认要删除选中商品吗？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							for (var i = 0; i < self.mainData.length; i++) {
								if(self.mainData[i].isSelect){
									self.$Utils.delStorageArray('cartData', self.mainData[i], 'id');
								}
							};
							self.mainData = self.$Utils.getStorageArray('cartData');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					},
				});
			},


			checkChooseAll() {
				const self = this;
				var isChooseAll = true;
				for (var i = 0; i < self.mainData.length; i++) {
					if (!self.mainData[i].isSelect) {
						isChooseAll = false;
					};
				};
				self.isChooseAll = isChooseAll;
			},

			chooseAll() {
				const self = this;
				self.isChooseAll = !self.isChooseAll;
				for (var i = 0; i < self.mainData.length; i++) {
					self.mainData[i].isSelect = self.isChooseAll;
					self.$Utils.setStorageArray('cartData', self.mainData[i], 'id', 999);
				};
				self.countTotalPrice();
			},

		/* 	delete() {
				const self = this;
				for (var i = 0; i < self.mainData.length; i++) {
					if (self.mainData[i].isSelect) {
						self.$Utils.delStorageArray('cartData', self.mainData[i], 'id');
					}
				};
				self.mainData = self.$Utils.getStorageArray('cartData');
				self.checkChooseAll();
				self.setData({
					web_mainData: self.mainData
				});
			}, */

			choose(index) {
				const self = this;
				
				if (self.mainData[index].isSelect) {
					self.mainData[index].isSelect = false;
				} else {
					self.mainData[index].isSelect = true;
				};
				self.$Utils.setStorageArray('cartData', self.mainData[index], 'id', 999);
				
				self.checkChooseAll();
				self.countTotalPrice();
			},

			countTotalPrice() {
				const self = this;
				self.totalPrice = 0;
				
				for (var i = 0; i < self.mainData.length; i++) {
					if (self.mainData[i].isSelect) {
						self.totalPrice += self.mainData[i].price * self.mainData[i].count;
					};
				};
				console.log(self.totalPrice)
			},

			

			pay(e) {
				const self = this;
				const orderList = {
					product: [],
					type: 1
				};
				for (var i = 0; i < self.mainData.length; i++) {
					if (self.mainData[i].isSelect) {
						orderList.product.push({
							id: self.mainData[i].id,
							count: self.mainData[i].count,
							product:self.mainData[i]
						}, );
					};
				};
				console.log('orderList.product',orderList.product)
				if(orderList.product.length>1){
					for (var i = 0; i < orderList.product.length; i++) {
						if(orderList.product[i].product.user_no!=orderList.product[i+1].product.user_no){
							self.$Utils.showToast('产品商家不同', 'none', 1000);
							return;
						}
					};
				};
				
				if (orderList.product.length == 0) {
					self.$Utils.showToast('未选择商品', 'none', 1000);
					return;
				};
				uni.setStorageSync('payPro', orderList);
				self.$Router.navigateTo({route:{path:'/pages/confirmOrder/confirmOrder?type='+orderList.product[0].product.type}})
				

			},


			counter(index,type) {
				const self = this;
				
				if (type == '+') {
					self.mainData[index].count++;
				} else {
					if (self.mainData[index].count > 1) {
						self.mainData[index].count--;
					}
				};
				self.$Utils.setStorageArray('cartData', self.mainData[index], 'id', 999);
				
				self.countTotalPrice();
			},


		
		
		}
	}
</script>

<style>
	@import "../../assets/style/car.css";
	@import "../../assets/style/navbar.css";
	page{padding-bottom: 220rpx; background: #f5f5f5;}
	

</style>
