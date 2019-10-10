<template>
	<view>
		<view class="detailxqBan">
			<image src="../../static/images/details-img1.png" mode=""></image>
		</view>
		
		<view class="designXq_name pdlr4" style="margin-top: -60rpx;">
			<view class="lis1">
				<view>
					<image class="photo" :src="mainData.mainImg&&mainData.mainImg[0]?mainData.mainImg[0].url:''" mode=""></image>
				</view>
				<view class="cont"  style=" margin-top: 70rpx;">
					<view class="flex namebox">
						<view class="font13">{{mainData.name}}</view>
						<view class="flexRowBetween starClass">
							<view class="starBox">
								<image v-for="item in stars" :src="mainData.level/2 > item ?(mainData.level/2-item == 0.5?halfSrc:selectedSrc) : normalSrc" mode="">							
								</image>
							</view>
							<view>{{mainData.level}}分</view>
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
				<view>{{mainData.introduce}}</view>
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
			self.$Utils.loadAll(['getMainData'], self);
		},

		methods: {
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					user_type:2,
					user_no:self.user_no
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
	@import "../../assets/style/index.css";
	
</style>
