<template>
	<view>
		<view class="detailxqBan">
			<image src="../../static/images/details-img1.png" mode=""></image>
		</view>
		
		<view class="designXq_name pdlr4" style="margin-top: -60rpx;">
			<view class="lis1">
				<view class="photo" @click=" Router.navigateTo({route:{path:'/pages/indexDesign_index/indexDesign_index'}})">
					<image src="../../static/images/details-img3.png" mode=""></image>
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
					<view class="flexRowBetween saleB">
						<view class="priceM font14">6</view>
						<view class="color3 font12">成交量：500</view>
					</view>
				</view>
			</view>
			<view class="lis2 flexRowBetween">
				<view class="adrs font13 avoidOverflow">陕西省西安市雁塔区高新大都荟</view>
				<view class="icon">
					<image src="../../static/images/details-icon1.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">设计师介绍</view>
		</view>
		<view class="xqInfor">
			<view class="cont">
				<view>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">设计师评价</view>
		</view>
		
		<view class="designXq_pjLis pdlr4">
			<view class="item" v-for="(item,index) in designPjLis" :key="index">
				<view class="photo"><image src="../../static/images/about-daka-img1.png" mode=""></image></view>
				<view class="cont">
					<view class="name color2 font14">昵称昵称</view>
					<view class="time font12 color3">2019年5月20日</view>
					<view class="text">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
				</view>
			</view>
		</view>
		
		<view class="openMore">展开更多<image class="icon" src="../../static/images/workers-icon2.png"></image></view>
		
		
		<!-- 底部菜单按钮 -->
		<view class="xqbotomBar">
			<view class="left">
				<view class="ite" @click=" Router.switchTab({route:{path:'/pages/index/index'}})">
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
			</view>
			<view class="payBtn" @click=" Router.navigateTo({route:{path:'/pages/yuyue/yuyue'}})">立即下单</view>
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
	page{padding-bottom: 140rpx!important;}
	.xqbotomBar .left .ite{ width: 33.3%;}
</style>
