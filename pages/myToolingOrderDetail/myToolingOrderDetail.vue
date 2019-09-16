<template>
	<view>
		<view class="prolisbox">
			<view class="prolis" style="margin-top: 0;">
				<view class="datt">
					<view class="left">
						<view class="color2" style="margin-bottom: 10rpx;">订单编号：123356885555</view>
						<view class="color3">交易时间：2018-08-30</view>
					</view>
					<view class="state">等待确认</view>
				</view>
				<view class="twoCt" style="justify-content:flex-start">
					<view class="leftbox">
						<image src="../../static/images/shopping-img1.png"></image>
					</view>
					<view class="cont" style="width: 66%;">
						<view class="title avoidOverflow">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
						<view class="text avoidOverflow2">服务内容：欧式风、简约风、北美风、田园风</view>
						<view class="price priceM">59.00</view>
					</view>
				</view>
			</view>
		</view>
		<view class="f5H10"></view>
		
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
				<button type="button"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/myToolingOrderDetail_startReceipt/myToolingOrderDetail_startReceipt'}})">开始接单</button>
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
				<view class="okBtn" @click="webSelf.$Router.navigateTo({route:{path:'/pages/myToolingOrder_contract/myToolingOrder_contract'}})">确认合同</view>
			</view>
			<view>
				<view class="WorkbenchBtn" @click="webSelf.$Router.navigateTo({route:{path:'/pages/myWorkbench/myWorkbench'}})">工作台</view>
			</view>
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				webSelf: this,
				showView: false,
				score: '',
				wx_info: {},
				current:1,
				index:1
			}
		},

		methods: {
			change(current) {
				const self = this;
				if(current!=self.current){
					self.current = current
				}
			},
			changeone(index){
				const self=this;
				if(index!=self.index){
					self.index = index
				}
			},

			getMainData() {
				const self = this;
				self.$apis.userGet(postData, callback);
			}
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
	.WorkbenchBtn{width: 90%; margin: 20rpx auto; height:70rpx; line-height: 70rpx;text-align: center; background: #FFCB1E;border-radius: 10rpx;}
</style>
