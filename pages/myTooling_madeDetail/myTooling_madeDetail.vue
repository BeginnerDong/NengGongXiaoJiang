<template>
	<view>
		<view class="prolisbox">
			<view class="prolis prolis3" style="margin-top: 0;">
				<view class="datt">
					<view class="left">
						<view class="color2" style="margin-bottom: 10rpx;">订单编号：{{mainData.order_no}}</view>
						<view class="color3">交易时间：{{mainData.create_time}}</view>
					</view>
					<view class="state" v-if="mainData.transport_status==0">待确认</view>
					<view class="state" v-if="mainData.transport_status==1">进行中</view>
					<view class="state" v-if="mainData.transport_status==2">已完成</view>
				</view>
				<view class="twoCt" style="justify-content:flex-start">
					<view class="leftbox">
						<image :src="mainData.products&&mainData.products[0]&&mainData.products[0].snap_product&&mainData.products[0].snap_product.mainImg&&mainData.products[0].snap_product.mainImg[0]?mainData.products[0].snap_product.mainImg[0].url:''"></image>
					</view>
					<view class="cont" style="width: 66%;">
						<view class="title avoidOverflow">{{mainData.products&&mainData.products[0]?mainData.products[0].snap_product.title:''}}</view>
						<view class="tex font12 color2 avoidOverflow">
							类型：{{mainData.products&&mainData.products[0]&&mainData.products[0].snap_product&&mainData.products[0].snap_product.label&&mainData.products[0].snap_product.label[mainData.products[0].snap_product.category_id]?mainData.products[0].snap_product.label[mainData.products[0].snap_product.category_id].title:''}}
						</view>
						<view class="tex font12 color2 avoidOverflow">风格：{{mainData.products&&mainData.products[0]?mainData.products[0].snap_product.description:''}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="f5H10"></view>
		
		
		<view class="infor-title flexRowBetween" style="padding-bottom: 30rpx;">
			<view class="xian"></view>
			<view class="tt">所需材料</view>
		</view>
		<view class="mglr4 myStuffList boxShaow">
			<view class="item flexRowBetween" v-for="item in mainData.products" v-if="item.behavior==2">
				<view class="title">{{item.snap_product.title}}</view>
				<view class="infor flexRowBetween" >
					<view class="lis left">{{item.snap_product.passage1}}</view>
					<view class="lis center">×{{item.count}}</view>
					<view class="lis right red">{{item.snap_product.price}}元/个</view>
				</view>
			</view>
			
			<view class="item flexRowBetween">
				<view class="title">人工费</view>
				<view class="infor flexRowBetween">
					<view class="lis right red">{{mainData.products&&mainData.products[0]?mainData.products[0].price:''}}元</view>
				</view>
			</view>
			<view class="item flexRowBetween">
				<view class="title">总计</view>
				<view class="infor flexRowBetween">
					<view class="lis right red">{{mainData.price}}元</view>
				</view>
			</view>
		</view>
		
		<view class="submitbtn" style="margin-top: 100rpx;" v-if="mainData.transport_status==0">
			<button type="submit" style="margin-bottom: 20rpx;" @click="xieyiAlert">确认</button>
		</view>
		<view class="submitbtn" style="margin-top: 100rpx;" v-if="mainData.transport_status==1">
			<button type="submit" style="margin-bottom: 20rpx;" @click="orderUpdate">确认验收</button>
		</view>
		<view class="xieyiAlert" v-if="is_show">
			<view class="infor">
				<view class="submitbtn" style="background: #fff;position: absolute; bottom:0rpx;left: 0; width: 100%;box-sizing: border-box;">
					<button type="button" @click="pay" style="margin-bottom: 40rpx;">确认</button>
				</view>
				<view class="cont">
					<view class="tit">{{artData.title}}</view>
					<view class="content ql-editor" v-html="artData.content">
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
				Router:this.$Router,
				mainData:{},
				Utils:this.$Utils,
				is_show:false,
				artData:{}
			}
		},
		
		onLoad(options) {
			const self = this;
			self.id = options.id;
			const callback = (res) =>{
				self.$Utils.loadAll(['getMainData','getArtData'], self)		
			};
			self.$Token.getProjectToken(callback,{refreshToken:true})
				
		},

		methods: {
			
			orderUpdate() {
				const self = this;
				var ratio = uni.getStorageSync('user_info').thirdApp.custom_rule.customize_in/100;
				var tax = uni.getStorageSync('user_info').thirdApp.custom_rule.customize_tax/100;
				var reward = uni.getStorageSync('user_info').thirdApp.custom_rule.reward/100;
				var lessPrice = parseFloat(self.mainData.price) - self.mainData.price*ratio;
				const postData = {};
				postData.searchItem = {
					order_no: self.mainData.order_no,
					user_type: 0
				};
				postData.data = {
					transport_status: 2
				};
				postData.tokenFuncName = 'getProjectToken';
				postData.saveAfter = [
					{
						tableName: 'FlowLog',
						FuncName: 'add',
						data: {
							user_no:self.mainData.shop_no,
							type:2,
							count:lessPrice - lessPrice*tax,
							thirdapp_id:2,
							trade_info:'尾款',
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
							count:lessPrice*tax,
							thirdapp_id:2,
							trade_info:'平台抽成',
							relation_user:self.mainData.shop_no,
							relation_id:self.id
						}
					}
				];		
				if(self.distriData.length>0&&self.mainData.shopInfo[0].behavior<4){
					postData.saveAfter.push(
						{
							tableName: 'FlowLog',
							FuncName: 'add',
							data: {
								user_no:self.distriData[0].parent_no,
								type:2,
								count:(lessPrice - lessPrice*tax)*reward,
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
						self.$Utils.showToast(res.msg, 'none');
						self.getMainData()
					} else {
						self.$Utils.showToast(res.msg, 'none');
					}
				};
				self.$apis.orderUpdate(postData, callback);
			},
			
			pay() {
				const self = this;
				var ratio = uni.getStorageSync('user_info').thirdApp.custom_rule.customize_in/100;
				var tax = uni.getStorageSync('user_info').thirdApp.custom_rule.customize_tax/100;
				var reward = uni.getStorageSync('user_info').thirdApp.custom_rule.reward/100;
				const postData = {};	
				postData.wxPay = {
					price:self.mainData.price
				};
				postData.tokenFuncName = 'getProjectToken',
				postData.searchItem = {
					id: self.id
				};
				postData.payAfter = [
					
					{
						tableName: 'Order',
						FuncName: 'update',
						data: {
							transport_status:1
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
							count:self.mainData.price*ratio - (self.mainData.price*ratio)*tax,
							thirdapp_id:2,
							trade_info:'首款',
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
							count:(self.mainData.price*ratio)*tax,
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
								count:(self.mainData.price*ratio - self.mainData.price*tax)*reward,
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
									self.is_show = false;
									self.getMainData()
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
			
			xieyiAlert(){
				const self = this;
				self.is_show=!self.is_show;
			},
			
			
			getArtData() {
				const self = this;			
				const postData = {};
			
				postData.searchItem = {
					thirdapp_id:2,
				};
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['购买协议']],
						},
						middleKey: 'menu_id',
						key: 'id',
						condition: 'in',
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.artData = res.info.data[0];
						const regex = new RegExp('<img', 'gi');
						self.artData.content = self.artData.content.replace(regex, `<img style="max-width: 100%;"`);
					}
					console.log('self.artData',self.artData)
					self.$Utils.finishFunc('getArtData');
				};
				self.$apis.articleGet(postData, callback);
			},

			getMainData() {
				const self = this;
				const postData = {};	
				postData.searchItem = {
					id:self.id,
					user_type:0
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
				};
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData=res.info.data[0];
					} else {
						self.$Utils.showToast(res.msg,'none');
					};
					self.getDistriData()
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
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	page{padding-bottom: 80rpx;}
	.tooling_indNav{padding: 30rpx 4%;background: #f5f5f5;}
	.tooling_indNav .list{background: #fff; border-radius: 10rpx;overflow: hidden; display: flex;justify-content: center; align-items: center;}
	.tooling_indNav .list .item{width: 33.3%;box-sizing: border-box;text-align: center;padding: 0 10rpx;color: #666;line-height: 70rpx;border-right: 2rpx solid #e7e7e7;}
	.tooling_indNav .list .item.on{background: #FFCB1E;}
	.tooling_indNav .list .item:last-child{border-right: 0;}
	.prolis3 .cont{padding: 20rpx 0;box-sizing: border-box;}
	.prolis3 .tex{margin-top: 20rpx;}
	
	.myStuffList{border-radius: 10rpx;overflow: hidden;}
	.myStuffList .item{padding: 30rpx 4%;border-bottom: 2rpx solid #E7E7E7;}
	.myStuffList .item:last-child{border-bottom: none;}
	.myStuffList .item .title{width: 30%;}
	.myStuffList .infor{ width: 70%; font-size: 26rpx; justify-content: flex-end;}
	.myStuffList .infor .lis{width: 33.3%;box-sizing: border-box;padding: 0 20rpx;text-align: right;}
	
</style>
