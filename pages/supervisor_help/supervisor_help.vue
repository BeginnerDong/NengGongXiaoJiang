<template>
	<view>
		
		<view class="tooling_indNav">
			<view class="list">
				<view class="item" :class="num==1?'on':''" @click="change('1')">佣金抽取规则</view>
				<view class="item" :class="num==2?'on':''" @click="change('2')">监理入驻规则</view>
			</view>
		</view>
		<view class="guizebox pdlr4" v-if="num==1">
			<view class="texbox">
				<view class="tit">一、佣金抽取规则标题</view>
				<view>1.内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容；</view>
				<view>2.内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容；</view>
				<view>3.内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内；</view>
				<view>4.内容内容内容内容内容内容内容内容内容内容；</view>
				<view>3.内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内；</view>
				<view class="tit">二、标题标题标题标题标题标题标题</view>
				<view>1.内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容；</view>
				<view>2.内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容；</view>
				<view>3.内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内；</view>
			</view>
		</view>
		<view class="guizebox pdlr4" v-if="num==2">
			<view class="texbox">
				<view class="tit">一、监理入驻规则标题标题</view>
				<view>1.内容内容内容；</view>
				<view>2.内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
				<view>3.内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容；</view>
				<view>4.内容内容内容内容内容内容内容内容内容内容容内容内容容内容内容；</view>
				<view>3.内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内；</view>
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
				num:1
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
	.guizebox .texbox{font-size: 28rpx; line-height: 46rpx;padding: 30rpx 0; color: #666;}
	.guizebox .texbox .tit{font-size: 30rpx;color:#222;}
	.guizebox .texbox view{padding-bottom: 20rpx;}

</style>
