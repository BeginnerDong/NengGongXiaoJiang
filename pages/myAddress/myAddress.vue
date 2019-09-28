<template>
	<view>
		<view class="myaddress-lis" v-for="(item,index) in mainData">
			<view class="name" @click="choose(index)">{{item.name}}
				<view class="numb">{{item.phone}}</view>
			</view>
			<view class="adrs" @click="choose(index)">{{item.city+item.detail}}</view>
			<view class="seltBox">
				<view class="L" :data-id="item.id" @click="updateAddress($event.currentTarget.dataset.id)">
					<image class="icon" :src="item.isdefault==1?'../../static/images/about-address-icon1.png':'../../static/images/about-address-icon4.png'"
					 alt=""></image>
					默认地址
				</view>
				<view class="R">
					<view class="child" :data-id="item.id" @click="Router.navigateTo({route:{path:'/pages/myAddressAdd/myAddressAdd?id='+$event.currentTarget.dataset.id}})">
						<image src="../../static/images/about-address-icon2.png" mode=""></image>
						编辑
					</view>
					<view class="child" :data-id="item.id" @click="deleteAddress($event.currentTarget.dataset.id)">
						<image src="../../static/images/about-address-icon3.png" mode=""></image>
						删除
					</view>
				</view>

			</view>
		</view>

		<view class="submitbtn" style="margin-top: 200rpx;">
			<button type="button" @click="Router.navigateTo({route:{path:'/pages/myAddressAdd/myAddressAdd'}})">添加地址</button>
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

			var res = self.$Token.getProjectToken(function() {
				self.$Utils.loadAll(['getMainData'], self)
			});
			if (res) {
				self.$Utils.loadAll(['getMainData'], self)
			};
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
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					} else {
						self.$Utils.showToast('没有更多了', 'none');
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.addressGet(postData, callback);
			},





			deleteAddress(id) {
				const self = this;
				const postData = {};
				postData.searchItem = {};
				postData.searchItem.id = id;
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res) {
						self.mainData = [];
						self.getMainData();
					}
				};
				self.$apis.addressDelete(postData, callback)
			},


			updateAddress(id) {
				const self = this;
				const postData = {};

				postData.tokenFuncName = 'getProjectToken';

				postData.searchItem = {};
				postData.searchItem.id = id;
				postData.data = {
					isdefault: 1
				}
				const callback = (res) => {
					if (res) {
						self.mainData = [];
						self.getMainData();
					}
				};
				self.$apis.addressUpdate(postData, callback);
			},




		}
	}
</script>

<style>
	page {
		background: #f5f5f5;
	}

	.myaddress-lis {
		padding: 30rpx 4%;
		margin-bottom: 20rpx;
		background: #fff;
		margin-bottom: 30rpx;
	}

	.myaddress-lis .name {
		font-size: 28rpx;
		color: #222;
	}

	.myaddress-lis .numb {
		margin-left: 30rpx;
		width: 300rpx;
		display: inline-block;
	}

	.myaddress-lis .adrs {
		font-size: 26rpx;
		color: #999;
		line-height: 40rpx;
		padding: 10rpx 0;
	}

	.seltBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 10rpx;
	}

	.seltBox .L {
		width: 30%;
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #999;
	}

	.seltBox .L .icon {
		width: 30rpx;
		height: 30rpx;
		display: inline-block;
		margin-right: 10rpx;
	}

	.seltBox .R {
		display: flex;
		align-items: center;
		width: 70%;
		justify-content: flex-end;
	}

	.seltBox .R .child {
		margin-left: 30rpx;
		display: flex;
		justify-content: flex-end;
		font-size: 24rpx;
		color: #999;
	}

	.seltBox .R image {
		width: 30rpx;
		height: 30rpx;
		display: block;
		margin-right: 8rpx;
	}
</style>
