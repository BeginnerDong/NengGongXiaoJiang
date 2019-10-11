<template>
	<view>
		<view class="caseSbmit">
			<view class="eidt-line">
				<view class="ll">所在城市：</view>
				<view class="rr">{{mainData.passage1}}</view>
			</view>
			<view class="eidt-line">
				<view class="ll">房屋面积：</view>
				<view class="rr">{{mainData.keywords}}㎡</view>
			</view>
			<view class="eidt-line">
				<view class="ll">用工类型：</view>
				<view class="rr styleLis">
					<view class="item">
						<view class="icon"><image src="../../static/images/case-icon2.png" alt=""/></view>
						<view class="tit">{{mainData.title}}</view>
					</view>
				</view>
			</view>
			<view class="eidt-line">
				<view class="ll">地址：</view>
				<view class="rr">{{mainData.description}}</view>
			</view>
			<view class="eidt-line">
				<view class="ll">手机号码：</view>
				<view class="rr">{{mainData.phone}}</view>
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
			self.$Utils.loadAll(['getMainData'], self);
		},
		
		methods: {
			
			getMainData() {
				const self = this;
		
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id: 2,
					type:2,
					id:self.id
				};		
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
					}
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.messageGet(postData, callback);
			},

		},
	};
</script>

<style>
	@import "../../assets/style/caseSbmit.css";
	
	.caseSbmit .eidt-line .rr{text-align: right;}
	.styleLis{ width: 100%; display: flex; flex-wrap: wrap;justify-content: flex-end;}
	.styleLis .item{padding:0rpx 0 10rpx 30rpx;display: flex;justify-content: flex-end; align-items: center;}
	.styleLis .item .icon{  width: 36rpx;height: 36rpx; margin-right: 10rpx;font-size: 26rpx;}
	.styleLis .item .icon image{width: 100%;height: 100%; display: block;}
</style> 
