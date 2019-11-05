<template>
	<view>
		<view class="flexRowBetween money">
			<view>当前余额</view>
			<view class="price">{{lessMoney}}</view>
		</view>
		<view class="f5H5"></view>
		
		<view class="pdlr4" style="padding-top: 40rpx;">
			<view class="font15 title">申请原因</view>
			<view class="">
				<textarea v-model="submitData.description" :disabled="type==1?false:true"  placeholder="请输入申请原因" />
			</view>
		</view>
		<view class="f5H5"></view>
		<view class="flexRowBetween money">
			<view>申请金额</view>
			<view class="">
				<input :disabled="type==1?false:true" type="text" value=""  style="text-align: right;" placeholder="请输入金额" v-model="submitData.price"/>
			</view>
		</view>
		<view class="f5H5"></view>
		
		
		<view class="submitbtn" style="margin-top: 200rpx;" v-if="type==1">
			<button type="submit" @click="Utils.stopMultiClick(submit)">确认</button>
		</view>
		
		<view class="submitbtn" style="margin-top: 200rpx;display: flex;" v-if="type==0&&hasOne&&orderId==''">
			<button type="submit" style="width: 30%;" @click="processUpdate('1')">同意</button>
			<button type="submit" style="width: 30%;" @click="processUpdate('2')">拒绝</button>
		</view>
		
		<view class="submitbtn" style="margin-top: 200rpx;display: flex;" v-if="type==0&&!hasOne">
			<button type="submit" style="background: #999999;">暂无申请</button>
		</view>
		
		<view class="submitbtn" style="margin-top: 200rpx;display: flex;" v-if="type==0&&hasOne&&orderId!=''">
			<button type="submit" @click="pay()">已同意，去支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				submitData:{
					description:'',
					price:'',
					type:5,
				},
				Utils:this.$Utils,
				lessMoney:0,
				type:'',
				hasOne:true,
				hasPay:0,
				flowLogData:[],
				distriData:[],
				orderId:''
			}
		},
		
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.type=options.type;
			console.log('options',options)
			self.$Utils.loadAll(['getMainData'], self)
		},
		
		methods: {
			
			
			pay() {
				const self = this;
				uni.setStorageSync('canClick', false);	
				var reward = uni.getStorageSync('user_info').thirdApp.custom_rule.reward/100;
				if(self.mainData.type==1){
					var tax = uni.getStorageSync('user_info').thirdApp.custom_rule.work_tax/100
				}else if(self.mainData.type==2){
					var tax = uni.getStorageSync('user_info').thirdApp.custom_rule.design_tax/100
				}
				const postData = {};	
				postData.wxPay = {
					price:parseFloat(self.submitData.price).toFixed(2)
				};
				postData.tokenFuncName = 'getProjectToken',
				postData.searchItem = {
					id: self.orderId
				};
				postData.payAfter = [
					{
						tableName: 'Process',
						FuncName: 'update',
						data: {
							pay_status:1
						},
						searchItem:{
							id:self.processData.id
						}
					},
					
					{
						tableName: 'FlowLog',
						FuncName: 'add',
						data: {
							user_no:self.mainData.shop_no,
							type:2,
							count:parseFloat(self.submitData.price).toFixed(2) - parseFloat(self.submitData.price).toFixed(2)*tax,
							thirdapp_id:2,
							trade_info:'增加预算',
							relation_user:self.mainData.user_no,
							relation_id:self.id
						}
					},
					{
						tableName: 'FlowLog',
						FuncName: 'add',
						data: {
							user_no:'U910872296194660',
							type:2,
							count:parseFloat(self.submitData.price).toFixed(2)*tax,
							thirdapp_id:2,
							trade_info:'平台抽成',
							relation_user:self.mainData.shop_no,
							relation_id:self.id
						}
					}
				];
				if(self.distriData.length>0&&self.mainData.shopInfo[0].behavior<4){
					postData.payAfter.push(
						{
							tableName: 'FlowLog',
							FuncName: 'add',
							data: {
								user_no:self.distriData[0].parent_no,
								type:2,
								count:(parseFloat(self.submitData.price).toFixed(2) - parseFloat(self.submitData.price).toFixed(2)*tax)*reward,
								thirdapp_id:2,
								trade_info:'返佣',
								relation_user:self.mainData.shop_no,
								relation_id:self.id
							}
						},
						{
							tableName: 'UserInfo',
							FuncName: 'update',
							data: {
								behavior:self.mainData.shopInfo[0].behavior+1
							},
							searchItem:{
								user_no:self.mainData.shop_no,
							}
						}
					)
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
										uni.navigateBack({
											delta: 1
										});
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
								uni.navigateBack({
									delta: 1
								});
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
			
			addOrder() {
				const self = this;
				uni.setStorageSync('canClick', false);	
				if(self.orderId!=''){
					self.pay();
					return
				};
				var reward = uni.getStorageSync('user_info').thirdApp.custom_rule.reward/100;
				if(self.mainData.type==1){
					var tax = uni.getStorageSync('user_info').thirdApp.custom_rule.work_tax/100
				}else if(self.mainData.type==2){
					var tax = uni.getStorageSync('user_info').thirdApp.custom_rule.design_tax/100
				}
				const postData = {};	
				/* postData.wxPay = {
					price:parseFloat(self.submitData.price).toFixed(2)
				}; */
				postData.tokenFuncName = 'getProjectToken',
				postData.data = {
					parent_no:self.mainData.parentOrder[0].order_no,
					price:parseFloat(self.submitData.price).toFixed(2)
				}
				
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.orderId = res.info.id;
						self.processUpdate('3')
						self.pay()
					}else{
						self.$Utils.showToast(res.msg, 'none')
					}
				};
				self.$apis.addVirtualOrder(postData, callback);
			},
			
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);	
				const pass = self.$Utils.checkComplete(self.submitData);
				console.log('pass', pass);
				console.log('self.submitData',self.submitData)
				if (pass) {			
					self.processAdd();	
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息', 'none')
				};
			},
			
			processUpdate(type) {
				const self = this;
				uni.setStorageSync('canClick', false);	
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data = {};
				postData.searchItem = {
					id:self.processData.id,
					user_no:self.mainData.shop_no,
					user_type:1
				};
				if(type=='1'){
					postData.data.agree_status=1
				}else if(type=='2'){
					postData.data.agree_status=-1
				}else if(type=='3'){
					postData.data.pay_id = self.orderId
				}
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('操作成功', 'none');
						if(type=='1'){
							self.addOrder()
						}else if(type=='2'){
							setTimeout(function() {						
								uni.navigateBack({
									delta:1
								})
							}, 800)
						}
						
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.processUpdate(postData, callback);
			},
			
			processAdd() {
				const self = this;
				const postData = {};
				
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
					postData.data.title = '工人发起申请追加预算'
				}
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('添加成功', 'none');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 800)
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.processAdd(postData, callback);
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
				};
				postData.getAfter = {
					parentOrder:{
						tableName:'Order',
						middleKey:'parent_no',
						key:'order_no',
						condition:'=',
						searchItem:{
							status:1,
							user_type:0
						}
					},
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
						self.mainData=res.info.data[0];
						self.submitData.order_no = self.mainData.order_no;
						if(self.type==0){
							self.getProcessData()
						};
						self.getFlowLogData();
						self.getDistriData();
					} else {
						self.$Utils.showToast(res.msg,'none');
					};
					
					console.log(self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},	
			
			getDistriData() {
				const self = this;
				const postData = {};	
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					child_no:self.mainData.shop_no,
				};	
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.distriData=res.info.data;
					} 
				};
				self.$apis.distriGet(postData, callback);
			},
			
			getProcessData() {
				const self = this;
				const postData = {};		
				postData.searchItem = {
					order_no:self.mainData.order_no,
					type:5,
					user_no:['in',[self.mainData.user_no,self.mainData.shop_no]],
					pay_status:0,
					agree_status:['in',[0,1]]
				};
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
				}else{
					postData.tokenFuncName = 'getProjectToken';
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.processData=res.info.data[0];
						self.submitData.description = self.processData.description;
						self.submitData.price = self.processData.price;
						if(self.processData.agree_status==1){
							self.orderId = self.processData.pay_id
						}
					}else{
						self.hasOne = false
					}
				};
				self.$apis.processGet(postData, callback);
			},	
			
			getFlowLogData() {
				const self = this;
				const postData = {};		
				postData.searchItem = {
					parent_no:self.mainData.parentOrder[0].order_no,
					user_type:0
				};
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
				}else{
					postData.tokenFuncName = 'getProjectToken';
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.flowLogData.push.apply(self.flowLogData,res.info.data);
						for (var i = 0; i < self.flowLogData.length; i++) {
							self.hasPay += parseFloat(self.flowLogData[i].count)
						}
						self.lessMoney = (parseFloat(self.mainData.parentOrder[0].price) + parseFloat(self.hasPay)).toFixed(2)
					};
					console.log('self.mainData.price',self.mainData.price)
					console.log('5',parseFloat(self.flowLogData.count).toFixed(2))
				};
				self.$apis.flowLogGet(postData, callback);
			},	

		},
	};
</script>
<style>
	.title{padding-bottom: 30rpx;}
	.tex{padding-bottom: 20rpx;}
	.money{padding: 30rpx 4%;}
	textarea{ width: 100%;height: 300rpx; display: block; box-sizing: border-box; font-size: 28rpx; line-height: 44rpx; margin-bottom:30rpx;padding: 20rpx;background: #F5F5F5;}
	input{ width: 300rpx; height: 60rpx; line-height: 60rpx; text-align: right; display: block;}
</style>

 
