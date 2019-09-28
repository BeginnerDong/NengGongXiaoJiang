<template>
	<view>
		<view class="tooling_indNav">
			<view class="list">
				<view class="item" :class="index==1?'on':''" @click="changeone('1')">工人订单</view>
				<view class="item" :class="index==2?'on':''" @click="changeone('2')">设计订单</view>
				<view class="item" :class="index==3?'on':''" @click="changeone('3')">定制订单</view>
			</view>
		</view>
		<view class="orderNav">
			<view class="tt" :class="current==1?'on':''" @click="change('1')">全部</view>
			<view class="tt" :class="current==2?'on':''" @click="change('2')">待确认</view>
			<view class="tt" :class="current==3?'on':''" @click="change('3')">进行中</view>
			<view class="tt" :class="current==4?'on':''" @click="change('4')">已完成</view>
		</view>
		<view class="prolisbox pdlr4">
			<view class="prolis boxShaow" v-if="index==1">
				<view class="datt">
					<view class="left">
						<view class="color2" style="margin-bottom: 10rpx;">订单编号：123356885555</view>
						<view class="color3">交易时间：2018-08-30</view>
					</view>
					<view class="state">等待支付</view>
				</view>
				<view class="twoCt">
					<view class="leftbox">
						<image src="../../static/images/shopping-img1.png"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
						<view class="text avoidOverflow2">服务内容：欧式风、简约风、北美风、田园风</view>
						<view class="price priceM">59</view>
					</view>
				</view>
				<view class="bBtn">
					<view class="btn"  @click=" Router.navigateTo({route:{path:'/pages/myToolingOrderDetail/myToolingOrderDetail'}})">查看详情</view>
				</view>
			</view>
			
			<view class="prolis boxShaow"  v-if="index==2">
				<view class="datt">
					<view class="left">
						<view class="color2" style="margin-bottom: 10rpx;">订单编号：123356885555</view>
						<view class="color3">交易时间：2018-08-30</view>
					</view>
					<view class="state">等待支付</view>
				</view>
				<view class="twoCt">
					<view class="leftbox">
						<image src="../../static/images/shopping-img1.png"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
						<view class="text avoidOverflow2">服务内容：欧式风、简约风、北美风、田园风</view>
						<view class="price priceM">59</view>
					</view>
				</view>
				<view class="bBtn">
					<view class="btn"  @click=" Router.navigateTo({route:{path:'/pages/myToolingOrderComment/myToolingOrderComment'}})">去评价</view>
					<view class="btn"  @click=" Router.navigateTo({route:{path:'/pages/myToolingOrderDetail/myToolingOrderDetail'}})">查看详情</view>
				</view>
			</view>
			
			<view class="prolis prolis3 boxShaow"  v-if="index==3">
				<view class="datt">
					<view class="left">
						<view class="color2" style="margin-bottom: 10rpx;">订单编号：123356885555</view>
						<view class="color3">交易时间：2018-08-30</view>
					</view>
					<view class="state">等待支付</view>
				</view>
				<view class="twoCt">
					<view class="leftbox">
						<image src="../../static/images/shopping-img1.png"></image>
					</view>
					<view class="cont">
						<view class="title avoidOverflow">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
						<view class="tex font12 color2 avoidOverflow">类型：橱柜</view>
						<view class="tex font12 color2 avoidOverflow">风格：简约风</view>
					</view>
				</view>
				<view class="bBtn">
					<view class="btn"  @click=" Router.navigateTo({route:{path:'/pages/myTooling_madeDetail/myTooling_madeDetail'}})">查看详情</view>
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

	.prolis3 .cont{padding: 20rpx 0;box-sizing: border-box;}
	.prolis3 .tex{margin-top: 20rpx;}
</style>
