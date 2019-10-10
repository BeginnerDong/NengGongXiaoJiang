<template>
	<view>
		<view class="orderNav">
			<view class="tt" :class="current==1?'on':''" @click="change('1')">全部</view>
			<view class="tt" :class="current==2?'on':''" @click="change('2')">待支付</view>
			<view class="tt" :class="current==3?'on':''" @click="change('3')">待发货</view>
			<view class="tt" :class="current==4?'on':''" @click="change('4')">待收货</view>
			<view class="tt" :class="current==5?'on':''" @click="change('5')">已完成</view>
		</view>
		<view class="prolisbox pdlr4">
			<view class="prolis boxShaow" v-for="(item,index) in mainData">
				
				<view class="datt">
					<view class="left">交易时间：{{item.create_time}}</view>
					<view class="state" v-if="item.pay_status==0">等待支付</view>
					<view class="state" v-if="item.pay_status==1&&item.transport_status==0">等待发货</view>
					<view class="state" v-if="item.pay_status==1&&item.transport_status==1">等待收货</view>
					<view class="state" v-if="item.pay_status==1&&item.order_step==3">已完成</view>
				</view>
				
				<view class="twoCt" v-for="c_item in item.products">
					<view class="leftbox">
						<image :src="c_item.snap_product&&c_item.snap_product.mainImg&&c_item.snap_product.mainImg[0]?c_item.snap_product.mainImg[0].url:''"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow2">{{c_item.snap_product?c_item.snap_product.title:''}}</view>
						<view class="price">{{c_item.snap_product?c_item.snap_product.price:''}}</view>
					</view>
				</view>
				<view class="bBtn">
					<view class="btn gopay" v-if="item.pay_status==0" @click="pay(item.id,item.price,index)">去支付</view>
					<view class="btn selt" v-if="item.pay_status==0" @click="orderUpdate(index,'1')">取消订单</view>
					<view class="btn" v-if="item.type==4" @click="refundAlert(index)">退款</view>
					<view class="btn" v-if="item.order_step==1">退款中</view>
					<view class="btn" v-if="item.pay_status==1&&item.transport_status==1" @click="orderUpdate(index,'2')">确认收货</view>
				</view>
			</view>
			
		</view>

		<view class="refundAlert" v-if="is_show">
			<view class="refundExplain">
				<view>
					<textarea v-model="passage1" class="textMsg" value="" placeholder="请填写退款原因" placeholder-style="color:#999" />
				</view>
				<view class="submitbtn">
					<button type="button" style="width: 100%; margin:80rpx 0 20rpx 0;" @click="refund()">提交</button>
				</view>
				<view class="colseBtn"  @click="close" style="top: auto;bottom: -120rpx;">×</view>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				passage1:'',
				searchItem:{
					
				},
				mainData:[],
				current:1,
				refundIndex:''
			}
		},

		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			var res = self.$Token.getProjectToken(function(){
				self.$Utils.loadAll(['getMainData'], self)
			});
			if(res){
				self.$Utils.loadAll(['getMainData'], self)
			};
		},

	
		
		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},

		methods: {
			
			close(){
				const self = this;
				self.is_show = false
			},
			
			refundAlert(index){
				const self = this;
				self.refundIndex = index;
				self.is_show = !self.is_show
			},
			

			
			refund() {
				const self = this;		
				const postData = {};			
				postData.searchItem = {
					order_no:self.mainData[self.refundIndex].order_no
				};		
				postData.data = {
					passage1:self.passage1,
					order_step:1
				};
				postData.tokenFuncName = 'getProjectToken';			
				const callback = (res) => {
					if(res.solely_code==100000){
						
						self.$Utils.showToast('申请成功','none',1000);							
						setTimeout(function() {
							self.mainData = [];
							self.paginate={
								count: 0,
								currentPage:1,
								pagesize:5,
								is_page:true,
							};
							self.getMainData()
						}, 1000);
						
					}else{
						self.$Utils.showToast(res.msg,'none');
					}
				};
				self.$apis.orderUpdate(postData, callback);
			},
			
			pay(order_id,price,index) {
				const self = this;
				var ratio = uni.getStorageSync('user_info').thirdApp.custom_rule.material_in/100;
				var tax = uni.getStorageSync('user_info').thirdApp.custom_rule.material_tax/100;
				var reward = uni.getStorageSync('user_info').thirdApp.custom_rule.reward/100;
				const postData = {};	
				postData.wxPay = {
					price: price
				};
				postData.tokenFuncName = 'getProjectToken',
				postData.searchItem = {
					id: order_id
				};
				if(self.mainData[index].type==5){
					postData.payAfter = [
						
						{
							tableName: 'FlowLog',
							FuncName: 'add',
							data: {
								user_no:self.mainData[index].shop_no,
								type:2,
								count:price*ratio - (price*ratio)*tax,
								thirdapp_id:2,
								trade_info:'首付款',
								relation_user:self.mainData[index].user_no,
								relation_id:self.mainData[index].id
							}
						},
						{
							tableName: 'FlowLog',
							FuncName: 'add',
							data: {
								user_no:'U910872296194660',
								type:2,
								count:(price*ratio)*tax,
								thirdapp_id:2,
								trade_info:'平台抽成',
								relation_user:self.mainData[index].shop_no,
								relation_id:self.mainData[index].id
							}
						}
					];
					if(self.mainData[index].distriData.length>0&&self.mainData[index].shopInfo[0].behavior<4){
						postData.payAfter.push(
							{
								tableName: 'FlowLog',
								FuncName: 'add',
								data: {
									user_no:self.mainData[index].distriData[0].parent_no,
									type:2,
									count:(price*ratio - (price*ratio)*tax)*reward,
									thirdapp_id:2,
									trade_info:'返佣',
									relation_user:self.mainData[index].shop_no,
									relation_id:self.mainData[index].id
								}
							},
							{
								tableName: 'UserInfo',
								FuncName: 'update',
								data: {
									behavior:self.mainData[index].shopInfo[0].behavior+1
								},
								searchItem:{
									user_no:self.mainData[index].shop_no,
								}
							}
						)
					};
				}
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
										self.mainData = [];
										self.paginate={
											count: 0,
											currentPage:1,
											pagesize:5,
											is_page:true,
										};
										self.getMainData()
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
								self.mainData = [];
								self.paginate={
									count: 0,
									currentPage:1,
									pagesize:5,
									is_page:true,
								};
								self.getMainData()
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
			
			change(current) {
				const self = this;
				if(current!=self.current){
					self.current = current
					self.searchItem = {}
					if (self.current == '1') {
					
					} else if (self.current == '2') {
						self.searchItem.pay_status = '0';
					
					} else if (self.current == '3') {
						self.searchItem.pay_status = '1';
						self.searchItem.transport_status = '0';
					} else if (self.current == '4') {
						self.searchItem.pay_status = '1';
						self.searchItem.transport_status = '1';
					} else if (self.current == '5') {
						self.searchItem.pay_status = '1';
						self.searchItem.transport_status = '2';
					};
					self.mainData = [];
					self.paginate={
						count: 0,
						currentPage:1,
						pagesize:5,
						is_page:true,
					};
					self.getMainData()
				}
			},

			getMainData() {
				const self = this;		
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem.type = ['in',[4,5]];
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
					distriData:{
						tableName:'Distribution',
						middleKey:'shop_no',
						key:'child_no',
						condition:'=',
						searchItem:{
							status:1
						}
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					} else {
						self.$Utils.showToast('没有更多了','none');
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},
			
			orderUpdate(index,type) {
				const self = this;		
				var ratio = uni.getStorageSync('user_info').thirdApp.custom_rule.material_in/100;
				var tax = uni.getStorageSync('user_info').thirdApp.custom_rule.material_tax/100;
				var reward = uni.getStorageSync('user_info').thirdApp.custom_rule.reward/100;
				var lessPrice = parseFloat(self.mainData[index].price) - self.mainData[index].price*ratio;
				const postData = {};			
				postData.searchItem = {
					order_no:self.mainData[index].order_no
				};		
				if(type=='1'){
					postData.data = {
						status:-1
					};
				}else{
					postData.data = {
						transport_status:2
					};
				}
				if(self.type=='2'&&self.mainData[index].type==5){
					postData.saveAfter = [
						{
							tableName: 'FlowLog',
							FuncName: 'add',
							data: {
								user_no:self.mainData[index].shop_no,
								type:2,
								count:lessPrice - lessPrice*tax,
								thirdapp_id:2,
								trade_info:'尾款',
								relation_user:self.mainData[index].user_no,
								relation_id:self.mainData[index].id
							}
						},
						{
							tableName: 'FlowLog',
							FuncName: 'add',
							data: {
								user_no:'U910872296194660',
								type:2,
								count:lessPrice*tax,
								thirdapp_id:2,
								trade_info:'平台抽成',
								relation_user:self.mainData[index].shop_no,
								relation_id:self.mainData[index].id
							}
						}
					];		
					if(self.mainData[index].distriData.length>0&&self.mainData[index].shopInfo[0].behavior<4){
						postData.saveAfter.push(
							{
								tableName: 'FlowLog',
								FuncName: 'add',
								data: {
									user_no:self.mainData[index].distriData[0].parent_no,
									type:2,
									count:(lessPrice - lessPrice*tax)*reward,
									thirdapp_id:2,
									trade_info:'返佣',
									relation_user:self.mainData[index].shop_no,
									relation_id:self.mainData[index].id
								}
							},
							{
								tableName: 'UserInfo',
								FuncName: 'update',
								data: {
									behavior:self.mainData[index].shopInfo[0].behavior+1
								},
								searchItem:{
									user_no:self.mainData[index].shop_no,
								}
							}
						)
					};
				}
				postData.tokenFuncName = 'getProjectToken';			
				const callback = (res) => {
					if(res.solely_code==100000){
						if(type=='1'){
							self.$Utils.showToast('取消成功','none',1000);
						}else{
							self.$Utils.showToast('确认成功','none',1000);
						}					
						setTimeout(function() {
							self.mainData = [];
							self.paginate={
								count: 0,
								currentPage:1,
								pagesize:5,
								is_page:true,
							};
							self.getMainData()
						}, 1000);
						
					}else{
						self.$Utils.showToast(res.msg,'none');
					}
				};
				self.$apis.orderUpdate(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	page{background: #f5f5f5; padding-bottom: 80rpx;}

</style>
