<template>
	<view class="pdlr4">
			<view class="myaddress-lis" v-for="(item,index) in mainData">
				<view class="adrs" @click="choose(index)">{{item.label[0].title}} <text class="color3 font12">{{item.type==1?'对私':'对公'}}</text></view>
				<view class="name" @click="choose(index)">**** **** **** {{item.number}}</view>
				<view class="seltBox">
					<view class="L" :data-id="item.id" @click="updateCard($event.currentTarget.dataset.id)">
						<image class="icon" :src="item.isdefault==1?'../../static/images/about-address-icon1.png':'../../static/images/about-address-icon4.png'"
						 alt=""></image>
						默认银行卡
					</view>
					<view class="R">
						<view class="child" :data-id="item.id" @click="Router.navigateTo({route:{path:'/pages/myBankListMsg/myBankListMsg?id='+$event.currentTarget.dataset.id}})"><image src="../../static/images/about-address-icon2.png" mode=""></image>编辑</view>
						<view class="child" :data-id="item.id" @click="deleteCard($event.currentTarget.dataset.id)"><image src="../../static/images/about-address-icon3.png" mode=""></image>删除</view>
					</view>
					
				</view>
			</view>
			
			
			<view class="submitbtn" style="margin-top: 200rpx;">
				<button type="button"  @click=" Router.navigateTo({route:{path:'/pages/myBankListMsg/myBankListMsg'}})">添加银行卡</button>
			</view>
			<view class="xieyiAlert" v-if="is_show">
				<view class="infor center" style="padding: 120rpx 30px;height: auto;border-radius: 10rpx;">
					<view class="colseBtn"  @click="deltAlert" style="top: 20rpx;right: 20rpx;left:auto;">×</view>
					<view class="tit font16" style="padding-bottom: 60rpx;">确认是否删除这个技能</view>
					<view class="btnB flexRowBetween">
						<view :class="num==1? 'on':''" @click="chage('1')">是</view>
						<view :class="num==2? 'on':''" @click="chage('2')">否</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				mainData: [],
				Router:this.$Router,
				choosedIndex: -1
			}
		},

		onLoad(options) {
			const self = this;	
			self.$Utils.loadAll(['getMainData'], self)
			
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

			choose(index) {
				const self = this;
				self.choosedIndex = index;
				uni.setStorageSync('choosedAddressData', self.mainData[index]);
				console.log('choosedIndex', self.choosedIndex);
			},

			getMainData() {
				const self = this;

				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.tokenFuncName = 'getThreeToken';
				postData.getAfter ={
					label:{			
						tableName:'Label',
						middleKey:'bank',
						key:'id',
						condition:'=',
						searchItem:{
							status:1,
						}
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
						for (var i = 0; i < self.mainData.length; i++) {
							self.mainData[i].number = self.mainData[i].number.substr(self.mainData[i].number.length-4)
						}
					} else {
						self.$Utils.showToast('没有更多了', 'none');
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.cardGet(postData, callback);
			},





			deleteCard(id) {
				const self = this;
				uni.showModal({
				    title: '提示',
				    content: '确认是否删除这张银行卡',
				    success: function (res) {
				        if (res.confirm) {
				            const postData = {};
				            postData.searchItem = {};
				            postData.searchItem.id = id;
				            postData.tokenFuncName = 'getThreeToken';
				            const callback = (res) => {
				            	if (res) {
				            		self.mainData = [];
				            		self.getMainData();
				            	}
				            };
				            self.$apis.cardDelete(postData, callback)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});				
			},


			updateCard(id) {
				const self = this;
				const postData = {};

				postData.tokenFuncName = 'getThreeToken';

				postData.searchItem = {};
				postData.searchItem.id = id;
				postData.data = {
					isdefault: 1
				}
				const callback = (res) => {
					if (res.solely_code==100000) {
						self.mainData = [];
						self.getMainData();
					}else{
						self.$Utils.showToast(res.msg, 'none');
					}
				};
				self.$apis.cardUpdate(postData, callback);
			},




		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	page{ background: #f5f5f5;}
	.myaddress-lis{padding:30rpx;margin-bottom: 20rpx;background: #fff; margin-bottom: 30rpx;border-radius: 10rpx; margin-top: 30rpx;}
	.myaddress-lis .name{ font-size: 28rpx; color: #222;padding: 10rpx 0;}
	.myaddress-lis .adrs{ font-size: 26rpx;color: #999; line-height: 40rpx;}
	.seltBox{ display: flex;justify-content: space-between; align-items: center;padding-top: 10rpx;}
	.seltBox .L{ width: 30%; display: flex; align-items: center; font-size: 24rpx; color: #999;}
	.seltBox .L .icon{ width: 30rpx; height: 30rpx; display: inline-block; margin-right: 10rpx;}
	.seltBox .R{display: flex; align-items: center; width: 70%; justify-content: flex-end;}
	.seltBox .R .child{margin-left: 30rpx; display: flex; justify-content: flex-end; font-size: 24rpx; color: #999;}
	.seltBox .R image{  width:30rpx; height: 30rpx; display:block; margin-right: 8rpx;}
	
	.btnB{ width: 60%;margin: 0 auto;}
	.btnB view{width: 100rpx; line-height: 50rpx; height: 50rpx;border-radius: 30rpx;border:2rpx solid #626262;}
	.btnB view.on{background: #626262;color: #fff;}
</style>
