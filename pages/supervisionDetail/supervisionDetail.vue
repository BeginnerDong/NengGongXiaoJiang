<template>
	<view>
		<view class="detailxqBan">
			<image src="../../static/images/details-img1.png" mode=""></image>
		</view>
		
		<view class="designXq_name pdlr4" style="margin-top: -60rpx;">
			<view class="lis1">
				<view>
					<image class="photo" src="../../static/images/details-img3.png" mode=""></image>
				</view>
				<view class="cont"  style=" margin-top: 70rpx;">
					<view class="flex namebox">
						<view class="font13">张三</view>
						<view class="flexRowBetween starClass">
							<view class="starBox">
								<image src="../../static/images/home-supervision-icon1.png" mode=""></image>
								<image src="../../static/images/home-supervision-icon1.png" mode=""></image>
								<image src="../../static/images/home-supervision-icon1.png" mode=""></image>
								<image src="../../static/images/home-supervision-icon2.png" mode=""></image>
								<image src="../../static/images/home-supervision-icon3.png" mode=""></image>
							</view>
							<view>9.5分</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="infor-title">
			<view class="xian"></view>
			<view class="tt">监理介绍</view>
		</view>
		<view class="xqInfor">
			<view class="cont">
				<view>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
				<view>
					<image src="../../static/images/about-img1.png" mode="widthFix"></image>
					<image src="../../static/images/about-img1.png" mode="widthFix"></image>
				</view>
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
				score:'',
				wx_info:{},
				is_show:false,
				imgUrls: [
					"../../static/images/home-banenr.png",
					"../../static/images/details-img1.png"
				],
				designPjLis:[
					{},{},{},{}
				]
			}
		},

		onLoad() {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self);
		},

		methods: {
			getMainData() {
				const self = this;
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
			
			}
		}
	}
</script>

<style>
	@import "../../assets/style/index.css";
	@import "../../assets/style/quill.css";
</style>
