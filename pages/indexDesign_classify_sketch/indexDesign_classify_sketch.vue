<template>
	<view class="classifyBox">
		<view class="classifyCont" style="padding-top: 30rpx;">
			<view class="class_leftNav" style="top: 120rpx;">
				<view class="cont">
					<view class="child" :class="curr==1?'on':''" @click="changeTwo('1')">简约风</view>
					<view class="child" :class="curr==2?'on':''" @click="changeTwo('2')">欧美风</view>
					<view class="child" :class="curr==3?'on':''" @click="changeTwo('3')">田园风</view>
					<view class="child" :class="curr==4?'on':''" @click="changeTwo('4')">简约风</view>
					<view class="child" :class="curr==5?'on':''" @click="changeTwo('5')">欧式风</view>
				</view>
			</view>
			<view class="class_rightCont">
				<view class="class_sketch"  @click="Router.navigateTo({route:{path:'/pages/indexDesign_classify_sketchDetail/indexDesign_classify_sketchDetail'}})">
					<view class="item boxShaow" v-for="(item,index) in sketchData" :key="index">
						<view class="photo">
							<image src="../../static/images/details-img1.png" mode=""></image>
						</view>
						<view class="lable">简约风</view>
						<view class="cont">
							<view class="text avoidOverflow">标题标题标题标题标题标题标题标题标题标题标题</view>
							<view class="name">张三</view>
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
				currIndex: 0,
				Router:this.$Router,
				num:1,
				curr:1,
				sketchData: [
					{},{},{},{}
				]
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			change(num){
				const self = this;
				if(num!=self.num){
					self.num = num
				}
			},
			changeTwo(curr){
				const self = this;
				if(curr!=self.curr){
					self.curr = curr
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
	@import "../../assets/style/index.css";
	page{padding-bottom: 100rpx;background: #f5f5f5;}

</style>

 
