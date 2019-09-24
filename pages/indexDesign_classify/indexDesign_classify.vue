<template>
	<view class="classifyBox">
		<view>
			<scroll-view class="navLisBox" scroll-x>
				<view class="nav-item " :class="num==1?'active':''" @click="change('1')">园林</view>
				<view class="nav-item" :class="num==2?'active':''" @click="change('2')">家装</view>
				<view class="nav-item" :class="num==3?'active':''" @click="change('3')">中式</view>
				<view class="nav-item" :class="num==4?'active':''" @click="change('4')">简约</view>
				<view class="nav-item" :class="num==5?'active':''" @click="change('5')">欧美</view>
				<view class="nav-item" :class="num==6?'active':''" @click="change('6')">中式</view>
				<view class="nav-item" :class="num==7?'active':''" @click="change('7')">简约</view>
				<view class="nav-item" :class="num==8?'active':''" @click="change('8')">中式</view>
			</scroll-view>
		</view>
		<view class="classifyCont">
			<view class="class_leftNav">
				<view class="cont">
					<view class="child" :class="curr==1?'on':''" @click="changeTwo('1')">田园风</view>
					<view class="child" :class="curr==2?'on':''" @click="changeTwo('2')">欧式风</view>
					<view class="child" :class="curr==3?'on':''" @click="changeTwo('3')">简约风</view>
					<view class="child" :class="curr==4?'on':''" @click="changeTwo('4')">北美风</view>
					<view class="child" :class="curr==5?'on':''" @click="changeTwo('5')">欧式风</view>
					<view class="child" :class="curr==6?'on':''" @click="changeTwo('6')">中式风</view>
				</view>
			</view>
			<view class="class_rightCont">
				<view class="class_sort">
					<view class="child">
						<view>价格</view>
						<image src="../../static/images/workers-icon2.png" mode=""></image>
					</view>
					<view class="child">
						<view>销量</view>
						<image src="../../static/images/workers-icon2.png" mode=""></image>
					</view>
				</view>
				<view class="class_infor">
					<view class="designIndex">
						<view class="items flexRowBetween" v-for="(item,index) in produtList" :key="index" 
						@click="Router.navigateTo({route:{path:'/pages/indexDesignDetail/indexDesignDetail'}})">
							<view class="pic">
								<image src="../../static/images/home-img3.png" alt="" />
							</view>
							<view class="infor">
								<view class="title flex">
									<view>张大嘴</view>
								</view>
								<view class="text2 avoidOverflow2">擅长风格：欧式风、简约风、北美风、田园风</view>
								<view class="flexRowBetween saleB">
									<view class="priceM font14">6</view>
									<view class="color3 font12">成交量：500</view>
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
				currIndex: 0,
				Router:this.$Router,
				num:1,
				curr:1,
				produtList: [
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

 
