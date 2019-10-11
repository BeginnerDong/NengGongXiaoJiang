<template>
	<view>
		<view class="detailxqBan">
			<image :src="mainData.message[0].mainImg[0].url" mode=""></image>
		</view>
		
		<view class="designXq_name pdlr4" style="margin-top: 0;padding: 30rpx 4%;">
			<view class="lis1">
				<view>
					<image class="photo" :src="mainData.mainImg[0].url" mode=""></image>
				</view>
				<view class="cont">
					<view class="flex namebox">
						<view class="font13">{{mainData.name}}</view>
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
					<view class="text2 avoidOverflow2 color3 font13">{{mainData.introduce}}</view>
					<view class="flexRowBetween saleB">
						<!-- <view class="priceM font14">6</view> -->
						<view class="color3 font12">成交量：{{mainData.volume}}</view>
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
				<view>{{mainData.message[0].description}}</view>
				<view v-for="item in mainData.message[0].mainImg">
					<image :src="item.url" mode="widthFix"></image>
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
			
				produtList: [
					{},{},{},{}
				],
				mainData:{}
			}
		},

		onLoad(options) {
			const self = this;
			self.user_no = options.user_no;
			self.id = options.id;
			self.$Utils.loadAll(['getUserInfoData'], self);
		},

		methods: {
			
			getUserInfoData(){
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					user_no:self.user_no,
					user_type:1
				};
				postData.getAfter ={
					message:{
						
						tableName:'Message',
						middleKey:'user_no',
						key:'user_no',
						condition:'=',
						searchItem:{
							status:1,
							type:5,
							id:self.id
						}
					},
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data[0];
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getUserInfoData');					
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			
			
		}
	}
</script>

<style>
	@import "../../assets/style/index.css";
</style>
