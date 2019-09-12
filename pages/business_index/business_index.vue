<template>
	<!-- 商家主页 -->
	<view>
		
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">商家</view>
		</view>
		<view class="busnsName palr4 flexRowBetween">
			<view class="flexRowAround ">
				<view class="leftImg">
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
				<view>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">发布商品</view>
		</view>
		<view class="designIndex pdlr4">
			<view class="items flexRowBetween" v-for="(item,index) in businessDate" :key="index" @click="webSelf.$Router.navigateTo({route:{path:'/pages/pageDetail/pageDetail'}})">
				<view class="pic">
					<image src="../../static/images/home-img3.png" alt="" />
				</view>
				<view class="infor">
					<view class="title flex" style="padding-top: 10rpx;line-height: 46rpx;">
						<view class="avoidOverflow2">厂家直销高强无收缩灌浆料-灌浆料强度高</view>
					</view>
					<view class="saleB">
						<view class="priceM font14">56</view>
					</view>
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
				businessDate:[
					{},{},{}
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
	page{padding-bottom: 60rpx;}

</style>
