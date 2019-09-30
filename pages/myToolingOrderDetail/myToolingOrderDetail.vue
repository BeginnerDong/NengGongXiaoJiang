<template>
	<view>
		<view class="prolisbox">
			<view class="prolis" style="margin-top: 0;">
				
				<view class="datt">
					<view class="left">
						<view class="color2" style="margin-bottom: 10rpx;">订单编号：{{mainData.order_no}}</view>
						<view class="color3">交易时间：{{mainData.create_time}}</view>
					</view>
					<view class="state" v-if="mainData.transport_status==0">待确认</view>
					<view class="state" v-if="mainData.transport_status==1">进行中</view>
					<view class="state" v-if="mainData.transport_status==2">已完成</view>
				</view>
				<view class="twoCt">
					<view class="leftbox">
						<image 
						:src="mainData.userInfo&&mainData.userInfo[0]&&mainData.userInfo[0].mainImg&&mainData.userInfo[0].mainImg[0]?mainData.userInfo[0].mainImg[0].url:''"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow">{{mainData.products&&mainData.products[0]&&mainData.products[0].snap_product?mainData.products[0].snap_product.title:''}}</view>
						<view class="text avoidOverflow2">{{mainData.userInfo&&mainData.userInfo[0]?mainData.userInfo[0].introduce:''}}</view>
						<view class="price priceM">{{mainData.price}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="f5H5"></view>
		
		<view class="fabubtn" style="top: 460rpx;right:20rpx">
			<view class="icon">
				<image src="../../static/images/about-order-details-icon1.png" mode=""></image>
			</view>
			<view class="tit">联系客服</view>
		</view>
		
		<view class="infor-title flexRowBetween" style="padding-bottom: 50rpx;">
			<view class="xian"></view>
			<view class="tt">订单状态</view>
		</view>
		
		<!-- 无数据时显示 -->
		<view class="noDataBox">
			<image src="../../static/images/img.png" mode=""></image>
			<view class="submitbtn" style="margin-top: 80rpx;">
				<button type="button"  @click="Router.navigateTo({route:{path:'/pages/myToolingOrderDetail_startReceipt/myToolingOrderDetail_startReceipt'}})">开始接单</button>
			</view>
		</view>
		
		<!-- 无数据时显示 end -->
		
		<view class="tooling_detail mglr4">
			<view class="infor">
				<image class="dian" src="../../static/images/about-order-details-icon2.png" mode=""></image>
				<view class="data color2">2019/5/30 16:56:56</view>
				<view class="title">工人抗瑞上传</view>
				<view class="list">
					<view class="lname">工程内容：</view>
					<view class="rCont">
						<view class="yy flexRowBetween">
							<view class="xx flex">
								<view>平整铺砖</view>
								<view class="price priceM">25</view>
								<view>200㎡</view>
							</view>
						</view>
						<view class="yy flexRowBetween">
							<view class="xx flex">
								<view>地面砖</view>
								<view class="price priceM">12</view>
								<view>200㎡</view>
							</view>
							<view class="deltBtn">删除</view>
						</view>
					</view>
				</view>
				<view class="list">
					<view class="lname">辅料：</view>
					<view class="rCont">
						<view class="yy flexRowBetween">
							<view class="xx flex">
								<view>水泥</view>
								<view class="price">10元</view>
								<view>10袋</view>
							</view>
							<view class="deltBtn">删除</view>
						</view>
						<view class="yy flexRowBetween">
							<view class="xx flex">
								<view>地板</view>
								<view class="price">2元</view>
								<view>100片</view>
							</view>
							<view class="deltBtn">删除</view>
						</view>
					</view>
				</view>
			</view>
			<view class="infor">
				<image class="dian" src="../../static/images/about-order-details-icon2.png" mode=""></image>
				<view class="data color2">2019/5/30 16:56:56</view>
				<view class="title">工人抗瑞上传</view>
				<view class="list">
					<view class="lname">工程内容：</view>
					<view class="rCont">
						<view class="yy flexRowBetween">
							<view class="xx flex">
								<view>平整铺砖</view>
								<view class="price priceM">25</view>
								<view>200㎡</view>
							</view>
						</view>
						<view class="yy flexRowBetween">
							<view class="xx flex">
								<view>地面砖</view>
								<view class="price priceM">12</view>
								<view>200㎡</view>
							</view>
							<view class="deltBtn">删除</view>
						</view>
					</view>
				</view>
				<view class="list">
					<view class="lname">辅料：</view>
					<view class="rCont">
						<view class="yy flexRowBetween">
							<view class="xx flex">
								<view>水泥</view>
								<view class="price">10元</view>
								<view>10袋</view>
							</view>
							<view class="deltBtn">删除</view>
						</view>
						<view class="yy flexRowBetween">
							<view class="xx flex">
								<view>地板</view>
								<view class="price">2元</view>
								<view>100片</view>
							</view>
							<view class="deltBtn">删除</view>
						</view>
					</view>
				</view>
			</view>
			<view class="allMoney">
				总价：<text class="price">2000</text><view class="btn">确认</view>
			</view>
			<view class="">
				<view class="okBtn" @click=" Router.navigateTo({route:{path:'/pages/myToolingOrder_contract/myToolingOrder_contract'}})">确认合同</view>
			</view>
			<view>
				<view class="WorkbenchBtn" @click=" Router.navigateTo({route:{path:'/pages/myWorkbench/myWorkbench'}})">工作台</view>
			</view>
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				mainData:{}
			}
		},
		
		onLoad(options) {
			const self = this;
			self.id = options.id;
		
			self.$Utils.loadAll(['getMainData'], self)		
		},

		methods: {
			

			getMainData() {
				const self = this;
				const postData = {};
				
				postData.searchItem = {
					id:self.id
				};
				postData.tokenFuncName = 'getProjectToken';
				postData.getAfter = {
					userInfo:{
						tableName:'UserInfo',
						middleKey:'shop_no',
						key:'user_no',
						condition:'=',
						searchItem:{
							status:1
						}
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData=res.info.data[0];
					} else {
						self.$Utils.showToast(res.msg,'none');
					};
					console.log(self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	page{padding-bottom: 80rpx;}
	.WorkbenchBtn{width: 90%; margin: 20rpx auto; height:70rpx; line-height: 70rpx;text-align: center; background: #FFCB1E;border-radius: 10rpx;}
</style>
