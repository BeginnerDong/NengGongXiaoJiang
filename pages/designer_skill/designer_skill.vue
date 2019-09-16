<template>
	<view>
		<view class="fabubtn" @click="webSelf.$Router.navigateTo({route:{path:'/pages/designer_skill_add/designer_skill_add'}})">
			<view class="icon">
				<image src="../../static/images/certificate-icon1.png" mode=""></image>
			</view>
			<view class="tit" >添加技能</view>
		</view>
		<view class="myNeed_ind pdlr4">
			<view class="zizhiline boxShaow" v-for="(item,index) in zizhiData" :key="index" >
				<view class="item flexRowBetween" @click="webSelf.$Router.navigateTo({route:{path:'/pages/designer_skill_add/designer_skill_add'}})">
					<view class="cont">
						<view class="lis flex">
							<image class="icon" src="../../static/images/skills-icon1.png" mode=""></image>
							<view class="name">风格</view>
							<view class="tex">园林-简约风</view>
						</view>
						<view class="lis flex">
							<image class="icon" src="../../static/images/skills-icon2.png" mode=""></image>
							<view class="name">价格</view>
							<view class="tex">￥6/㎡</view>
						</view>
					</view>
					<view class="arrow"><image src="../../static/images/arrow-icon1.png" mode=""></image></view>
				</view>
				<view class="item_delt pdlr4">
					<view class="deltBtn" @click="deltAlert">
						<image class="deltIcon" src="../../static/images/certificate-icon2.png" mode=""></image>删除
					</view>
					<view class="deltBtn">
						<image class="deltIcon" src="../../static/images/skills-icon3.png" style="width: 28rpx; height: 27rpx;" mode=""></image>编辑
					</view>
				</view>
			</view>
		</view>

		<view class="xieyiAlert" v-if="is_show">
			<view class="infor center" style="padding: 120rpx 30px;height: auto;border-radius: 10rpx;">
				<view class="colseBtn"  @click="deltAlert" style="top: 20rpx;right: 20rpx;left:auto;">×</view>
				<view class="tit font16" style="padding-bottom: 60rpx;">确认是否删除这个技能</view>
				<view class="btnB flexRowBetween">
					<view :class="num==1? 'on':''" @click="chage('1')">是</view>
					<view :class="num==2? 'on':''" @click="chage('2')">否</view>
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
				score: '',
				wx_info: {},
				current:1,
				is_show:false,
				num:1,
				zizhiData:[
					{},{}
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
			chage(num){
				const self = this;
				if(num!=self.num){
					self.num=num
				}
			},
			deltAlert(){
				const self = this;
				self.is_show=!self.is_show;
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
	page{background: #f5f5f5; padding-bottom: 80rpx;}
	.item_delt{ display: flex;justify-content: flex-end; color: #999;}
	.deltIcon{ width: 30rpx; height: 30rpx;margin-right: 10rpx;}
	.myNeed_ind .item{margin-top: 0;margin-bottom: 20rpx;padding-bottom: 0;}
	.zizhiline{background: #fff; margin-top: 30rpx;padding-bottom: 30rpx;border-radius: 10rpx; overflow: hidden;}
	.item_delt,.deltBtn{display: flex;justify-content: flex-end; align-items: center; font-size: 26rpx; margin-left:40rpx;}
	.deltIcon{ width:22rpx ; height: 27rpx; display: block;}
	.btnB{ width: 60%;margin: 0 auto;}
	.btnB view{width: 100rpx; line-height: 50rpx; height: 50rpx;border-radius: 30rpx;border:2rpx solid #FFCB1E;}
	.btnB view.on{background: #FFCB1E;}
	
</style>
