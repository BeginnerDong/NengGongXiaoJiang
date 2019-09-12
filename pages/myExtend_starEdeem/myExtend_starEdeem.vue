<template>
	<view>
		<view class="">
			<view class="postersbox center" style="width: 100%;">
				<image class="pic" src="../../static/images/about-posters-img.png" mode=""></image>
				<view class="infor">
					<view class="red font24">23561J</view>
					<view class="copyBtn font14">复制</view>
				</view>
				<view class="textB" @click="xieyiAlert">《推广说明》</view>
			</view>
			<view class="xieyiAlert" v-if="is_show">
				<view class="infor">
					<view class="colseBtn"  @click="xieyiAlert" style="top: auto;bottom: 60rpx;">×</view>
					<view class="cont">
						<view class="tit">推广说明</view>
						<view>一、标题标题标题标题标题标题标题</view>
						<view>2、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容</view>
						<view>2、内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
						<view>3、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容</view>
						<view>4、内容内容内容内容内容内容内容容内容内容内容内容内容内容</view>
						<view>5、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容</view>
						<view>6、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容</view>
						<view>7、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容</view>
						<view>8、内容内容内容内容内容内容内容容内容内容内容内容内容内容</view>
						<view>9、内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容</view>
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
				is_show:false
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			xieyiAlert(){
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
	.tooling_indNav .list .item{width: 50%; color: #222;}
	.postersbox{position: fixed;top: 0;left: 0;right: 0;bottom: 0;}
	.postersbox .pic{width: 100%; height: 100%; display: block;}
	.postersbox .infor{top: 43%;}
	.postersbox .infor .red{font-size: 52rpx; margin-bottom:26rpx;}
	.postersbox .copyBtn{width: 140rpx; height: 60rpx;line-height: 60rpx;border-radius: 8rpx;}
	.postersbox .textB{bottom:20rpx;font-size: 30rpx;padding: 20rpx;}
	

</style>
