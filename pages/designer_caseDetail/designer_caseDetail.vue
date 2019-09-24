<template>
	<view>
		<view class="caseSbmit">
			<form action="">
				<view class="eidt-line">
					<view class="ll">选择工种</view>
					<view class="rr pr" style="padding-right: 20rpx;">
						<picker :value="index" :range="array"  @change="bindPickerChange">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
						<image class="arrow" src="../../static/images/case-icon1.png" mode=""></image>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">标题</view>
					<view class="rr">
						<input type="text" value="标题提标题提标题提" placeholder="请输入标题" />
					</view>
				</view>
				
				<view class="eidt-column">
					<view class="ll">详情介绍</view>
					<view class="">
						<textarea value="详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容" placeholder="请简单的介绍下案例详情" />
					</view>
				</view>
				<view class="eidt-column">
					<view class="ll">上传图片</view>
					<view class="rr upBook">
						<image class="bookPic" src="../../static/images/case-img.png" mode=""></image>
					</view>
				</view>
				<view class="eidt-line">
					<view class="ll">标题</view>
					<view class="rr">
						<view class="flexRowBetween r-selt" style="padding-bottom: 30rpx;">
							<view class="selt"  @click="change('1')">
								<image :src="curr==1?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode=""></image>显示
							</view>
							<view class="selt"  @click="change('2')">
								<image :src="curr==2?'../../static/images/case-icon2.png':'../../static/images/case-icon3.png'" mode=""></image>隐藏
							</view>
						</view>
					</view>
				</view>
			</form>
		</view>
		<view class="submitbtn" style="margin: 100rpx auto">
			<button type="submit" @click=" Router.navigateTo({route:{path:'/pages/designer_case/designer_case'}})">确定</button>
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
				curr:1,
				index: 0,
				array:['建筑工','装修工','维修工','园林工','市政工','安装工','其他']
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
			change(curr){
				const self=this
				if(curr!=self.curr){
					self.curr=curr
				}
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
	.upBook{ display: flex;justify-content: flex-start; flex-wrap: wrap;}
	.upBook image{width: 150rpx; height: 150rpx; margin-right: 20rpx;}
	.bookPic{width: 150rpx; height: 150rpx; }
	</style> 
</style> 
