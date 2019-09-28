<template>
	<view class="" >

		<view>
			<view class="flexRowBetween cfmSetAdrs"  @click=" Router.navigateTo({route:{path:'/pages/myAddress/myAddress'}})">
				<view class="yy-title">收货地址</view>
				<view class="yy-adrs flexRowBetween">
					<view class="cont" v-if="addressData.city">
						<view class="name" >{{addressData.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{addressData.phone}}</view>
						<view class="" >{{addressData.city+addressData.detail}}</view>
					</view>
					<view class="cont" v-else>
						请选择收货地址
					</view>
					<image class="arrow" src="../../static/images/arrow-icon1.png" alt=""/>
				</view>
			</view>
			
			<view class="mainbox">
				<view class="twoCt" v-for="(item,index) in mainData[0].product" :key="index">
					<view class="leftbox">
						<image :src="item.product&&item.product.mainImg&&item.product.mainImg[0]?item.product.mainImg[0].url:''"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow2">{{item.product?item.product.title:''}}</view>
						<view class="price">{{item.product?item.product.price:''}}</view>
						<view class="numBox" style="position: absolute; right: 0; bottom: 0;">
							<view @click="counter(index,'-')">-</view>
							<view class="num">{{item.count}}</view>
							<view @click="counter(index,'+')">+</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="underFix">
			合计： <view class="price">{{totalPrice}}</view>
			<view class="btn" @click="Utils.stopMultiClick(submit)">立即购买</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				Utils: this.$Utils,
				addressData:{},
				mainData:[],
				totalPrice:0
			}
		},

		onLoad(options) {
			const self = this;
			uni.setStorageSync('canClick',true);
			self.mainData = self.$Utils.jsonToArray(uni.getStorageSync('payPro'), 'unshift');
			self.cartData = self.$Utils.getStorageArray('cartData');
			console.log('self.data.mainData', self.mainData);
			console.log('self.data.cartData', self.cartData);
			self.countTotalPrice();
		},

		onShow() {
			const self = this;
			if(uni.getStorageSync('choosedAddressData')){
				self.addressData = uni.getStorageSync('choosedAddressData')
			}else{
				self.getAddressData()
			}
		},

		methods: {
			
			submit(){
				const self = this;
				uni.setStorageSync('canClick',false);
				if(JSON.stringify(self.addressData) == '{}'){
					uni.setStorageSync('canClick',true);
					self.$Utils.showToast('请选择收货地址','none')
				}else{
					self.addOrder()
				}
			},
			
			addOrder() {
				const self = this;					
				const postData = {
					tokenFuncName: 'getProjectToken',
					orderList: self.mainData,
					snap_address:self.addressData
				};	
				const callback = (res) => {
					if (res && res.solely_code == 100000) {
						self.orderId = res.info.id;
						for (var i = 0; i < postData.orderList[0].product.length; i++) {
							for (var j = 0; j < self.cartData.length; j++) {
								if(postData.orderList[0].product[i].id==self.cartData[j].id){
									self.$Utils.delStorageArray('cartData',self.cartData[j],'id')
								}
							}
							
						}
						self.pay(self.orderId)
					} else {		
						uni.setStorageSync('canClick', true);
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					};
					
				};
				self.$apis.addOrder(postData, callback);
			},
			
			pay(order_id) {
				const self = this;
				
				const postData = {};	
				postData.wxPay = {
					price: self.totalPrice
				};
				postData.tokenFuncName = 'getProjectToken',
				postData.searchItem = {
					id: self.orderId
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						if (res.info) {
							const payCallback = (payData) => {
								console.log('payData', payData)
								if (payData == 1) {
									uni.showToast({
										title: '支付成功',
										duration: 1000,
										success: function() {
											
										}
									});
									setTimeout(function() {
										self.$Router.redirectTo({route:{path:'/pages/myOderList/myOderList'}})
									}, 1000);
								} else {
									uni.setStorageSync('canClick', true);
									uni.showToast({
										title: '支付失败',
										duration: 2000
									});
								};
							};
							self.$Utils.realPay(res.info, payCallback);
						} else {
							
							uni.showToast({
								title: '支付成功',
								duration: 1000,
								success: function() {
									
								}
							});
							setTimeout(function() {
								self.$Router.redirectTo({route:{path:'/pages/myOderList/myOderList'}})
							}, 1000);
						};
					} else {
						uni.setStorageSync('canClick', true);
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					};
				};
				self.$apis.pay(postData, callback);
			},
			
			getAddressData() {
				const self = this;		
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					isdefault:1
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.addressData = res.info.data[0]
					}
				};
				self.$apis.addressGet(postData, callback);
			},
			
			counter(index,type) {
				const self = this;			
				if (type == '+') {
					self.mainData[0].product[index].count++;
				} else {
					if (self.mainData[0].product[index].count > 1) {
						self.mainData[0].product[index].count--;
					}
				};			
				self.countTotalPrice();
			},
			
			countTotalPrice() {
				const self = this;
				self.totalPrice = 0;				
				for (var i = 0; i < self.mainData[0].product.length; i++) {
					self.totalPrice += self.mainData[0].product[i].product.price * self.mainData[0].product[i].count;		
				};
			},
			
			
		}
	}
</script>


<style>
	@import "../../assets/style/car.css";
	
	page{background: #f5f5f5;}
	.mainbox .twoCt{width: 100%; justify-content: space-between;border-bottom: 2rpx solid #e7e7e7;padding: 40rpx 0;}
	.twoCt .cont{width: 476rpx;}
	
	.mainbox{padding: 0 4%;border-bottom: 2rpx solid #e7e7e7;background: #fff;}
	.mainbox:last-child{border-bottom: none;}
	.cfmSetAdrs{padding:40rpx 4%; background: #fff; justify-content: flex-start;position:relative; border-bottom: 20rpx solid #f5f5f5; align-items: normal;}
	.yy-title{width: 20%;}
	.yy-adrs{width: 80%;font-size: 28rpx;color: #666; flex-wrap: wrap;}
	.yy-adrs .cont{ width: 88%;}
	.yy-adrs .arrow{ width: 15rpx;height: 30rpx;;}
	.yy-adrs .name{ width: 70%; margin-bottom: 10rpx;}
	
	
	.underFix{ width: 100%; padding: 0 4%;box-sizing: border-box; line-height: 100rpx; box-shadow: 0 -4rpx 6rpx rgba(0,0,0,0.1); display: flex; justify-content: flex-end; font-size: 28rpx; align-items: center; position: fixed; bottom: 0; left: 0;}
	.underFix .price{ font-size: 28rpx; color: #FF3B3B;}
	.underFix .price::before{content: "￥"; font-weight: normal;}
	.underFix .btn{ width: 200rpx; height: 70rpx; text-align: center; line-height: 70rpx; color: #222; background: #FFCB1E; border-radius: 50rpx; margin-left: 20rpx;font-size: 30rpx;}
</style>
