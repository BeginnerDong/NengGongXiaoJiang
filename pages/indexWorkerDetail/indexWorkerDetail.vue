<template>
	<view>
		<view class="detailxqBan">
			<image src="../../static/images/details-img1.png" mode=""></image>
		</view>
		
		<view class="designXq_name pdlr4" style="margin-top: 0;padding: 30rpx 4%;">
			<view class="lis1">
				<view class="photo" @click=" Router.navigateTo({route:{path:'/pages/indexWorker_index/indexWorker_index'}})">
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
			<view class="tt">工艺内容</view>
		</view>
		<view class="xqInfor">
			<view class="cont">
				<view>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">工人介绍</view>
		</view>
		<view class="xqInfor">
			<view class="cont">
				<view>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">服务案例</view>
		</view>
		
		<view class="proLis flexRowBetween xqProlis">
			<view class="item-lis" v-for="(item,index) in produtList" :key="index" @click=" Router.navigateTo({route:{path:'/pages/indexWorkerDetailTwo/indexWorkerDetailTwo'}})">
				<image class="img" src="../../static/images/home-img3.png" alt="" />
				<view class="tit avoidOverflow2">名称名称名称名称名称名称名称名名称名称名称名称名称名称</view>
			</view>
		</view>
		
		
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
			<view class="payBtn" @click=" Router.navigateTo({route:{path:'/pages/yuyue/yuyue'}})">立即预约</view>
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
				produtList: [
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
