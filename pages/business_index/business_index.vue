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
					<image :src="mainData.mainImg&&mainData.mainImg[0]?mainData.mainImg[0].url:'../../static/images/qiyexinxi-icon2.png'"></image>
				</view>
				<view class="cont">
					<view class="tit avoidOverflow">{{mainData.name}}</view>
					<view class="adrs avoidOverflow">{{mainData.address}}</view>
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
				<view>
					{{mainData.introduce}}
				</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">发布商品</view>
		</view>
		<view class="designIndex pdlr4">
			<view class="items flexRowBetween" v-for="(item,index) in mainData.product" :key="index" :data-id="item.id"
			@click=" Router.navigateTo({route:{path:'/pages/pageDetail/pageDetail?id='+$event.currentTarget.dataset.id+'&type='+item.type}})">
				<view class="pic">
					<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" alt="" />
				</view>
				<view class="infor">
					<view class="title flex" style="padding-top: 10rpx;line-height: 46rpx;">
						<view class="avoidOverflow2">{{item.title}}</view>
					</view>
					<view class="saleB">
						<view class="priceM font14">{{item.price}}</view>
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
				Router:this.$Router,
				mainData:{},
				CardImgDate: [
					{},{},{},{},{},{}
				],
				stars: [0, 1, 2, 3, 4],
				normalSrc: '../../static/images/home-supervision-icon3.png',
				selectedSrc: '../../static/images/home-supervision-icon1.png',
				halfSrc: '../../static/images/home-supervision-icon2.png',
			}
		},

		onLoad(options) {
			const self = this;
			self.user_no = options.user_no;
			self.type = options.type;
			self.$Utils.loadAll(['getMainData'], self);
		},

		methods: {
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					user_type:1,
					user_no:self.user_no
				};
				postData.getAfter = {
					
					product:{
						tableName:'Product',
						middleKey:'user_no',
						key:'user_no',
						searchItem:{
							status:1,
							type:self.type
						},
						condition:'='
					},
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data[0];
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMainData');
			
				};
				self.$apis.userInfoGet(postData, callback);
			}
		}
	}
</script>

<style>
	@import "../../assets/style/designIndex.css";
	@import "../../assets/style/index.css";
	@import "../../assets/style/busnsName.css";
	
	page{padding-bottom: 60rpx;}

</style>
