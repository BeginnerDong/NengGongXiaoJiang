<template>
	<view>
		<view class="myExtendTop">
			<view class="money" style="color: #222;font-weight: normal;">{{userData.balance}}</view>
			<view class="yuan">账户余额</view>
			<view class="txBtn" @click=" Router.navigateTo({route:{path:'/pages/myCashOut/myCashOut?type=1'}})">提现</view>
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
			<view class="tt" :class="num==2?'on':''" @click="change('2')">收入{{num}}</view>
		</view>
		<view class="finance_indTab" v-if="num==1">
			<view class="item flexRowBetween" v-for="item in mainData">
				<view class="left">
					<view class="tit font14">提现</view>
					<view class="time">{{item.create_time}}</view>
				</view>
				<view class="right">
					<view class="tit font12">提现成功</view>
					<view class="price">{{item.count}}</view>
				</view>
			</view>
			
		</view>
		<view class="finance_indTab" v-if="num==2">
			<view class="item flexRowBetween" v-for="(item,index) in mainData">
				<view class="left">
					<view class="tit font14">{{item.trade_info}}</view>
					<view class="time">{{item.create_time}}</view>
				</view>
				<view class="right">
					<view class="tit font12">订单名称</view>
					<view class="red">+{{item.count}}</view>
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
				searchItem:{
					thirdapp_id:2,
					count:['<',0]
				},
				num:1,
				rewardData:[
					{},{},{}
				],
				userData:{},
				mainData:[]
			}
		},
		
		onLoad() {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getUserData','getMainData'], self);
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
			
			change(num){
				const self = this;
				if(num!= self.num){
					if(num==1){
						self.searchItem.count=['<',0]
					}else{
						self.searchItem.count=['>',0]
					}
					self.num = num
					self.getMainData(true)
				}
			},
			
			getUserData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.tokenFuncName = 'getThreeToken';
				postData.searchItem = {
					user_no:uni.getStorageSync('threeInfo').user_no
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.userData = res.info.data[0]
					} else {
						self.$Utils.showToast(res.msg, 'none');
					};
					self.$Utils.finishFunc('getUserData');	
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			getMainData(isNew) {
				const self = this;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						is_page: true,
						pagesize: 5
					}
				};
				const postData = {};
				postData.tokenFuncName = 'getThreeToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					}
					console.log('self.mainData',self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.flowLogGet(postData, callback);
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
