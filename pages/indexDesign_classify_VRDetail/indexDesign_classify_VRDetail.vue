<template>
	<view>
		<view class="detailxqBan">
			<!-- <image src="../../static/images/VRvideo1.png" mode=""></image> -->
			<video src="../../static/images/video1.mp4" controls style="width: 100%;height: 100%;"></video>
		</view>
		
		<view class="designXq_name pdlr4" style="margin-top: -20rpx; position: relative; z-index: 6;">
			<view class="lis1">
				<view>
					<image class="photo" src="../../static/images/gerenzhuye-img2.png" mode=""></image>
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
				</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">作品列表</view>
		</view>
		
		<view class="VRXq_videoLis pdlr4 flexRowBetween">
			<view class="item" v-for="(item,index) in VRvideoLis" :key="index"   @click="webSelf.$Router.navigateTo({route:{path:'/pages/indexDesign_classify_VRDetail/indexDesign_classify_VRDetail'}})">
				<image class="pic" src="../../static/images/VRvideo1.png" mode=""></image>
				<view class="title avoidOverflow">标题标题标题标题标题标题标题标题标题标题</view>
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
				is_show:false,
				
				VRvideoLis:[
					{},{},{},{},{},{}
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
