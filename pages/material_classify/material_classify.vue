<template>
	<view class="classifyBox">
		<view>
			<scroll-view class="navLisBox" scroll-x>
				<view class="nav-item " :class="num==1?'active':''" @click="change('1')">柜子</view>
				<view class="nav-item" :class="num==2?'active':''" @click="change('2')">椅子</view>
				<view class="nav-item" :class="num==3?'active':''" @click="change('3')">木门</view>
				<view class="nav-item" :class="num==4?'active':''" @click="change('4')">建筑材料</view>
				<view class="nav-item" :class="num==5?'active':''" @click="change('5')">木门</view>
				<view class="nav-item" :class="num==6?'active':''" @click="change('6')">建筑材料</view>
				<view class="nav-item" :class="num==7?'active':''" @click="change('7')">椅子</view>
			</scroll-view>
		</view>
		<view class="classifyCont">
			<view class="class_leftNav">
				<view class="cont">
					<view class="child" :class="curr==1?'on':''" @click="changeTwo('1')">衣柜</view>
					<view class="child" :class="curr==2?'on':''" @click="changeTwo('2')">鞋柜</view>
					<view class="child" :class="curr==3?'on':''" @click="changeTwo('3')">书柜</view>
					<view class="child" :class="curr==4?'on':''" @click="changeTwo('4')">床头柜</view>
					<view class="child" :class="curr==5?'on':''" @click="changeTwo('5')">衣柜</view>
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
						<view class="items flexRowBetween" v-for="(item,index) in produtList" :key="index" @click=" Router.navigateTo({route:{path:'/pages/pageDetail/pageDetail'}})">
							<view class="pic">
								<image src="../../static/images/home-img3.png" alt="" />
							</view>
							<view class="infor">
								<view class="title flex">
									<view class="avoidOverflow2">名城名称名城名称名城名称名城名称名城名称名城名称</view>
								</view>
								<view class="flexRowBetween saleB">
									<view class="price font14">6.00</view>
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
	
	.class_infor .designIndex .items{padding: 0 20rpx 0 0;}
	.class_infor .designIndex .items .pic{ width: 200rpx; height: 200rpx;}
	.class_infor .designIndex .items .infor{width:290rpx;height: 200rpx;box-sizing: border-box;padding: 16rpx 0;}
	.designIndex .items .infor .saleB{bottom: 20rpx;}
</style>

 
