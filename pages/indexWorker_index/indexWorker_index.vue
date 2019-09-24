<template>
	<view>
		
		<view class="designXq_name pdlr4" style="margin-top: 0;padding: 30rpx 4%;">
			<view class="lis1">
				<view class="photo">
					<image src="../../static/images/gerenzhuye-img2.png" mode=""></image>
				</view>
				<view class="cont">
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
					<view class="text2 avoidOverflow2 color3 font13">工艺内容:项目、内容项目、内容项目、内容项目、内容项目、内容</view>
					<view class="flexRowBetween saleB">
						<view class="priceM font14">6</view>
						<view class="color3 font12">成交量：500</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">个人信息</view>
		</view>
		<view class="xqInfor">
			<view class="cont">
				<view>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">团队信息</view>
		</view>
		<view class="xqInfor">
			<view class="cont">
				<view>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">资质证书</view>
		</view>
		
		<view class="tejiaBox">
			<scroll-view class="scrollX" scroll-x>
				<view class="item-lis" v-for="(item,index) in CardImgDate" :key="index" >
					<image class="img" src="../../static/images/gerenzhuye-img.png" alt="" />
				</view>
			</scroll-view>
		</view>
		
		<view class="f5H10"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">技能</view>
		</view>
		<view class="caseSbmit">
			<view class="eidt-line">
				<view class="ll">铺地砖：</view>
				<view class="rr price" style="text-align: right;">200</view>
			</view>
			<view class="eidt-line">
				<view class="ll">平正铺砖：</view>
				<view class="rr price" style="text-align: right;">200</view>
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
				CardImgDate: [
					{},{},{},{},{},{}
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
	@import "../../assets/style/quill.css";
	@import "../../assets/style/index.css";
	@import "../../assets/style/user.css";
	page{padding-bottom: 60rpx!important;}
	.tejiaBox .item-lis{width: 240rpx; height: 180rpx;overflow: hidden;}
	.tejiaBox .item-lis .img{width: 100%;height: 100%;}
</style>
