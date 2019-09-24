<template>
	<view>
		<view class="prolisbox">
			<view class="prolis" style="margin-top: 0;">
				<view class="datt">
					<view class="left">
						<view class="color2" style="margin-bottom: 10rpx;">订单编号：123356885555</view>
						<view class="color3">交易时间：2018-08-30</view>
					</view>
					<view class="state">进行中</view>
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
		<view class="f5H5"></view>
		
		<view class="fabubtn" style="top: 460rpx;right:20rpx">
			<view class="icon">
				<image src="../../static/images/about-order-details-icon1.png" mode=""></image>
			</view>
			<view class="tit">联系客服</view>
		</view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">客户信息</view>
		</view>
		<view class="caseSbmit">
			<view class="eidt-line flexRowBetween">
				<view class="ll">姓名：</view>
				<view class="rr">张丹</view>
			</view>
			<view class="eidt-line">
				<view class="ll">电话：</view>
				<view class="rr">15236202032</view>
			</view>
		</view>
		
		<view class="f5H5"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">工人信息</view>
		</view>
		<view class="caseSbmit">
			<view class="eidt-line flexRowBetween">
				<view class="ll">姓名：</view>
				<view class="rr">赵佩</view>
			</view>
			<view class="eidt-line">
				<view class="ll">电话：</view>
				<view class="rr">15802956234</view>
			</view>
		</view>
		
		<view class="f5H5"></view>
		<view class="infor-title flexRowBetween" style="padding-bottom: 50rpx;">
			<view class="xian"></view>
			<view class="tt">订单状态</view>
		</view>
		
		
		<view class="tooling_detail mglr4">
			<view class="infor">
				<image class="dian" src="../../static/images/about-order-details-icon2.png" mode=""></image>
				<view class="data color2">2019/5/30 16:56:56</view>
				<view class="title">工人抗瑞上传</view>
				<view class="list">
					<view class="lname">面积：</view>
					<view class="rCont">
						<view class="yy flexRowBetween">
							<view class="xx flex">
								<view>156/㎡</view>
							</view>
						</view>
					</view>
				</view>
				<view class="list">
					<view class="lname">辅料：</view>
					<view class="rCont">
						<view class="yy flexRowBetween">
							<view class="xx flex">
								<view>水泥</view>
								<view class="price">56/袋</view>
								<view>1吨</view>
							</view>
						</view>
						<view class="yy flexRowBetween">
							<view class="xx flex">
								<view>地板</view>
								<view class="price">22/块</view>
								<view>80*80 16块</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="infor">
				<image class="dian" src="../../static/images/about-order-details-icon2.png" mode=""></image>
				<view class="data color2">2019/5/30 16:56:56</view>
				<view class="title">用户张三已确认</view>
				<view class="list">
					<view class="lname">面积：</view>
					<view class="rCont">
						<view class="yy flexRowBetween">
							<view class="xx flex">
								<view>156/㎡</view>
							</view>
						</view>
					</view>
				</view>
				<view class="list">
					<view class="lname">辅料：</view>
					<view class="rCont">
						<view class="yy flexRowBetween">
							<view class="xx flex">
								<view>水泥</view>
								<view class="price">56/袋</view>
								<view>1吨</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="infor">
				<image class="dian" src="../../static/images/about-order-details-icon2.png" mode=""></image>
				<view class="data color2">2019/5/30 16:56:56</view>
				<view class="title">用户张三确认合同</view>
			</view>
			<view class="infor">
				<image class="dian" src="../../static/images/about-order-details-icon2.png" mode=""></image>
				<view class="data color2">2019/5/30 16:56:56</view>
				<view class="title">工人刘丹确认合同</view>
			</view>
		</view>
		
		<view class="threeBtn flexRowBetween">
			<view class="itm" @click=" Router.navigateTo({route:{path:'/pages/supervisorOrderDetail_unit/supervisorOrderDetail_unit'}})">面积及辅料</view>
			<view class="itm" @click=" Router.navigateTo({route:{path:'/pages/myWorkbench_daka/myWorkbench_daka'}})">打卡</view>
			<view class="itm" @click=" Router.navigateTo({route:{path:'/pages/myWorkbench_database/myWorkbench_database'}})">资料库</view>
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				showView: false,
				score: '',
				wx_info: {},
				current:1,
				index:1
			}
		},

		methods: {
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
	.tooling_detail{padding-bottom: 60rpx;}
	
	.caseSbmit .eidt-line{justify-content: flex-start;}
	.caseSbmit .eidt-line .ll{width: 120rpx;}
	.caseSbmit .eidt-line:last-child{border-bottom: 0rpx;}
	.threeBtn{ padding: 60rpx 4%;}
	.threeBtn .itm{width: 31%; line-height: 70rpx;text-align: center;background: #FFCB1E; border-radius: 10rpx;font-size: 26rpx;}
</style>
