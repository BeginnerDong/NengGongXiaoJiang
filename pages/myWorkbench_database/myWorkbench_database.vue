<template>
	<view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">历史资料</view>
		</view>
		<view class="ziliao_indLis pdlr4">
			<view class="item" v-for="(item,index) in ziliaoDate" :key="index">
				<view class="leftPic">
					<image src="../../static/images/about-hetongbuchong-icon1.png" mode=""></image>
				</view>
				<view class="infor">
					<view class="avoidOverflow">标题标题标题标题标题标题标题标题标题标题</view>
					<view class="party font12 color3">甲方</view>
					<view class="flexRowBetween last">
						<view class="upBtn">下载</view>
						<view class="delt"  @click="deltAlert">
							<image src="../../static/images/about-address-icon3.png" mode=""></image>
							删除
						</view>
					</view>
				</view>
			</view>
			<view class="submitbtn" style="margin-top: 100rpx;">
				<button type="button" @click=" Router.navigateTo({route:{path:'/pages/myWorkbench_database_upmsg/myWorkbench_database_upmsg'}})">上传资料</button>
			</view>
			
		</view>
		
		<view class="xieyiAlert" v-if="is_show">
			<view class="infor center" style="padding: 120rpx 30px;height: auto;border-radius: 10rpx;">
				<view class="colseBtn"  @click="deltAlert" style="top: 20rpx;right: 20rpx;left:auto;">×</view>
				<view class="tit font16" style="padding-bottom: 60rpx;">确认是否删除这些资料</view>
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
				Router:this.$Router,
				showView: false,
				score:'',
				wx_info:{},
				ziliaoDate:[
					{},{},{}
				],
				is_show:false,
				num:1
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
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
				console.log('852369')
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

			},

		},
	};
</script>
<style>
	@import "../../assets/style/user.css";
	page{padding-bottom: 60rpx;}
	.leftPic{width: 200rpx; height: 200rpx; display: block;}
	.ziliao_indLis .item{padding: 30rpx 0; display: flex; justify-content: space-between;border-bottom: 2rpx solid #E7E7E7;}
	.leftPic image{width: 100%;height: 100%;}
	.ziliao_indLis .infor{ width: 67%;}
	.last{margin-top: 80rpx;}
	.upBtn{ width: 100rpx; height: 50rpx; line-height: 50rpx; text-align: center;background: #FFCB1E; border-radius: 8rpx;}
	.delt{width: 110rpx; text-align: right;display: flex;justify-content: flex-end; color: #666;font-size: 24rpx;}
	.delt image{width: 30rpx;height: 30rpx; display: block; margin-right: 6rpx;}
	
	.deltIcon{ width:22rpx ; height: 27rpx; display: block;margin-right: 10rpx;}
	.btnB{ width: 60%;margin: 0 auto;}
	.btnB view{width: 100rpx; line-height: 50rpx; height: 50rpx;border-radius: 30rpx;border:2rpx solid #FFCB1E;}
	.btnB view.on{background: #FFCB1E;}
</style>

 
