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
				<view class="twoCt" v-for="(item,index) in mainData.product" :key="index">
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
			self.mainData = uni.getStorageSync('payPro');
			self.cartData = self.$Utils.getStorageArray('cartData');
			self.type = options.type;
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
				const postData = self.$Utils.cloneForm(self.mainData)
				postData.tokenFuncName = 'getProjectToken';
				postData.snap_address = self.addressData;
				postData.type = self.type;
				postData.data = {
					shop_no:self.mainData.product[0].product.user_no
				}
				const callback = (res) => {
					if (res && res.solely_code == 100000) {
						self.orderId = res.info.id;
						for (var i = 0; i < self.mainData.product.length; i++) {
							for (var j = 0; j < self.cartData.length; j++) {
								if(self.mainData.product[i].id==self.cartData[j].id){
									self.$Utils.delStorageArray('cartData',self.cartData[j],'id')
								}
							}
							
						}
						self.getOrderData()
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
			
			getOrderData() {
				const self = this;
				const postData = {};		
				postData.searchItem = {
					id:self.orderId,
					user_type:0
				};
				
				postData.tokenFuncName = 'getProjectToken';
				
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
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.orderData=res.info.data[0];
						self.getDistriData()
						
					} else {
						self.$Utils.showToast(res.msg,'none');
					};
				};
				self.$apis.orderGet(postData, callback);
			},	
			
			getDistriData() {
				const self = this;
				const postData = {};	
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					child_no:self.orderData.shop_no,
				};	
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.distriData=res.info.data;
						
					} 
					self.pay()
				};
				self.$apis.distriGet(postData, callback);
			},
			
			pay(order_id) {
				const self = this;	
				
				var ratio = uni.getStorageSync('user_info').thirdApp.custom_rule.material_in/100;
				var tax = uni.getStorageSync('user_info').thirdApp.custom_rule.material_tax/100;
				var reward = uni.getStorageSync('user_info').thirdApp.custom_rule.reward/100;
				const postData = {};	
				postData.wxPay = {
					price: self.totalPrice
				};
				postData.tokenFuncName = 'getProjectToken',
				postData.searchItem = {
					id: self.orderId
				};
				if(self.type==5){
					postData.payAfter = [
						
						{
							tableName: 'FlowLog',
							FuncName: 'add',
							data: {
								user_no:self.orderData.shop_no,
								type:2,
								count:self.totalPrice*ratio - (self.totalPrice*ratio)*tax,
								thirdapp_id:2,
								trade_info:'首付款',
								relation_user:self.orderData.user_no,
								relation_id:self.id
							}
						},
						{
							tableName: 'FlowLog',
							FuncName: 'add',
							data: {
								user_no:'U910872296194660',
								type:2,
								count:(self.totalPrice*ratio)*tax,
								thirdapp_id:2,
								trade_info:'平台抽成',
								relation_user:self.mainData.shop_no,
								relation_id:self.id
							}
						}
					];
					if(self.distriData.length>0&&self.orderData.shopInfo[0].behavior<4){
						postData.payAfter.push(
							{
								tableName: 'FlowLog',
								FuncName: 'add',
								data: {
									user_no:self.distriData[0].parent_no,
									type:2,
									count:(self.totalPrice*ratio - (self.totalPrice*ratio)*tax)*reward,
									thirdapp_id:2,
									trade_info:'返佣',
									relation_user:self.orderData.shop_no,
									relation_id:self.id
								}
							},
							{
								tableName: 'UserInfo',
								FuncName: 'update',
								data: {
									behavior:self.orderData.shopInfo[0].behavior+1
								},
								searchItem:{
									user_no:self.orderData.shop_no,
								}
							}
						)
					};
				}
				
				const callback = (res) => {
					if (res.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
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
					self.mainData.product[index].count++;
				} else {
					if (self.mainData.product[index].count > 1) {
						self.mainData.product[index].count--;
					}
				};			
				self.countTotalPrice();
			},
			
			countTotalPrice() {
				const self = this;
				self.totalPrice = 0;				
				for (var i = 0; i < self.mainData.product.length; i++) {
					self.totalPrice += self.mainData.product[i].product.price * self.mainData.product[i].count;		
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
