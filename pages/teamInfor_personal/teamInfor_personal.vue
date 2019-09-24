<template>
	<view>
		<view class="caseSbmit">
			<form action="">
				<view class="eidt-line flexRowBetween">
					<view class="ll">公司名称</view>
					<view class="rr">
						<image style="width: 80rpx;height: 80rpx;border-radius: 50%; display: block;" src="../../static/images/workers-img1.png" mode=""></image>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">昵称</view>
					<view class="rr">
						<input type="text" value="快乐的阿莫" />
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">性别</view>
					<view class="rr pr" style="padding-right: 10rpx;">
						<image style="width: 30rpx; height: 30rpx; display: block; margin-right: 10rpx;" src="../../static/images/case-icon2.png" mode=""></image>
						<picker :value="index" :range="array"  @change="bindPickerChange">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</view>
				<view class="eidt-column">
					<view class="ll">个人介绍</view>
					<view class="">
						<textarea value="" placeholder="请简单的介绍下一下自己" />
					</view>
				</view>
				<view class="eidt-column">
					<view class="ll">工作经历</view>
					<view class="">
						<textarea value="" placeholder="请简单的描述一下自己的工作经历" />
					</view>
				</view>
			</form>
		</view>
		<view class="submitbtn" style="margin: 100rpx auto">
			<button type="submit">保存</button>
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
				index: 0,
				array:['男','女']
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			bindPickerChange(e) {
				// 搜索选择分类
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
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
	.rr{ justify-content:flex-end; display:flex ; text-align: right; align-items: center; }
	.eidt-column{padding: 30rpx 4% ; border-bottom: 1px solid #e7e7e7;}
	.eidt-column .ll{padding-bottom: 20rpx;}
	textarea{ width: 100%;height: 300rpx; display: block; box-sizing: border-box; font-size: 26rpx; line-height: 44rpx;padding: 20rpx;background: #F5F5F5;}
</style> 
