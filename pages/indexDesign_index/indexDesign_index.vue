<template>
	<view>
		
		<view class="designXq_name pdlr4" style="margin-top: 0;padding: 30rpx 4%;">
			<view class="lis1">
				<view class="photo">
					<image :src="mainData.mainImg[0].url" mode=""></image>
				</view>
				<view class="cont">
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
					<view class="text2 avoidOverflow2 color3 font13">{{mainData.introduce}}</view>
					<view class="flexRowBetween saleB">
						
						<view class="color3 font12">成交量：{{mainData.volume}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="f5H10" v-if="mainData.user&&mainData.user[0]&&mainData.user[0].behavior==1"></view>
		
		<view class="infor-title flexRowBetween" v-if="mainData.user&&mainData.user[0]&&mainData.user[0].behavior==1">
			<view class="xian"></view>
			<view class="tt">个人信息</view>
		</view>
		<view class="xqInfor">
			<view class="cont">
				<view>{{mainData.introduce}}</view>
			</view>
		</view>
		
		<view class="f5H10" v-if="mainData.user&&mainData.user[0]&&mainData.user[0].behavior==2"></view>
		
		<view class="infor-title flexRowBetween" v-if="mainData.user&&mainData.user[0]&&mainData.user[0].behavior==2">
			<view class="xian"></view>
			<view class="tt">团队信息</view>
		</view>
		<view class="xqInfor">
			<view class="cont">
				<view>{{mainData.company}}</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">经典案例</view>
		</view>
		
		<view class="tejiaBox">
			<scroll-view class="scrollX" scroll-x>
				<view class="item-lis" v-for="(item,index) in mainData.message" :key="index"  @click="imglisttkShow">
					<image class="img" @click="previewImage(index)" :src="item.mainImg[0].url" alt="" />
				</view>
			</scroll-view>
		</view>
		
		<!-- 案例图片放大弹出层 -->
		<view class="imglisttk" v-show="is_imglisttk">
			<view class="colse" @click="imglisttkShow">×</view>
			<view class="imgList">
				<swiper class="swiper-box" indicator-dots="true" autoplay="true" interval="3000" duration="1000" indicator-active-color="#FFCB1E">
					<block v-for="(item,index) in mainData.message" :key="index">
						<swiper-item class="swiper-item">
							<image :src="item.mainImg[0].url" class="slide-image pic" />
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		
		<view class="f5H10"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">技能</view>
		</view>
		<view class="caseSbmit">
			<view class="eidt-line" v-for="(item,index) in mainData.product" :key="index" 
			@click="Router.navigateTo({route:{path:'/pages/indexDesignDetail/indexDesignDetail?id='+item.id}})">
				<view class="ll">{{item.title}}</view>
				<view class="rr price" style="text-align: right;">{{item.price}}</view>
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
				stars: [0, 1, 2, 3, 4],
				normalSrc: '../../static/images/home-supervision-icon3.png',
				selectedSrc: '../../static/images/home-supervision-icon1.png',
				halfSrc: '../../static/images/home-supervision-icon2.png',
				is_imglisttk:false
			}
		},
		onLoad(options) {
			const self = this;
			self.user_no = options.user_no;
			self.$Utils.loadAll(['getMainData'], self);
		},

		methods: {
			imglisttkShow(){
				const self = this;
				self.is_imglisttk = !self.is_imglisttk
			},
			previewImage(index){
				const self = this;
				for (var i = 0; i < self.mainData.message.length; i++) {
					self.imageArray.push(self.mainData.message[i].mainImg[0].url)
				};
				uni.previewImage({
					urls: self.imageArray,
					current:index,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					user_type:1,
					user_no:self.user_no
				};
				postData.getAfter = {
					user:{
						tableName:'User',
						middleKey:'user_no',
						key:'user_no',
						searchItem:{
							status:1,
						},
						condition:'='
					},
					message:{
						tableName:'Message',
						middleKey:'user_no',
						key:'user_no',
						searchItem:{
							status:1,
							type:6,
						},
						condition:'='
					},
					product:{
						tableName:'Product',
						middleKey:'user_no',
						key:'user_no',
						searchItem:{
							status:1,
							type:2,
							
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
	
	@import "../../assets/style/index.css";
	@import "../../assets/style/user.css";
	@import "../../assets/style/tejiaBox.css";
	@import "../../assets/style/caseSbmit.css";
	
	page{padding-bottom: 60rpx!important;}
	.tejiaBox .item-lis{width: 240rpx; height: 180rpx;overflow: hidden;border-radius: 8rpx; padding-bottom: 0;}
	.tejiaBox .item-lis .img{width: 100%;height: 100%;}
	.caseSbmit .eidt-line .ll{ font-size: 28rpx;}

	.imglisttk{position: fixed;top: 0;right:0; bottom: 0; left: 0;background: rgba(0,0,0,0.7);z-index: 66;}
	.imglisttk .colse{ font-size: 70rpx; color: #fff; position: absolute; top: 80rpx;right: 40%;transform: translateX(-50%);padding: 20rpx;}
	.imgList{width:600rpx; height: 450rpx;  position: absolute; top: 50%;left: 50%;transform: translate(-50%,-50%);}
	.imgList .swiper-box{height: 100%;}
	.imgList .pic{ width: 100%; height: 100%; display: block;margin: 0 auto;}
</style>
