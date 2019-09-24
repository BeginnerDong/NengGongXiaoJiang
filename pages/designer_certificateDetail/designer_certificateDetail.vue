<template>
	<view>
		<view class="caseSbmit">
			<view class="eidt-line">
				<view class="ll">证书名称：</view>
				<view class="rr">名称名称名称名称名称名称名称</view>
			</view>
			<view class="eidt-line">
				<view class="ll">获奖时间：</view>
				<view class="rr">2019年7月20日</view>
			</view>
			<view class="eidt-line">
				<view class="ll">上传证书：</view>
				<view class="rr upBook">
					<image class="bookPic" src="../../static/images/release-icon1.png" mode=""></image>
					<image class="bookPic" src="../../static/images/case-img.png" mode=""></image>
				</view>
			</view>
			
		</view>
		<view class="submitbtn" style="margin: 200rpx auto">
			<button type="submit" @click=" Router.navigateTo({route:{path:'/pages/designer_certificate/designer_certificate'}})">保存</button>
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
	.upBook{ display: flex;justify-content: flex-start; flex-wrap: wrap;}
	.upBook image{width: 150rpx; height: 150rpx; margin-right: 20rpx;}
	.bookPic{width: 150rpx; height: 150rpx; }
</style> 
