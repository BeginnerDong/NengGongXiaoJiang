<template>
	<view>
		<view class="orderNav" style="background: #F5F5F5;">
			<view class="tt" :class="current==1?'on':''" @click="change('1')">设计师</view>
			<view class="tt" :class="current==2?'on':''" @click="change('2')">工人</view>
			<view class="tt" :class="current==3?'on':''" @click="change('3')">材料</view>
		</view>
		
		<view class="designIndex pdlr4" style="padding-top: 10rpx;" v-if="current==1">
			<view class="items flexRowBetween" v-for="(item,index) in produtList" :key="index"  @click=" Router.navigateTo({route:{path:'/pages/indexDesignDetail/indexDesignDetail'}})">
				<view class="pic">
					<image src="../../static/images/home-img3.png" alt="" />
				</view>
				<view class="infor">
					<view class="title flex">
						<view class="avoidOverflow">名称名称名称名称名称名称名称名称名称</view>
					</view>
					<view class="text2">擅长风格：欧式风、简约风、北美风、田园风</view>
					<view class="flexRowBetween saleB">
						<view class="priceM font14">6</view>
						<view class="color3 font12">成交量：500</view>
					</view>
				</view>
			</view>
		</view>
		<view class="designIndex pdlr4" style="padding-top: 10rpx;" v-if="current==2">
			<view class="items flexRowBetween" v-for="(item,index) in produtList" :key="index"  @click=" Router.navigateTo({route:{path:'/pages/indexWorkerDetail/indexWorkerDetail'}})">
				<view class="pic">
					<image src="../../static/images/home-img3.png" alt="" />
				</view>
				<view class="infor">
					<view class="title flex">
						<view class="avoidOverflow">名称名称名称名称名称名称名称名称名称</view>
					</view>
					<view class="text2">服务内容：欧式风、简约风、北美风、田园风</view>
					<view class="flexRowBetween saleB">
						<view class="priceM font14">6</view>
						<view class="color3 font12">成交量：500</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="proLis flexRowBetween" v-if="current==3">
			<view class="item-lis" v-for="(item,index) in materialData" :key="index" @click=" Router.navigateTo({route:{path:'/pages/pageDetail/pageDetail'}})">
				<image class="img" src="../../static/images/home-img3.png" alt="" />
				<view class="tit avoidOverflow">名称名称名称名称名称</view>
				<view class="price">56.00</view>
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
				score: '',
				wx_info: {},
				current:1,
				produtList:[
					{},{}
				],
				materialData:[
					{},{},{},{}
				]
			}
		},

		onLoad(options) {
			uni.setStorageSync('canClick', true);
		},

		onShow() {
			const self = this;
			document.title = ''
		},

		methods: {
			change(current) {
				const self = this;
				if(current!=self.current){
					self.current = current
				}
			},

			getMainData() {
				const self = this;
				self.$apis.userGet(postData, callback);
			}
		}
	}
</script>

<style>
	@import "../../assets/style/user.css";
	@import "../../assets/style/index.css";
	page{padding-bottom: 80rpx;}
</style>
