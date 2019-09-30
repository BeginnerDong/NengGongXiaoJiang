<template>
	<view>
		<view class="myExtendTop">
			<view class="money">5600</view>
			<view class="yuan">推广奖励</view>
			<view class="txBtn" @click=" Router.navigateTo({route:{path:'/pages/myCashOut/myCashOut'}})">提现</view>
			<!-- myCashOut -->
		</view>
		
		<view class="tooling_indNav">
			<view class="list">
				<view class="item" :class="num==1?'on':''" @click="change('1')">推广赏金</view>
				<view class="item" :class="num==2?'on':''" @click="change('2')">推广海报</view>
			</view>
		</view>
		
		<view class="myExtendBox1" v-if="num==1">
			<view class="item flexRowBetween" v-for="(item,index) in rewardData" :key="index">
				<view class="left">2019年9月12日</view>
				<view class="right red">+23</view>
			</view>
		</view>
		<view class="myExtendBox2" v-if="num==2">
			<view class="postersbox pr" @click=" Router.navigateTo({route:{path:'/pages/myExtend_starEdeem/myExtend_starEdeem?type=user'}})">
				<image class="pic" src="../../static/images/about-posters-img.png" mode=""></image>
				<view class="infor">
					<view class="red font11">23561J</view>
					<view class="copyBtn font11">复制</view>
				</view>
				<view class="textB">《推广说明》</view>
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
				num:1,
				rewardData:[
					{},{},{}
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
				if(num!= self.num){
					self.num = num
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
	.tooling_indNav .list .item{width: 50%; color: #222;}
	

</style>
