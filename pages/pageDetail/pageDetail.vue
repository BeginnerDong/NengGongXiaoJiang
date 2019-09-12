<template>
	<view>
		<view class="detailxqBan">
			<image src="../../static/images/details-img1.png" mode=""></image>
		</view>
		<view class="detailTit">
			<view class="tit">标题标题标题标题标题标题标题标题</view>
			<view class="flexRowBetween">
				<view class="pric">56.00</view>
				<view class="font12 color3">销量：12345</view>
			</view>
		</view>
		<view class="f5H10"></view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">商家</view>
		</view>
		<view class="busnsName palr4 flexRowBetween">
			<view class="flexRowAround">
				<view class="leftImg" @click="webSelf.$Router.navigateTo({route:{path:'/pages/business_index/business_index'}})">
					<image src="../../static/images/about-daka-img2.png"></image>
				</view>
				<view class="cont">
					<view class="tit avoidOverflow">商家名称</view>
					<view class="adrs avoidOverflow">陕西省西安市雁塔区高新大都荟</view>
				</view>
			</view>
			<view class="icon">
				<image src="../../static/images/details-icon1.png" mode=""></image>
			</view>
		</view>
		<view class="f5H10"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">详情介绍</view>
		</view>
		<view class="xqInfor">
			<view class="cont">
				<view>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
				<view>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
				<view>
					<image src="../../static/images/details-img1.png" mode="widthFix" />
				</view>
			</view>

		</view>
		
		<!-- 底部菜单按钮 -->
		<view class="xqbotomBar">
			<view class="left">
				<view class="ite" @click="webSelf.$Router.switchTab({route:{path:'/pages/index/index'}})">
					<image src="../../static/images/details-icon2.png" mode=""></image>
					<view>返回首页</view>
				</view>
				<view class="ite">
					<image src="../../static/images/details-icon3.png" mode=""></image>
					<view>收藏</view>
				</view>
				<view class="ite">
					<image src="../../static/images/details-icon4.png" mode=""></image>
					<view>客服</view>
				</view>
				<view class="ite">
					<image src="../../static/images/details-icon5.png" mode=""></image>
					<view>购物车</view>
				</view>
			</view>
			<view class="payBtn" @click="webSelf.$Router.navigateTo({route:{path:'/pages/registMsg/registMsg'}})">立即下单</view>
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
				wx_info:{}
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
	page{padding-bottom: 140rpx;}

</style>
