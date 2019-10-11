<template>
	<view>
		<view class="orderNav" style="background: #F5F5F5;">
			<view class="tt" :class="current==1?'on':''" @click="change('1')">设计师</view>
			<view class="tt" :class="current==2?'on':''" @click="change('2')">工人</view>
			<view class="tt" :class="current==3?'on':''" @click="change('3')">材料</view>
		</view>
		
		<view class="designIndex pdlr4" style="padding-top: 10rpx;" v-if="current==1&&designData.length>0">
			<view class="items flexRowBetween" v-for="(item,index) in designData" :key="index"  
			@click=" Router.navigateTo({route:{path:'/pages/indexDesignDetail/indexDesignDetail?id='+item.id}})">
				<view class="pic">
					<image :src="item.userInfo[0].mainImg[0].url" alt="" />
				</view>
				<view class="infor">
					<view class="title flex">
						<view class="avoidOverflow">{{item.userInfo[0].name}}</view>
					</view>
					<view class="text2">{{item.userInfo[0].introduce}}</view>
					<view class="flexRowBetween saleB">
						<view class="priceM font14">{{item.price}}</view>
						<view class="color3 font12">成交量：{{item.sale_count}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="designIndex pdlr4" style="padding-top: 10rpx;" v-if="current==2&&workerData.length>0">
			<view class="items flexRowBetween" v-for="(item,index) in workerData" :key="index" 
			 @click=" Router.navigateTo({route:{path:'/pages/indexWorkerDetail/indexWorkerDetail?id='+item.id}})">
				<view class="pic">
					<image :src="item.userInfo[0].mainImg[0].url" alt="" />
				</view>
				<view class="infor">
					<view class="title flex">
						<view class="avoidOverflow">{{item.userInfo[0].name}}</view>
					</view>
					<view class="text2">{{item.userInfo[0].introduce}}</view>
					<view class="flexRowBetween saleB">
						<view class="priceM font14">{{item.price}}</view>
						<view class="color3 font12">成交量：{{item.sale_count}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="proLis flexRowBetween" v-if="current==3&&productData.length>0">
			<view class="item-lis" v-for="(item,index) in productData" :key="index" 
			@click=" Router.navigateTo({route:{path:'/pages/pageDetail/pageDetail?id='+item.id+'&type='+item.type}})">
				<image class="img" :src="item.mainImg[0].url" alt="" />
				<view class="tit avoidOverflow">{{item.title}}</view>
				<view class="price">{{item.price}}</view>
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
				],
				designData:[],
				workerData:[],
				productData:[],
			}
		},

		onLoad(options) {
			const self = this;
			uni.setStorageSync('canClick', true);
			self.designData = self.$Utils.getStorageArray('collectDesign');
			self.workerData = self.$Utils.getStorageArray('collectWorker');
			self.productData = self.$Utils.getStorageArray('collectProduct');
		},



		methods: {
			change(current) {
				const self = this;
				if(current!=self.current){
					self.current = current
				}
			},

		}
	}
</script>

<style>
	@import "../../assets/style/designIndex.css";
	@import "../../assets/style/user.css";
	@import "../../assets/style/index.css";
	page{padding-bottom: 80rpx;}
</style>
