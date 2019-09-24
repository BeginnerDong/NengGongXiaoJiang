<template>
	<view>
		<view class="caseSbmit">
			<view class="eidt-line">
				<view class="ll">所在城市：</view>
				<view class="rr">西安市</view>
			</view>
			<view class="eidt-line">
				<view class="ll">房屋面积：</view>
				<view class="rr">150㎡</view>
			</view>
			<view class="eidt-line">
				<view class="ll">用工类型：</view>
				<view class="rr styleLis">
					<view class="item">
						<view class="icon"><image src="../../static/images/case-icon2.png" alt=""/></view>
						<view class="tit">建筑工</view>
					</view>
				</view>
			</view>
			<view class="eidt-line">
				<view class="ll">地址：</view>
				<view class="rr">陕西省西安市长安区街道</view>
			</view>
			<view class="eidt-line">
				<view class="ll">手机号码：</view>
				<view class="rr">18256654555</view>
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
				is_show:false,
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
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
	.caseSbmit .eidt-line .rr{text-align: right;}
	.styleLis{ width: 100%; display: flex; flex-wrap: wrap;justify-content: flex-end;}
	.styleLis .item{padding:0rpx 0 10rpx 30rpx;display: flex;justify-content: flex-end; align-items: center;}
	.styleLis .item .icon{  width: 36rpx;height: 36rpx; margin-right: 10rpx;font-size: 26rpx;}
	.styleLis .item .icon image{width: 100%;height: 100%; display: block;}
</style> 
