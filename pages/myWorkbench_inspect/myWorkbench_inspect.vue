<template>
	<view>
		<view class="pdlr4" style="padding-top: 40rpx;">
			<view class="font15 title">工作进度</view>
			<textarea placeholder="请输入工作进度" v-model="submitData.description" :disabled="type==1?false:true"></textarea>
		</view>
		<view class="f5H5"></view>
		<view class="flexRowBetween money">
			<view>尾款余额</view>
			<view class="price">{{lessMoney}}</view>
		</view>
		<view class="f5H5"></view>
		
		<view class="submitbtn" style="margin-top: 200rpx;" v-if="type==0">
			<button type="submit" @click="pay()">确认验收</button>
		</view>
		<view class="submitbtn" style="margin-top: 200rpx;" v-if="type==1">
			<button type="submit" @click="Utils.stopMultiClick(submit)">申请验收</button>
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
					type:4
				},
				Utils:this.$Utils,
				mainData:{},
				type:'',
				
				lessMoney:0,
				distriData:[],
				hasPay:0,
				flowLogData:[]
			}
		},
		
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.type=options.type;
			console.log('options',options)
			const callback = (res) =>{
				self.$Utils.loadAll(['getMainData'], self)	
			};
			self.$Token.getProjectToken(callback,{refreshToken:true})
			
		},
		
		methods: {
			
			
			pay() {
				const self = this;
				var reward = uni.getStorageSync('user_info').thirdApp.custom_rule.reward/100;
				if(self.mainData.type==1){
					var tax = uni.getStorageSync('user_info').thirdApp.custom_rule.work_tax/100
				}else if(self.mainData.type==2){
					var tax = uni.getStorageSync('user_info').thirdApp.custom_rule.design_tax/100
				}
				
				const postData = {};	
				postData.wxPay = {
					price:self.lessMoney
				};
				postData.tokenFuncName = 'getProjectToken',
				postData.searchItem = {
					id: self.id
				};
				postData.payAfter = [
					{
						tableName: 'Process',
						FuncName: 'add',
						data: {
							type: 1,
							order_no: self.mainData.order_no,
							title:'用户已确认验收',
							price:self.lessMoney
						}
					},
					{
						tableName: 'Order',
						FuncName: 'update',
						data: {
							transport_status:2
						},
						searchItem:{
							id:self.id
						}
					},
					{
						tableName: 'FlowLog',
						FuncName: 'add',
						data: {
							user_no:self.mainData.shop_no,
							type:2,
							count:self.workPrice - self.workPrice*tax,
							thirdapp_id:2,
							trade_info:'人工费',
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
							count:self.workPrice*tax,
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
								count:(self.workPrice - self.workPrice*tax)*reward,
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
			
			processAdd() {
				const self = this;
				const postData = {};
				
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				if(self.type==1){
					postData.tokenFuncName = 'getThreeToken';
					postData.data.title = '工人发起申请验收'
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
					shopInfo:{
						tableName:'UserInfo',
						middleKey:'shop_no',
						key:'user_no',
						condition:'=',
						searchItem:{
							status:1
						}
					},	
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
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData=res.info.data[0];
						self.submitData.order_no = self.mainData.order_no;
						if(self.type==0){
							self.getProcessData()
						};
						self.workPrice = 0;
						for (var i = 0; i < self.mainData.products.length; i++) {
							if(self.mainData.products[i].behavior==1){
								self.workPrice += self.mainData.products[i].price * self.mainData.products[i].count;		
							};
						};
						self.getFlowLogData()
						self.getDistriData()
					} else {
						self.$Utils.showToast(res.msg,'none');
					};
					
					console.log(self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},	
			
			getFlowLogData() {
				const self = this;
				const postData = {};		
				postData.searchItem = {
					order_no:self.mainData.parentOrder[0].order_no,
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
						self.lessMoney = (parseFloat(self.mainData.price) + parseFloat(self.hasPay)).toFixed(2)
					};
					console.log('self.mainData.price',self.mainData.price)
					console.log('5',parseFloat(self.flowLogData.count).toFixed(2))
				};
				self.$apis.flowLogGet(postData, callback);
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
					type:4,
					user_no:['in',[self.mainData.user_no,self.mainData.shop_no]],
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
					} 
				};
				self.$apis.processGet(postData, callback);
			},	

		},
	};
</script>
<style>
	textarea{ width: 100%;height: 350rpx; display: block; box-sizing: border-box; font-size: 28rpx; line-height: 44rpx; margin-bottom: 20rpx;padding: 20rpx;background: #F5F5F5;}
	.title{padding-bottom: 30rpx;}
	.tex{padding-bottom: 20rpx;}
	.money{padding: 30rpx 4%;}
</style>

 
