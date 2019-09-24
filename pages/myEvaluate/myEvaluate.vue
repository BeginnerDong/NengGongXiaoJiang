<template>
	<view>
		<view class="pdlr4 myEvaluate" >
			<view class="designXq_pjLis">
				<view class="infor">
					<view class="item">
						<view class="photo"><image src="../../static/images/about-daka-img1.png" mode=""></image></view>
						<view class="cont">
							<view class="name color2 font14">昵称昵称</view>
							<view class="time font12 color3">2019年5月20日</view>
							<view class="text">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
						</view>
					</view>
					<view class="prolisbox">
						<view class="prolis">
							<view class="datt">
								<view class="left">交易时间：2018-08-30</view>
								<view class="state">已经完成</view>
							</view>
							<view class="twoCt">
								<view class="leftbox">
									<image src="../../static/images/shopping-img1.png"></image>
								</view>
								<view class="cont">
									<view class="title avoidOverflow2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
									<view class="price">59.00</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="infor">
					<view class="item">
						<view class="photo"><image src="../../static/images/about-daka-img1.png" mode=""></image></view>
						<view class="cont">
							<view class="name color2 font14">昵称昵称</view>
							<view class="time font12 color3">2019年5月20日</view>
							<view class="text">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
						</view>
					</view>
					<view class="prolisbox">
						<view class="prolis">
							<view class="datt">
								<view class="left">交易时间：2018-08-30</view>
								<view class="state">已经完成</view>
							</view>
							<view class="twoCt">
								<view class="leftbox">
									<image src="../../static/images/shopping-img1.png"></image>
								</view>
								<view class="cont">
									<view class="title avoidOverflow2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
									<view class="price">59.00</view>
								</view>
							</view>
						</view>
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
				showView: false,
				score: '',
				wx_info: {},
				current:1,
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
	page{padding-bottom: 80rpx;background: #F5F5F5;}
	.designXq_pjLis .infor{background: #fff;padding: 0rpx 20rpx 30rpx 20rpx; margin-top: 30rpx;border-radius: 10rpx;}
	.designXq_pjLis .item{border-bottom: none;}
	.designXq_pjLis .cont{width: 85%;}
	
</style>
