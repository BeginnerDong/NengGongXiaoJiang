<template>
	<view>
		<view class="myExtendTop">
			<view class="money" style="color: #222;font-weight: normal;">5600</view>
			<view class="yuan">账户余额</view>
			<view class="txBtn" @click=" Router.navigateTo({route:{path:'/pages/myCashOut/myCashOut'}})">提现</view>
			<!-- myCashOut -->
		</view>
		<view class="f5H5">
			
		</view>
		
		<!-- <view class="tooling_indNav">
			<view class="list">
				<view class="item" :class="num==1?'on':''" @click="change('1')">推广赏金</view>
				<view class="item" :class="num==2?'on':''" @click="change('2')">推广海报</view>
			</view>
		</view> -->
		<view class="orderNav">
			<view class="tt" :class="num==1?'on':''" @click="change('1')">提现</view>
			<view class="tt" :class="num==2?'on':''" @click="change('2')">收入</view>
		</view>
		
		
		<view class="finance_indTab" v-if="num==1">
			<view class="item flexRowBetween">
				<view class="left">
					<view class="tit font14">提现</view>
					<view class="time">2019/03/12</view>
				</view>
				<view class="right">
					<view class="tit font12">提现成功</view>
					<view class="price">-235</view>
				</view>
			</view>
			<view class="item flexRowBetween">
				<view class="left">
					<view class="tit font14">提现</view>
					<view class="time">2019/03/12</view>
				</view>
				<view class="right">
					<view class="tit font12">提现失败</view>
					<view class="price">235</view>
				</view>
			</view>
			<view class="item flexRowBetween">
				<view class="left">
					<view class="tit font14">提现</view>
					<view class="time">2019/03/12</view>
				</view>
				<view class="right">
					<view class="tit font12">审核中</view>
					<view class="price">-235</view>
				</view>
			</view>
		</view>
		<view class="finance_indTab" v-if="num==2">
			<view class="item flexRowBetween">
				<view class="left">
					<view class="tit font14">张丹</view>
					<view class="time">2019/03/12</view>
				</view>
				<view class="right">
					<view class="tit font12">订单名称</view>
					<view class="red">+235</view>
				</view>
			</view>
			<view class="item flexRowBetween">
				<view class="left">
					<view class="tit font14">张丹</view>
					<view class="time">2019/03/12</view>
				</view>
				<view class="right">
					<view class="tit font12">订单名称</view>
					<view class="red">+235</view>
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
				score:'',
				wx_info:{},
				num:1,
				rewardData:[
					{},{},{}
				]
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			change(num){
				const self = this;
				if(num!= self.num){
					self.num = num
				}
			},
			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';

				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data;
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMainData');

				};
				self.$apis.orderGet(postData, callback);

			},

		},
	};
</script>

<style>
	@import "../../assets/style/user.css";
	.orderNav .tt{width: 50%;}
	.finance_indTab .item{padding:30rpx 4%;border-bottom: 2rpx solid #E7E7E7;}
	.finance_indTab .item .tit{margin-bottom: 14rpx; line-height: 40rpx;}
	.finance_indTab .item .left,.finance_indTab .item .right{width: 50%;box-sizing: border-box;}
	.finance_indTab .item .left .tit{color: #222;}
	.finance_indTab .item .time{color: #999; font-size: 26rpx;}
	.finance_indTab .item .right{text-align: right;}
	.finance_indTab .item .right .tit{color: #666;}
</style>
